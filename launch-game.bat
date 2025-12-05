@echo off
title Chemistry Challenge Game Launcher

echo ==========================================
echo   Chemistry Challenge Game Launcher
echo ==========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if npm is installed
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install Node.js and npm from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Building the Chemistry Challenge game...
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        echo.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

REM Build the project
echo Building the project...
npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build the project
    echo.
    pause
    exit /b 1
)

echo.
echo Project built successfully!
echo.

REM Serve the built project
echo Starting the game server...
echo.
echo ==========================================
echo   Chemistry Challenge Game is now running!
echo ==========================================
echo.
echo Open your browser and go to: http://localhost:4173
echo.
echo Press CTRL+C to stop the server
echo.

npm run preview

pause