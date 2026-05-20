@echo off
REM Toothly - one-time GitHub setup. Auths gh, creates the repo, pushes.
REM Re-run safely; gh commands are idempotent.

cd /d "%~dp0.."

echo.
echo === Step 1: GitHub login ===
echo If a browser opens, complete the login. If already logged in, this is a no-op.
echo.
gh auth status >nul 2>&1
if errorlevel 1 (
    gh auth login -h github.com -p https -w
    if errorlevel 1 (
        echo.
        echo gh auth login failed. Aborting.
        pause
        exit /b 1
    )
)

echo.
echo === Step 2: Create the GitHub repo (private) and push ===
echo.
gh repo create toothly --private --source=. --remote=origin --push
if errorlevel 1 (
    echo.
    echo Repo create failed. Maybe it already exists. Trying to set remote + push instead.
    for /f "tokens=*" %%i in ('gh api user --jq .login') do set GH_USER=%%i
    git remote add origin https://github.com/!GH_USER!/toothly.git 2>nul
    git push -u origin main
)

echo.
echo === Done. ===
echo Your repo: https://github.com/[your-username]/toothly
echo.
pause
