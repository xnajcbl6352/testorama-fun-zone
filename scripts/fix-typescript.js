const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TYPES_PATH = path.join(__dirname, '..', 'src', 'types');
const HOOKS_PATH = path.join(__dirname, '..', 'src', 'hooks');

// Asegurarse de que existan los directorios necesarios
if (!fs.existsSync(TYPES_PATH)) {
  fs.mkdirSync(TYPES_PATH, { recursive: true });
}

if (!fs.existsSync(HOOKS_PATH)) {
  fs.mkdirSync(HOOKS_PATH, { recursive: true });
}

// Copiar los archivos de tipos
fs.copyFileSync(
  path.join(__dirname, 'templates', 'student.ts'),
  path.join(TYPES_PATH, 'student.ts')
);

// Ejecutar TypeScript para verificar errores
exec('npx tsc --noEmit', (error, stdout, stderr) => {
  if (error) {
    console.error('Errores de TypeScript encontrados:');
    console.error(stderr);
    process.exit(1);
  }
  console.log('No se encontraron errores de TypeScript');
});
