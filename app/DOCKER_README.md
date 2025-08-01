# Smart Clinic - Docker Setup Guide

## 🐳 Docker Container Setup

This guide will help you run the Smart Clinic application using Docker containers.

### Prerequisites

1. **Docker Desktop** - Install from [docker.com](https://www.docker.com/products/docker-desktop)
2. **Docker Compose** - Usually included with Docker Desktop

### Quick Start

#### Option 1: Using the Automated Script (Recommended)

**For Windows:**
```bash
cd c:\DEV\JavaDatabaseCapstone\java-database-capstone\app
docker-run.bat
```

**For Linux/Mac:**
```bash
cd /path/to/your/project/app
chmod +x docker-run.sh
./docker-run.sh
```

#### Option 2: Manual Docker Commands

1. **Build and Run with Docker Compose:**
```bash
cd c:\DEV\JavaDatabaseCapstone\java-database-capstone\app
docker-compose up --build -d
```

2. **Access the Application:**
   - Main Application: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console
   - Health Check: http://localhost:8080/actuator/health

### 🌐 Application URLs

Once the container is running, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| **Main Application** | http://localhost:8080 | Smart Clinic homepage |
| **Patient Dashboard** | http://localhost:8080/pages/patientDashboard.html | Patient interface |
| **Doctor Dashboard** | http://localhost:8080/templates/doctor/doctorDashboard.html | Doctor interface |
| **Admin Dashboard** | http://localhost:8080/templates/admin/adminDashboard.html | Admin interface |
| **H2 Database Console** | http://localhost:8080/h2-console | Database management |
| **API Health Check** | http://localhost:8080/actuator/health | Application status |

### 📋 Useful Docker Commands

```bash
# View application logs
docker-compose logs -f

# Stop the application
docker-compose down

# Restart the application
docker-compose restart

# View running containers
docker-compose ps

# Access container shell
docker exec -it smart-clinic bash

# Remove all containers and images
docker-compose down --rmi all --volumes
```

### 🔧 Configuration

#### Database Configuration
The application uses H2 in-memory database by default. To connect to the H2 console:
- URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

#### Environment Variables
You can customize the application by modifying the `docker-compose.yml` file:

```yaml
environment:
  - SPRING_PROFILES_ACTIVE=docker
  - SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
  - SPRING_DATASOURCE_USERNAME=sa
  - SPRING_DATASOURCE_PASSWORD=password
```

### 🚀 Production Deployment

For production deployment, consider:

1. **Using a proper database** (uncomment MySQL service in docker-compose.yml)
2. **Setting up SSL/HTTPS**
3. **Using environment-specific configurations**
4. **Setting up proper logging and monitoring**

#### Enable MySQL Database

Uncomment the MySQL service in `docker-compose.yml` and update the application environment:

```yaml
environment:
  - SPRING_DATASOURCE_URL=jdbc:mysql://mysql-db:3306/smart_clinic
  - SPRING_DATASOURCE_USERNAME=clinic_user
  - SPRING_DATASOURCE_PASSWORD=clinic_password
```

### 🐛 Troubleshooting

#### Common Issues:

1. **Port 8080 already in use:**
   ```bash
   # Change the port in docker-compose.yml
   ports:
     - "8081:8080"  # Use port 8081 instead
   ```

2. **Container won't start:**
   ```bash
   # Check logs for errors
   docker-compose logs smart-clinic-app
   ```

3. **Database connection issues:**
   ```bash
   # Verify H2 console access
   curl http://localhost:8080/h2-console
   ```

4. **Application not responding:**
   ```bash
   # Check if container is running
   docker-compose ps
   
   # Restart the application
   docker-compose restart
   ```

### 📦 Docker Image Details

- **Base Image:** OpenJDK 17 (Slim)
- **Application Port:** 8080
- **Health Check:** Available at `/actuator/health`
- **Database:** H2 in-memory (configurable to MySQL)

### 🔍 Monitoring

Monitor your application:

```bash
# View real-time logs
docker-compose logs -f smart-clinic-app

# Check resource usage
docker stats smart-clinic

# Health check
curl http://localhost:8080/actuator/health
```

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. View application logs: `docker-compose logs -f`
3. Ensure Docker Desktop is running
4. Verify no other applications are using port 8080
