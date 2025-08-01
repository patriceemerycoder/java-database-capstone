#!/bin/bash

# Smart Clinic Docker Build and Run Script

echo "🏥 Smart Clinic - Docker Setup"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Stop and remove existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down

# Remove old images (optional)
read -p "Do you want to remove the old Docker image? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker rmi smart-clinic-app_smart-clinic-app 2>/dev/null || true
fi

# Build and start the containers
echo "🔨 Building and starting Smart Clinic..."
docker-compose up --build -d

# Wait for the application to start
echo "⏳ Waiting for application to start..."
sleep 30

# Check if the application is running
if curl -f http://localhost:8080/actuator/health &> /dev/null; then
    echo "✅ Smart Clinic is running successfully!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Main Application: http://localhost:8080"
    echo "   H2 Database Console: http://localhost:8080/h2-console"
    echo "   Health Check: http://localhost:8080/actuator/health"
    echo ""
    echo "📋 Useful Docker Commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop application: docker-compose down"
    echo "   Restart: docker-compose restart"
    echo ""
else
    echo "❌ Application failed to start. Check logs with: docker-compose logs"
fi

# Show running containers
echo "📦 Running containers:"
docker-compose ps
