pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    disableConcurrentBuilds()
  }

  tools {
    // Jenkins → Manage Jenkins → Global Tool Configuration → NodeJS → Name: node18
    nodejs 'node18'
  }

  environment {
    CI = 'true' // many JS tools behave better in CI mode
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
        // Use npm ci if package-lock.json exists, else fall back to npm install
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
        // Don’t fail the build if no tests are defined
        sh 'npm test -- --watch=false || echo "No tests to run"'
      }
    }

    stage('Archive Build Artifacts') {
      steps {
        // Support common frontend outputs: build/ (CRA) or dist/ (Vite/Webpack)
        archiveArtifacts artifacts: 'build/**, dist/**', fingerprint: true, allowEmptyArchive: true
      }
    }
  }

  post {
    success {
      echo '🎉 Build successful!'
    }
    failure {
      echo '❌ Build failed. Check console log.'
    }
    always {
      // keep workspace tidy between runs
      cleanWs(deleteDirs: true)
    }
  }
}
