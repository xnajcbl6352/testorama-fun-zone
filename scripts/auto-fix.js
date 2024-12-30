const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function fixTypeScriptErrors() {
  try {
    // 1. Ejecutar TypeScript para obtener errores
    const { stdout, stderr } = await execPromise('npx tsc --noEmit');
    
    if (stderr) {
      const errors = parseErrors(stderr);
      await applyFixes(errors);
    }
  } catch (error) {
    console.error('Error al ejecutar el script:', error);
  }
}

function parseErrors(stderr) {
  const lines = stderr.split('\n');
  const errors = [];
  
  for (const line of lines) {
    const match = line.match(/^(.+)\((\d+),(\d+)\): error TS(\d+): (.+)$/);
    if (match) {
      const [_, file, line, column, code, message] = match;
      errors.push({ file, line: parseInt(line), column: parseInt(column), code, message });
    }
  }
  
  return errors;
}

async function applyFixes(errors) {
  for (const error of errors) {
    const file = error.file;
    const content = await fs.readFile(file, 'utf8');
    let fixedContent = content;

    // Fix 1: Corregir tipos de status
    if (error.message.includes('string is not assignable to type')) {
      fixedContent = fixedContent.replace(/status: string/, "status: 'active' | 'inactive'");
    }

    // Fix 2: Agregar imports faltantes
    if (error.message.includes('Cannot find name')) {
      const importStatement = "import { StudentRecord, StudentCreateInput, StudentStatus } from '@/types/student';\n";
      if (!fixedContent.includes(importStatement)) {
        fixedContent = importStatement + fixedContent;
      }
    }

    // Fix 3: Corregir tipos de response
    if (error.message.includes('Type assertion')) {
      fixedContent = fixedContent.replace(/as any/, 'as StudentRecord[]');
    }

    if (fixedContent !== content) {
      await fs.writeFile(file, fixedContent);
      console.log(`Fixed file: ${file}`);
    }
  }
}

// Ejecutar el script
fixTypeScriptErrors();