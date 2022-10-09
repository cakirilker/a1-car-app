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
}
