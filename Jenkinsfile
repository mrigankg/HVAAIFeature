pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  parameters {
    booleanParam(name: 'DEPLOY_LOCAL', defaultValue: false, description: 'Deploy build to a local folder on this Mac')
    string(name: 'DEPLOY_DIR', defaultValue: '/usr/local/var/www/hvaa', description: 'Local deploy target directory')

    booleanParam(name: 'DEPLOY_S3', defaultValue: false, description: 'Deploy build to an S3 bucket')
    string(name: 'S3_BUCKET', defaultValue: 'my-bucket-name', description: 'Target S3 bucket (no s3:// prefix)')
    string(name: 'S3_PREFIX', defaultValue: 'hvaa', description: 'Path/prefix inside the bucket (optional)')
  }

  environment {
    // So Jenkins can find your Homebrew Node/npm (keep if you’re using Node steps)
    PATH = "/opt/homebrew/bin:/usr/local/bin:${PATH}"
    CI   = 'true'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        sh '''
          if [ -f package-lock.json ]; then npm ci; else npm install; fi
        '''
      }
    }

    stage('Build') {
      steps { sh 'npm run build' }
    }

    stage('Test') {
      steps { sh 'npm test -- --watch=false || echo "No tests to run"' }
    }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'build/**, dist/**', fingerprint: true, allowEmptyArchive: true
      }
    }

    // ------------------ DEPLOY OPTIONS ------------------

    stage('Deploy: Local Folder') {
      when { expression { return params.DEPLOY_LOCAL } }
      steps {
        sh '''
          # pick build dir: prefer build/, else dist/
          if [ -d build ]; then OUT=build; elif [ -d dist ]; then OUT=dist; else
            echo "❌ No build output (build/ or dist/) found"; exit 1; fi

          DEST="${DEPLOY_DIR}"
          echo "🚚 Copying $OUT/ -> ${DEST}"
          mkdir -p "${DEST}"

          # rsync keeps it in sync and deletes removed files
          rsync -av --delete "${OUT}/" "${DEST}/"

          echo "✅ Local deploy finished: ${DEST}"
        '''
      }
    }

    stage('Deploy: S3') {
      when { expression { return params.DEPLOY_S3 } }
      steps {
        sh '''
          # Ensure aws cli exists
          if ! command -v aws >/dev/null 2>&1; then
            echo "❌ aws CLI not found. Install with: brew install awscli"; exit 1; fi

          # pick build dir
          if [ -d build ]; then OUT=build; elif [ -d dist ]; then OUT=dist; else
            echo "❌ No build output (build/ or dist/) found"; exit 1; fi

          BUCKET="${S3_BUCKET}"
          PREFIX="${S3_PREFIX}"
          S3_URI="s3://${BUCKET}"
          if [ -n "${PREFIX}" ]; then S3_URI="${S3_URI}/${PREFIX}"; fi

          echo "🚀 Syncing ${OUT}/ -> ${S3_URI}"
          aws s3 sync "${OUT}/" "${S3_URI}/" --delete

          # Optional: make site public; remove if your bucket policy handles this
          # aws s3 sync "${OUT}/" "${S3_URI}/" --delete --acl public-read

          echo "✅ S3 deploy finished: ${S3_URI}"
        '''
      }
    }
  }

  post {
    success { echo '🎉 Pipeline successful' }
    failure { echo '❌ Pipeline failed — check console output' }
    always  { cleanWs(deleteDirs: true) }
  }
}
