pipeline {
    agent docker { image 'node:14.15.5-alpine3.13' }

    stages {
        stage('Verify Environment') {
            steps {
                sh 'node --version'
            }
        }
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
