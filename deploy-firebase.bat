@echo off
title Firebase Deployment - Oryn Financial Copilot
cls
echo ================================================================
echo               ORYN FINANCIAL COPILOT - FIREBASE DEPLOYMENT
echo                 Target Project: oryn-1dbb0
echo ================================================================
echo.

set PATH=C:\Users\shiva\nodejs;%PATH%
cd /d "C:\Users\shiva\Downloads\Oryn"

echo [1/3] Building production React web app...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build failed! Check the errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Authenticating with Firebase...
echo ----------------------------------------------------------------
echo A browser tab will open now. 
echo Sign in with your Google account that owns the oryn-1dbb0 project,
echo then click "Allow".
echo ----------------------------------------------------------------
echo.

call firebase login --reauth

echo.
echo [3/3] Deploying to Firebase Hosting...
echo ----------------------------------------------------------------
call firebase deploy --only hosting --project oryn-1dbb0

echo.
echo ================================================================
echo                       DEPLOYMENT COMPLETE!
echo.
echo   Your live application is now online at:
echo   -^> https://oryn-1dbb0.web.app
echo   -^> https://oryn-1dbb0.firebaseapp.com
echo ================================================================
echo.
pause
