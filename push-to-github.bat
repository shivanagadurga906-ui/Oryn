@echo off
set PATH=C:\Users\shiva\mingit\cmd;C:\Users\shiva\nodejs;%PATH%
cd /d C:\Users\shiva\Downloads\Oryn

echo.
echo  =======================================
echo   Oryn - Pushing to GitHub
echo  =======================================
echo.

git config user.email "jahnavi2513@users.noreply.github.com"
git config user.name "jahnavi2513"

git add -A

git commit -m "feat: complete Oryn Financial Copilot with Firebase and Gemini AI"

git push origin main

echo.
echo  =======================================
echo   Done! Check GitHub:
echo   https://github.com/jahnavi2513/Oryn
echo  =======================================
echo.
pause
