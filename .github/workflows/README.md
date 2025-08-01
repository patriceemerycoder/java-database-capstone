# GitHub Actions Workflows for Smart Clinic

This directory contains GitHub Actions workflows for the Smart Clinic application, providing comprehensive CI/CD automation.

## Workflow Files

### 1. `ci-cd.yml` - Main CI/CD Pipeline
**Triggers:** Push to main/develop branches, Pull requests to main
**Jobs:**
- **Test:** Runs Maven tests and generates test reports
- **Build:** Compiles and packages the application
- **Docker Build:** Creates and pushes Docker images
- **Security Scan:** Vulnerability scanning with Trivy
- **Code Quality:** SonarCloud analysis (optional)
- **Deploy Staging:** Deploys to staging environment (develop branch)
- **Deploy Production:** Deploys to production environment (main branch)
- **Notify:** Sends build status notifications

### 2. `docker-publish.yml` - Docker Image Publishing
**Triggers:** Tag pushes (v*), Manual workflow dispatch
**Features:**
- Multi-platform builds (linux/amd64, linux/arm64)
- Publishes to Docker Hub and GitHub Container Registry
- Updates Docker Hub repository description
- Supports manual tag specification

### 3. `release.yml` - Release Management
**Triggers:** Tag pushes (v*)
**Features:**
- Creates GitHub releases with auto-generated changelogs
- Includes JAR artifacts and Docker configuration files
- Supports pre-releases (alpha, beta, rc tags)
- Updates documentation with new version numbers

### 4. `dependency-updates.yml` - Automated Maintenance
**Triggers:** Weekly schedule (Mondays), Manual dispatch
**Features:**
- Updates Maven dependencies to latest versions
- Creates pull requests for dependency updates
- Runs OWASP security audits
- Generates dependency check reports

## Required Secrets

To use these workflows, configure the following secrets in your repository:

### Docker Hub (Required for Docker publishing)
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

### SonarCloud (Optional for code quality analysis)
- `SONAR_TOKEN`: SonarCloud authentication token
- `SONAR_ORGANIZATION`: Your SonarCloud organization key

## Environment Configuration

The workflows support deployment to different environments:

### Staging Environment
- Triggered by pushes to `develop` branch
- Environment name: `staging`
- Requires environment protection rules in repository settings

### Production Environment
- Triggered by pushes to `main` branch
- Environment name: `production`
- Requires environment protection rules and approvals

## Usage Examples

### Triggering a Release
```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### Manual Docker Build
1. Go to Actions tab in GitHub
2. Select "Docker Build and Publish" workflow
3. Click "Run workflow"
4. Specify custom tag if needed

### Viewing Build Status
- Build status badges can be added to README.md
- Workflow runs are visible in the Actions tab
- Deployment status is shown in environments section

## Customization

### Adding New Environments
1. Create new deployment job in `ci-cd.yml`
2. Configure environment protection rules
3. Add deployment commands specific to your infrastructure

### Modifying Build Process
- Update Maven commands in build jobs
- Add additional testing frameworks
- Configure different artifact retention policies

### Security Enhancements
- Add additional security scanning tools
- Configure custom vulnerability thresholds
- Set up automated security issue creation

## Monitoring and Notifications

### Build Notifications
- Console output shows success/failure status
- Failed builds exit with error codes
- Custom notification integrations can be added

### Artifact Management
- JAR files are uploaded as build artifacts
- Docker images are tagged and pushed to registries
- Retention policies can be configured per artifact type

### Quality Gates
- Tests must pass before deployment
- Security scans are required for production
- Code quality analysis provides insights

## Troubleshooting

### Common Issues
1. **Maven wrapper permissions**: Ensure `mvnw` is executable
2. **Docker secrets**: Verify Docker Hub credentials are correct
3. **Environment access**: Check repository environment settings
4. **Branch protection**: Ensure required status checks are configured

### Debug Tips
- Enable debug logging with `ACTIONS_STEP_DEBUG=true`
- Check workflow syntax with GitHub's workflow validator
- Use `workflow_dispatch` for manual testing
- Review job dependencies and conditional execution

## Best Practices

### Branch Strategy
- Use `develop` branch for integration testing
- Deploy to production only from `main` branch
- Create feature branches for development work

### Version Management
- Use semantic versioning (v1.0.0, v1.1.0, v2.0.0)
- Tag releases consistently
- Include pre-release identifiers when appropriate

### Security
- Regularly update workflow dependencies
- Use least-privilege access for secrets
- Enable dependency scanning and updates
- Review security audit reports

This workflow configuration provides a complete DevOps pipeline for the Smart Clinic application, ensuring code quality, security, and reliable deployments across different environments.
