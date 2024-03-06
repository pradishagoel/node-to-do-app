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
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t todo-web-app .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker run -p 3000:3000 todo-web-app'
                }
            }
        }
    }
}
