stage('Deploy') {
    steps {
        script {
            // Run the Docker container without detached mode
            def containerId = bat(script: 'docker run -p 80:3000 -d todo-web-app', returnStatus: true)

            if (containerId == 0) {
                echo "Application deployed successfully!"

                // Wait for the application to start (adjust the sleep time if needed)
                sleep 20

                // Check if the container is running using Docker API
                def inspectResult = bat(script: 'docker inspect -f "{{.State.Running}}" todo-web-app', returnStatus: true).trim()

                if (inspectResult == 'true') {
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
