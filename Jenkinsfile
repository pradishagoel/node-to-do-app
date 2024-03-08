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
                    // Run the Docker container in detached mode
                    bat 'docker run -d -p 80:3000 todo-web-app'

                    // Wait for the application to start (adjust the sleep time if needed)
                    sleep 20

                    // Check if the container is running
                    def isContainerRunning = bat(script: 'docker inspect --format "{{.State.Running}}" todo-web-app', returnStatus: true) == 0

                    if (isContainerRunning) {
                        echo "Application deployed successfully!"
                    } else {
                        error "Failed to deploy the application."
                    }
                }
            }
        }
    }
}
