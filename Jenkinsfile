pipeline {
    agent { dockerfile true }
    stages {
        stage('Install Packages') {
            steps {
                sh "yarn install --frozen-lockfile --non-interactive"
            }
        }
        stage('Unit Tests') {
            steps {
                sh "yarn tests"
            }
        }
        stage('E2E Tests') {
            steps {
                sh "yarn cypress:run"
            }
        }
        stage('Build') {
            steps {
                sh "yarn build"
            }
        }
        
    }
    post {
        success {
            slackSend channel: "#world-hello", message: "Build deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
        failure {
            slackSend channel: "#world-hello", failOnError:true, message:"Build failed  - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        }
    }
}
