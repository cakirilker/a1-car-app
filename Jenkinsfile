pipeline {
    agent { dockerfile true }
    stages {
        stage('Install Packages') {
            steps {
slackSend "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"

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
}
