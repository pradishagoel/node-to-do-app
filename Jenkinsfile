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
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t todo-web-app .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Run the Docker container without detached mode
                    def containerId = bat(script: 'docker run -p 80:3000 -d todo-web-app', returnStatus: true)

                    if (containerId == 0) {
                        echo "Application deployed successfully!"

                        // Wait for the application to start (adjust the sleep time if needed)
                        sleep 20

                        // Check if the container is running
                        def inspectResult = bat(script: 'docker inspect todo-web-app', returnStdout: true).trim()
                        def isContainerRunning = inspectResult.contains('"Running": true')

                        if (isContainerRunning) {
                            echo "Application is running."
                        } else {
                            error "Application is not running."
                        }
                    } else {
                        error "Failed to deploy the application."
                    }
                }
            }
        }
    }
}
