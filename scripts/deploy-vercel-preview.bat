@echo off
setlocal
REM Double-click to rebuild the Expo web export and push it to Vercel.
REM Live preview: https://toothly-one.vercel.app
set "ROOT=%~dp0.."

echo ================================================
echo  Toothly - deploy web preview to Vercel
echo ================================================
echo.

cd /d "%ROOT%\app" || goto :err

echo [1/3] Building Expo static web export...
call npx expo export -p web || goto :err
echo.

echo [2/3] Staging prebuilt output...
call node "%ROOT%\scripts\_stage-vercel.mjs" || goto :err
echo.

echo [3/3] Deploying to Vercel (production)...
call vercel deploy --prebuilt --prod --yes || goto :err
echo.

echo ================================================
echo  Done. Live at: https://toothly-one.vercel.app
echo ================================================
echo.
pause
exit /b 0

:err
echo.
echo  *** DEPLOY FAILED - see messages above ***
echo.
pause
exit /b 1
