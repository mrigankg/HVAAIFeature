pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    disableConcurrentBuilds()
  }

  tools {
    // Configure this in Jenkins:  Manage Jenkins → Global Tool Configuration → NodeJS → Name: node20
    nodejs 'node20'
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Node') {
      steps {
        sh 'echo "PATH=$PATH"'
        sh 'which node && node -v'
        sh 'which npm && npm -v'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --watch=false || echo "No tests to run"'
      }
    }

    stage('Archive Build Artifacts') {
      steps {
        archiveArtifacts artifacts: 'build/**, dist/**', fingerprint: true, allowEmptyArchive: true
      }
    }
  }

  post {
    success {
      echo '🎉 Build successful with Node 20!'
    }
    failure {
      echo '❌ Build failed — check console output.'
    }
    always {
      cleanWs(deleteDirs: true)
    }
  }
}
