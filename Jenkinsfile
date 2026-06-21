// ============================================================================
//  Jenkins declarative pipeline — E2E tests (pytest + Playwright + Allure)
//
//  Prerequisites on the Jenkins agent:
//    - Node.js 18+, Python 3.10+, and a reachable MongoDB on localhost:27017
//      (run one with: docker run -d -p 27017:27017 mongo:6)
//    - Jenkins "Allure" plugin installed (Manage Jenkins → Tools → Allure Commandline)
//
//  Note: `JENKINS_NODE_COOKIE=dontKillMe` keeps the backend/frontend processes
//  alive after their stage finishes (Jenkins otherwise reaps background procs).
// ============================================================================
pipeline {
  agent any

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    BASE_URL = 'http://localhost:3000'
    CI = 'false' // so the React build doesn't treat lint warnings as errors
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Start backend') {
      steps {
        // Write a throwaway test config (NO real secrets).
        writeFile file: 'backend/config/config.env', text: '''PORT=4000
JWT_SECRETKEY=ci_test_secret
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/mycourses
SMTP_HOST=localhost
SMTP_PORT=2525
SMTP_USER=ci
SMTP_PASS=ci
CLOUDINARY_NAME=ci
CLOUDINARY_API_KEY=ci
CLOUDINARY_SECRET_KEY=ci
[email protected]
'''
        dir('backend') {
          sh 'cp config/config.env .env'
          sh 'npm ci'
          sh 'JENKINS_NODE_COOKIE=dontKillMe nohup node server.js > backend.log 2>&1 &'
        }
      }
    }

    stage('Build & serve frontend') {
      steps {
        dir('frontend') {
          sh 'npm ci'
          sh 'npm run build' // prebuild compiles Tailwind into src/index.css
          sh 'JENKINS_NODE_COOKIE=dontKillMe nohup npx --yes serve -s build -l 3000 > frontend.log 2>&1 &'
        }
      }
    }

    stage('Install test deps') {
      steps {
        dir('automation') {
          sh 'python3 -m venv .venv'
          sh './.venv/bin/pip install -r requirements.txt'
          sh './.venv/bin/python -m playwright install --with-deps chromium'
        }
      }
    }

    stage('Wait for app') {
      steps {
        sh 'npx --yes wait-on -t 120000 http://localhost:3000 http://localhost:4000/api/v1/courses'
      }
    }

    stage('Run E2E tests') {
      steps {
        dir('automation') {
          // Even if tests fail we want the report — let post{} handle reporting.
          sh './.venv/bin/python -m pytest'
        }
      }
    }
  }

  post {
    always {
      // Render + publish the Allure report (requires the Allure Jenkins plugin).
      allure includeProperties: false, results: [[path: 'automation/allure-results']]
      archiveArtifacts artifacts: 'automation/allure-results/**', allowEmptyArchive: true
    }
  }
}
