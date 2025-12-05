@echo off
setlocal

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Create the shortcut using PowerShell
powershell -Command ^
"$WshShell = New-Object -comObject WScript.Shell; ^
$Shortcut = $WshShell.CreateShortcut([System.Environment]::GetFolderPath('Desktop') + '\Chemistry Challenge Game.lnk'); ^
$Shortcut.TargetPath = '%CURRENT_DIR%\launcher.html'; ^
$Shortcut.WorkingDirectory = '%CURRENT_DIR%'; ^
$Shortcut.IconLocation = 'shell32.dll,13'; ^
$Shortcut.Save()"

echo Shortcut created on your desktop!
echo Double-click "Chemistry Challenge Game" on your desktop to launch the game.
pause