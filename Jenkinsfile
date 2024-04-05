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
                    bat 'docker stop todo-web-app || exit 0'

                    // Remove the existing container if it exists
                    bat 'docker rm todo-web-app || exit 0'

                    // Run Docker container in the background
                    bat 'docker run -d -p 8081:3000 --name todo-web-app todo-web-app'
                }
            }
        }
    }
}
