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
                    // Stop the existing container if it's running
                    bat 'docker stop todo-web-app || true'

                    // Remove the existing container if it exists
                    bat 'docker rm todo-web-app || true'

                    // Run Docker container in the background
                    def containerId = bat(
                        script: 'docker run -d -p 8081:3000 --name todo-web-app todo-web-app',
                        returnStdout: true
                    ).trim()

                    // Check if container started successfully
                    def containerStatus = bat(
                        script: "docker inspect --format='{{.State.Status}}' $containerId",
                        returnStatus: true
                    )

                    if (containerStatus == 0) {
                        echo "Docker container started successfully with ID: $containerId"
                    } else {
                        error "Failed to start Docker container"
                    }
                }
            }
        }
    }
}
