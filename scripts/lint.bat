@echo off
REM Toothly — run linter
cd /d "%~dp0..\app"
call npm run lint
pause
