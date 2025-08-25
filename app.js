// Application data from the provided JSON
const assessmentData = {
  assessmentSummary: {
    totalAssessments: 47,
    criticalAssessments: 10,
    sitesAffected: ["Manufacturing Plant A", "Power Generation Unit 2", "Water Treatment Facility"],
    processCriticality: "High",
    riskScore: 8.7
  },
  criticalDevices: [
    {
      deviceName: "PLC-MAIN-001",
      deviceType: "Programmable Logic Controller",
      site: "Manufacturing Plant A",
      firmware: "v2.1.4",
      vulnerabilities: ["CVE-2024-8756", "CVE-2024-7234"],
      riskLevel: "Critical",
      businessImpact: "Production line shutdown risk"
    },
    {
      deviceName: "HMI-OP-005",
      deviceType: "Human Machine Interface", 
      site: "Power Generation Unit 2",
      firmware: "v1.8.2",
      vulnerabilities: ["CVE-2024-7891"],
      riskLevel: "High",
      businessImpact: "Unauthorized operator access"
    },
    {
      deviceName: "SCADA-WTR-003",
      deviceType: "SCADA System",
      site: "Water Treatment Facility",
      firmware: "v3.2.1",
      vulnerabilities: ["CVE-2024-6543", "CVE-2024-5432"],
      riskLevel: "High", 
      businessImpact: "Water quality monitoring disruption"
    }
  ],
  remediationActions: [
    {
      action: "Firmware Update",
      devices: 8,
      priority: "Critical",
      timeframe: "Next maintenance window (48 hours)",
      assignee: "OT Security Team"
    },
    {
      action: "Configuration Hardening",
      devices: 6,
      priority: "High", 
      timeframe: "7 days",
      assignee: "Site Operations"
    },
    {
      action: "Network Segmentation Review",
      devices: 4,
      priority: "Medium",
      timeframe: "30 days",
      assignee: "Network Team"
    }
  ],
  impactMetrics: {
    riskReductionPercent: 78,
    vulnerabilitiesAddressed: 15,
    devicesSecured: 10,
    estimatedDowntimePrevented: "24 hours",
    costAvoidance: "$1.2M"
  }
};

// Application state
let currentStep = 1;
const totalSteps = 5;

// DOM elements
let summaryScreen, analysisScreen, confirmationScreen, processingScreen, resultsScreen;
let analyzeBtn, backToSummary, proceedBtn, cancelBtn, confirmProceedBtn;
let viewDashboard, startNewAssessment;

// Processing steps for animation
const processingSteps = [
  { id: 'step1', text: 'Analyzing vulnerability data', duration: 1500 },
  { id: 'step2', text: 'Creating vulnerable items', duration: 2000 },
  { id: 'step3', text: 'Generating remediation actions', duration: 1800 },
  { id: 'step4', text: 'Calculating impact metrics', duration: 1200 }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('AI Agent Assessment application initialized');
  
  // Get DOM elements
  initializeDOMElements();
  
  // Set up event listeners
  setupEventListeners();
  
  // Show initial screen
  showStep(1);
});

function initializeDOMElements() {
  // Screen elements
  summaryScreen = document.getElementById('summaryScreen');
  analysisScreen = document.getElementById('analysisScreen');
  confirmationScreen = document.getElementById('confirmationScreen');
  processingScreen = document.getElementById('processingScreen');
  resultsScreen = document.getElementById('resultsScreen');
  
  // Button elements
  analyzeBtn = document.getElementById('analyzeBtn');
  backToSummary = document.getElementById('backToSummary');
  proceedBtn = document.getElementById('proceedBtn');
  cancelBtn = document.getElementById('cancelBtn');
  confirmProceedBtn = document.getElementById('confirmProceedBtn');
  viewDashboard = document.getElementById('viewDashboard');
  startNewAssessment = document.getElementById('startNewAssessment');
  
  console.log('DOM elements initialized', {
    summaryScreen: !!summaryScreen,
    analysisScreen: !!analysisScreen,
    confirmationScreen: !!confirmationScreen,
    processingScreen: !!processingScreen,
    resultsScreen: !!resultsScreen
  });
}

function setupEventListeners() {
  // Step 1 -> Step 2
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      console.log('Analyze button clicked');
      showStep(2);
    });
  }
  
  // Step 2 -> Step 1 (back)
  if (backToSummary) {
    backToSummary.addEventListener('click', () => {
      console.log('Back to summary clicked');
      showStep(1);
    });
  }
  
  // Step 2 -> Step 3
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      console.log('Proceed button clicked');
      showStep(3);
    });
  }
  
  // Step 3 -> Step 2 (cancel)
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      console.log('Cancel button clicked');
      showStep(2);
    });
  }
  
  // Step 3 -> Step 4 (confirm and start processing)
  if (confirmProceedBtn) {
    confirmProceedBtn.addEventListener('click', () => {
      console.log('Confirm proceed button clicked');
      showStep(4);
      startProcessing();
    });
  }
  
  // Final screen buttons
  if (viewDashboard) {
    viewDashboard.addEventListener('click', () => {
      console.log('View dashboard clicked');
      // In a real application, this would navigate to the dashboard
      alert('Navigating to Dashboard...');
    });
  }
  
  if (startNewAssessment) {
    startNewAssessment.addEventListener('click', () => {
      console.log('Start new assessment clicked');
      // Reset to beginning
      resetApplication();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentStep === 3) {
      // Allow escape to cancel confirmation
      showStep(2);
    }
  });
}

function showStep(stepNumber) {
  console.log(`Showing step ${stepNumber}`);
  
  // Hide all screens
  const screens = [summaryScreen, analysisScreen, confirmationScreen, processingScreen, resultsScreen];
  screens.forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
  
  // Show selected screen
  currentStep = stepNumber;
  switch (stepNumber) {
    case 1:
      if (summaryScreen) summaryScreen.classList.add('active');
      break;
    case 2:
      if (analysisScreen) analysisScreen.classList.add('active');
      break;
    case 3:
      if (confirmationScreen) confirmationScreen.classList.add('active');
      break;
    case 4:
      if (processingScreen) processingScreen.classList.add('active');
      break;
    case 5:
      if (resultsScreen) resultsScreen.classList.add('active');
      break;
  }
  
  // Update page title
  updatePageTitle(stepNumber);
}

function updatePageTitle(stepNumber) {
  const titles = {
    1: 'Assessment Overview',
    2: 'AI Analysis',
    3: 'Confirmation',
    4: 'Processing',
    5: 'Results'
  };
  
  const title = titles[stepNumber] || 'Hardware Vulnerability Assessment';
  document.title = `${title} - AI Agent`;
}

function startProcessing() {
  console.log('Starting processing animation');
  
  // Reset all processing steps
  processingSteps.forEach((step, index) => {
    const stepElement = document.getElementById(step.id);
    if (stepElement) {
      stepElement.classList.remove('completed', 'active');
      
      // Set initial state
      if (index === 0) {
        stepElement.classList.add('active');
      }
      
      const iconElement = stepElement.querySelector('.step-icon');
      if (iconElement) {
        iconElement.textContent = index === 0 ? '⟳' : '○';
      }
    }
  });
  
  // Process each step with delays
  processStepSequentially(0);
}

function processStepSequentially(stepIndex) {
  if (stepIndex >= processingSteps.length) {
    // All steps completed, move to results
    setTimeout(() => {
      showStep(5);
    }, 1000);
    return;
  }
  
  const step = processingSteps[stepIndex];
  const stepElement = document.getElementById(step.id);
  
  if (stepElement) {
    // Mark current step as active
    stepElement.classList.add('active');
    const iconElement = stepElement.querySelector('.step-icon');
    if (iconElement) {
      iconElement.textContent = '⟳';
    }
    
    console.log(`Processing step ${stepIndex + 1}: ${step.text}`);
    
    // Complete this step after duration
    setTimeout(() => {
      stepElement.classList.remove('active');
      stepElement.classList.add('completed');
      if (iconElement) {
        iconElement.textContent = '✓';
      }
      
      // Start next step
      const nextIndex = stepIndex + 1;
      if (nextIndex < processingSteps.length) {
        const nextStepElement = document.getElementById(processingSteps[nextIndex].id);
        if (nextStepElement) {
          nextStepElement.classList.add('active');
          const nextIconElement = nextStepElement.querySelector('.step-icon');
          if (nextIconElement) {
            nextIconElement.textContent = '⟳';
          }
        }
      }
      
      // Continue to next step
      processStepSequentially(nextIndex);
    }, step.duration);
  } else {
    console.warn(`Step element not found: ${step.id}`);
    processStepSequentially(stepIndex + 1);
  }
}

function resetApplication() {
  console.log('Resetting application');
  currentStep = 1;
  showStep(1);
  
  // Reset any processing states
  processingSteps.forEach(step => {
    const stepElement = document.getElementById(step.id);
    if (stepElement) {
      stepElement.classList.remove('completed', 'active');
      const iconElement = stepElement.querySelector('.step-icon');
      if (iconElement) {
        iconElement.textContent = '○';
      }
    }
  });
}

// Utility functions for enhanced UX
function showLoadingState(button) {
  if (!button) return;
  
  const originalText = button.textContent;
  button.textContent = 'Processing...';
  button.disabled = true;
  
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 1500);
}

function animateCountUp(element, finalValue) {
  if (!element) return;
  
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = finalValue / steps;
  let currentValue = 0;
  
  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      currentValue = finalValue;
      clearInterval(timer);
    }
    
    // Update display based on type of value
    if (typeof finalValue === 'string' && finalValue.includes('%')) {
      element.textContent = Math.round(currentValue) + '%';
    } else if (typeof finalValue === 'string' && finalValue.includes('$')) {
      element.textContent = '$' + (currentValue / 1000000).toFixed(1) + 'M';
    } else {
      element.textContent = Math.round(currentValue);
    }
  }, duration / steps);
}

// Add some visual feedback for better UX
function addButtonHoverEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Initialize enhanced UX features
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    addButtonHoverEffects();
  }, 1000);
});

// Add some Easter eggs and personality
const aiPersonalityResponses = [
  "Excellent choice! Let me analyze those critical vulnerabilities.",
  "Processing... I love solving complex security puzzles!",
  "Great! I'll have those remediation actions ready in no time.",
  "Security first! I'm on it.",
  "Time to make your infrastructure more secure!"
];

function showAIPersonality() {
  const randomResponse = aiPersonalityResponses[Math.floor(Math.random() * aiPersonalityResponses.length)];
  console.log('AI Agent says:', randomResponse);
  
  // You could show this in a toast notification or status message
  // For now, just log it for personality
}

// Analytics and tracking (placeholder for real implementation)
function trackUserAction(action, step) {
  console.log(`Analytics: User performed "${action}" on step ${step}`);
  
  // In a real application, you would send this to your analytics service
  // Example: analytics.track('vulnerability_assessment_action', { action, step, timestamp: new Date() });
}

// Enhanced event tracking
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn')) {
    const buttonText = e.target.textContent.trim();
    trackUserAction(buttonText, currentStep);
    
    // Add some AI personality on major actions
    if (buttonText.includes('Proceed') || buttonText.includes('Analyze')) {
      showAIPersonality();
    }
  }
});

// Performance monitoring (basic)
function measureStepTransitionTime() {
  const startTime = performance.now();
  
  return function() {
    const endTime = performance.now();
    const transitionTime = endTime - startTime;
    console.log(`Step transition took ${transitionTime.toFixed(2)}ms`);
    
    // Track slow transitions
    if (transitionTime > 500) {
      console.warn('Slow step transition detected');
    }
  };
}

// Auto-save progress (in a real app, this would use localStorage or server)
function saveProgress() {
  const progressData = {
    currentStep,
    timestamp: new Date().toISOString(),
    completed: currentStep === 5
  };
  
  console.log('Progress saved:', progressData);
  // localStorage.setItem('assessment_progress', JSON.stringify(progressData));
}

// Save progress on step changes
const originalShowStep = showStep;
showStep = function(stepNumber) {
  const measureTime = measureStepTransitionTime();
  originalShowStep(stepNumber);
  measureTime();
  saveProgress();
};

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels for screen readers
  const stepScreens = document.querySelectorAll('.step-screen');
  stepScreens.forEach((screen, index) => {
    screen.setAttribute('aria-hidden', screen.classList.contains('active') ? 'false' : 'true');
    screen.setAttribute('role', 'tabpanel');
  });
  
  // Add keyboard navigation hints
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.setAttribute('role', 'button');
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(enhanceAccessibility, 500);
});

// Error handling and recovery
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
  
  // In a real application, you might want to:
  // - Show a user-friendly error message
  // - Attempt to recover or restart
  // - Send error reports to monitoring service
  
  alert('An unexpected error occurred. The application will attempt to recover.');
  resetApplication();
});

// Export functions for potential external use or testing
window.VulnerabilityAssessment = {
  showStep,
  resetApplication,
  startProcessing,
  currentStep: () => currentStep,
  assessmentData
};