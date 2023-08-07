@echo off
setlocal

set "destination_folder=C:\Program Files\SIMAPRINT-SERVER"

REM 2. Navegar a la carpeta del repositorio clonado
cd /d "%destination_folder%"

REM npm install -g pm2

REM 4. Ejecutar el servidor utilizando pm2
pm2 start node src/index.js --name "SIMAPRINT-SERVER"

endlocal