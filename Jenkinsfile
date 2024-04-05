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
                    // Run Docker container in the background
                    def containerId = bat(
                        script: 'docker run -d -p 8080:3000 todo-web-app',
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
