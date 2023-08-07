@echo off
setlocal

set "repo_url=https://github.com/IKIGAI-Studios/SIMAPRINT-SERVER.git"
set "destination_folder=C:\Program Files\SIMAPRINT-SERVER"

REM 1. Git clone del repositorio en la carpeta especificada
git clone "%repo_url%" "%destination_folder%"

REM 2. Navegar a la carpeta del repositorio clonado
cd /d "%destination_folder%"

REM 3. Instalar las dependencias de Node.js utilizando npm
npm install

endlocal