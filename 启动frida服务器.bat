@echo off
adb connect 127.0.0.1:16384
adb shell ./data/local/frida &
pause