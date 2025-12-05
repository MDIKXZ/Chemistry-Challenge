# Chemistry Challenge Game Launcher
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Chemistry Challenge Game Launcher" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm -v
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js and npm from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
Write-Host "Building the Chemistry Challenge game..." -ForegroundColor Yellow
Write-Host ""

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
        Write-Host ""
        pause
        exit 1
    }
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
}

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to build the project" -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
Write-Host "Project built successfully!" -ForegroundColor Green
Write-Host ""

# Serve the built project
Write-Host "Starting the game server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Chemistry Challenge Game is now running!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open your browser and go to: http://localhost:4173" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press CTRL+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run preview