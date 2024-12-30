const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TYPES = {
  StudentRecord: `{
    id: string;
    first_name: string;
    last_name: string;
    dni: string;
    birth_date: string;
    phone: string;
    email: string;
    address: string;
    registration_date: string;
    status: 'active' | 'inactive';
    gdpr_consent: boolean;
    created_at: string;
    updated_at: string;
  }`,
  StudentCreateInput: `{
    first_name: string;
    last_name: string;
    dni: string;
    birth_date: string;
    registration_date: string;
    status: 'active' | 'inactive';
    phone?: string;
    email?: string;
    address?: string;
    gdpr_consent?: boolean;
  }`
};

function fixTypeScriptErrors() {
  // Buscar archivos TypeScript con errores
  exec('tsc --noEmit', (error, stdout, stderr) => {
    if (error) {
      const errors = stderr.toString();
      const fileErrors = parseTypeScriptErrors(errors);
      fixErrors(fileErrors);
    }
  });
}

function parseTypeScriptErrors(errors) {
  const errorLines = errors.split('\n');
  const fileErrors = new Map();

  errorLines.forEach(line => {
    const match = line.match(/^(.+?)\((\d+),(\d+)\): error TS\d+: (.+)$/);
    if (match) {
      const [_, file, line, column, message] = match;
      if (!fileErrors.has(file)) {
        fileErrors.set(file, []);
      }
      fileErrors.get(file).push({ line: parseInt(line), column: parseInt(column), message });
    }
  });

  return fileErrors;
}

function fixErrors(fileErrors) {
  fileErrors.forEach((errors, filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');

    errors.forEach(error => {
      // Corregir tipos StudentRecord
      if (error.message.includes('StudentRecord')) {
        insertTypeDefinition(filePath, TYPES.StudentRecord, 'StudentRecord');
      }
      // Corregir tipos StudentCreateInput
      if (error.message.includes('StudentCreateInput')) {
        insertTypeDefinition(filePath, TYPES.StudentCreateInput, 'StudentCreateInput');
      }
      // Corregir errores de status
      if (error.message.includes('string is not assignable to type')) {
        lines[error.line - 1] = lines[error.line - 1].replace(/status: string/, "status: 'active' | 'inactive'");
      }
    });

    fs.writeFileSync(filePath, lines.join('\n'));
  });
}

function insertTypeDefinition(filePath, typeDefinition, typeName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importStatement = `import { ${typeName} } from '@/types/student';`;
  
  if (!content.includes(importStatement)) {
    const lines = content.split('\n');
    // Insertar después de la última importación
    const lastImportIndex = lines.reduce((acc, line, index) => {
      return line.startsWith('import') ? index : acc;
    }, -1);
    
    lines.splice(lastImportIndex + 1, 0, importStatement);
    fs.writeFileSync(filePath, lines.join('\n'));
  }
}

// Ejecutar el script
fixTypeScriptErrors();