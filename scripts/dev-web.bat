@echo off
REM Toothly — Expo dev server, web (browser preview, fastest iteration)
cd /d "%~dp0..\app"
call npx expo start --web
pause
