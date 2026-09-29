@echo off
title Oryn Financial Copilot - Starting...
echo.
echo  ====================================
echo   Oryn Financial Copilot
echo   Starting development server...
echo  ====================================
echo.

set PATH=C:\Users\shiva\nodejs;%PATH%

echo  Checking Node.js...
node --version
echo  Checking npm...
npm --version
echo.
echo  Starting server at http://localhost:5173/
echo  Press Ctrl+C to stop the server.
echo.

npm run dev
pause
