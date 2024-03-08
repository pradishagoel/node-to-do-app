pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Use 'npm ci' instead of 'npm install' for reproducible builds
                    bat 'npm ci'
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Tag the Docker image with the build number for versioning
                    bat 'docker build -t todo-web-app:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Run the Docker container without detached mode
                    def containerId = bat(script: 'docker run -p 80:3000 -d todo-web-app:${BUILD_NUMBER}', returnStatus: true)

                    if (containerId == 0) {
                        echo "Application deployed successfully!"

                        // Wait for the application to start (adjust the sleep time if needed)
                        sleep time: 20, unit: 'SECONDS'

                        // Check if the container is running
                        def inspectResult = bat(script: 'docker inspect todo-web-app:${BUILD_NUMBER}', returnStdout: true).trim()
                        echo "Docker Inspect Result: ${inspectResult}"

                        def isContainerRunning = inspectResult.contains('"Running": true')

                        if (isContainerRunning) {
                            echo "Application is running."
                        } else {
                            error "Application is not running."
                        }
                    } else {
                        error "Failed to deploy the application. Container ID: ${containerId}"
                    }
                }
            }
        }
    }
}
