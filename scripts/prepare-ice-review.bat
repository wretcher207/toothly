@echo off
setlocal
cd /d "%~dp0.."
for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "TOOTHLY_REVIEW_DIR=.review\ice-%%i"
python -B scripts\ice_review.py export --out "%TOOTHLY_REVIEW_DIR%"
if errorlevel 1 goto failed
echo Review packet: %CD%\%TOOTHLY_REVIEW_DIR%
pause
exit /b 0
:failed
echo Could not prepare the review packet. See the error above.
pause
exit /b 1
