@echo off
REM Smart Clinic Docker Build and Run Script for Windows

echo 🏥 Smart Clinic - Docker Setup
echo ================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Stop and remove existing containers
echo 🧹 Cleaning up existing containers...
docker-compose down

REM Ask if user wants to remove old images
set /p remove_image="Do you want to remove the old Docker image? (y/n): "
if /i "%remove_image%"=="y" (
    docker rmi smart-clinic-app_smart-clinic-app >nul 2>&1
)

REM Build and start the containers
echo 🔨 Building and starting Smart Clinic...
docker-compose up --build -d

REM Wait for the application to start
echo ⏳ Waiting for application to start...
timeout /t 30 /nobreak >nul

REM Check if the application is running
curl -f http://localhost:8080/actuator/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Smart Clinic is running successfully!
    echo.
    echo 🌐 Application URLs:
    echo    Main Application: http://localhost:8080
    echo    H2 Database Console: http://localhost:8080/h2-console
    echo    Health Check: http://localhost:8080/actuator/health
    echo.
    echo 📋 Useful Docker Commands:
    echo    View logs: docker-compose logs -f
    echo    Stop application: docker-compose down
    echo    Restart: docker-compose restart
    echo.
) else (
    echo ❌ Application failed to start. Check logs with: docker-compose logs
)

REM Show running containers
echo 📦 Running containers:
docker-compose ps

echo.
echo Press any key to exit...
pause >nul
