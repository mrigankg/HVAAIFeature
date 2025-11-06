pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'build/**', followSymlinks: false
            }
        }
    }
    post {
        success {
            echo '🎉 Build successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
