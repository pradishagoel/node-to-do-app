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
                    bat 'docker run -p 4000:3000 todo-web-app'
                }
            }
        }
    }
}
