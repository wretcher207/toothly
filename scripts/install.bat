@echo off
REM Toothly — install or refresh dependencies
cd /d "%~dp0..\app"
call npm install
pause
