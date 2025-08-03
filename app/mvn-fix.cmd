@echo off
setlocal
set "JAVA_HOME=C:\PROGRA~1\Java\jdk-21"
set "MAVEN_OPTS=-Duser.home=C:\DEV"
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0mvnw.cmd' %*"
