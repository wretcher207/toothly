@echo off
REM Toothly — Expo dev server with tunnel (scan QR with Expo Go on phone over any network)
cd /d "%~dp0..\app"
call npx expo start --tunnel
pause
