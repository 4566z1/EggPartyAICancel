@echo off
chcp 65001
frida -U -l hook.js 蛋仔派对
pause