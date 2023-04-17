import readline from 'readline-sync';
import fs from 'fs'
import { spawn } from 'child_process';

const numEntregable=readline.question("Ingrese el numero del entregable que desea ejecutar")


const directorio = './..';

fs.readdir(directorio, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return console.log("fs error");
    }
  
    const carpetas = files.filter(file => file.isDirectory()).map(dir => dir.name);
    
    const directorio = carpetas.find((carpeta) => {
        return carpeta.includes(`Entregable ${numEntregable}`)
      });

      if(!directorio){
        return console.log("No se encuentra el entregable especificado");
      }
      
      const child=spawn('node', [`./../${directorio}/src/index.js`]);
      child.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      
      child.stderr.on('data', (data) => {
        console.error(data.toString());
      });
      
      child.on('exit', (code) => {
        console.log(`Proceso secundario finalizado con código ${code}`);
        process.exit(code);
      });
  });

