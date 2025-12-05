' Chemistry Challenge Game Launcher
' This script will run the launch-game.bat file in the background

Set objShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
objShell.Run "cmd /c cd /d """ & strPath & """ && launch-game.bat", 0, False

' Optional: Show a message to the user
' MsgBox "Chemistry Challenge Game is starting... Please wait a moment, then open your browser to http://localhost:4173", vbInformation, "Game Launcher"