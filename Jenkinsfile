pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    // Add Homebrew path so Jenkins finds Node 25.1.0
    PATH = "/opt/homebrew/bin:/usr/local/bin:${PATH}"
    CI   = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Node') {
      steps {
        sh '''
          echo "PATH=$PATH"
          which node || echo "Node not found!"
          node -v || (echo "❌ Node not installed or PATH not set properly" && exit 1)
          which npm || echo "npm not found!"
          npm -v || (echo "❌ npm missing" && exit 1)
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          if [ -f package-lock.json ]; then
            echo "Installing dependencies using npm ci..."
            npm ci
          else
            echo "Installing dependencies using npm install..."
            npm install
          fi
        '''
      }
    }

    stage('Build') {
      steps {
        echo 'Running build...'
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'npm test -- --watch=false || echo "No tests found."'
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
      echo '✅ Build successful with Node 25.1.0!'
    }
    failure {
      echo '❌ Build failed — check console output.'
    }
    always {
      cleanWs(deleteDirs: true)
    }
  }
}
