// Application Data
const appData = {
  priorityActions: [
    {
      id: 1,
      title: "Critical PLC Firmware Vulnerability",
      deviceCount: 8,
      severity: "critical",
      impact: "Production line shutdown risk",
      recommendation: "Immediate patching during next maintenance window",
      timeToAction: "24 hours",
      cveId: "CVE-2024-8756"
    },
    {
      id: 2,
      title: "HMI Authentication Bypass",
      deviceCount: 15,
      severity: "high", 
      impact: "Unauthorized operator access",
      recommendation: "Update firmware and reset default credentials",
      timeToAction: "7 days",
      cveId: "CVE-2024-7891"
    },
    {
      id: 3,
      title: "SCADA System Buffer Overflow",
      deviceCount: 3,
      severity: "medium",
      impact: "Service disruption possible",
      recommendation: "Schedule patching with operations team",
      timeToAction: "30 days", 
      cveId: "CVE-2024-6543"
    }
  ],
  userProgress: {
    criticalResolved: 85,
    monthlyTarget: 90,
    streakDays: 12,
    totalAssessments: 234,
    completedActions: 198
  },
  achievements: [
    {name: "Vulnerability Hunter", earned: true, description: "Resolved 50+ critical vulnerabilities"},
    {name: "Risk Mitigator", earned: true, description: "Prevented 10+ security incidents"},
    {name: "Security Champion", earned: false, description: "Maintain 30-day streak"}
  ],
  impactMetrics: {
    incidentsPrevented: 27,
    downtimePrevented: "156 hours",
    costSaved: "$2.4M",
    securityPostureScore: 94
  },
  recentSuccesses: [
    "Resolved critical vulnerability in Assembly Line 2 - prevented potential 8-hour downtime",
    "Completed monthly vulnerability assessment ahead of schedule",
    "Achieved 95% compliance score for Q3"
  ]
};

// DOM Elements
let actionCards, aiPanel, aiPanelToggle, actionModal, celebration;
let modalTitle, modalBody, modalCancel, modalConfirm, modalClose;
let alertBanner, alertClose, aiPanelClose;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  actionCards = document.getElementById('actionCards');
  aiPanel = document.getElementById('aiPanel');
  aiPanelToggle = document.getElementById('aiAssistantToggle');
  actionModal = document.getElementById('actionModal');
  celebration = document.getElementById('celebration');
  
  modalTitle = document.getElementById('modalTitle');
  modalBody = document.getElementById('modalBody');
  modalCancel = document.getElementById('modalCancel');
  modalConfirm = document.getElementById('modalConfirm');
  modalClose = document.getElementById('modalClose');
  
  alertBanner = document.getElementById('alertBanner');
  alertClose = document.getElementById('alertClose');
  aiPanelClose = document.getElementById('aiPanelClose');

  // Initialize components
  renderActionCards();
  initializeProgressCircles();
  setupEventListeners();
  
  // Debug log to verify elements are found
  console.log('Dashboard initialized', {
    aiPanelToggle: !!aiPanelToggle,
    aiPanel: !!aiPanel,
    alertClose: !!alertClose,
    celebration: !!celebration
  });
});

// Render priority action cards
function renderActionCards() {
  if (!actionCards) return;
  
  actionCards.innerHTML = '';
  
  appData.priorityActions.forEach(action => {
    const card = createActionCard(action);
    actionCards.appendChild(card);
  });
}

// Create individual action card
function createActionCard(action) {
  const card = document.createElement('div');
  card.className = `action-card action-card--${action.severity}`;
  card.setAttribute('data-action-id', action.id);
  
  card.innerHTML = `
    <div class="action-card-header">
      <h3 class="action-card-title">${action.title}</h3>
      <span class="severity-badge severity-badge--${action.severity}">${action.severity}</span>
    </div>
    <div class="action-card-meta">
      <div class="meta-item">
        <span class="meta-value">${action.deviceCount}</span> devices affected
      </div>
      <div class="meta-item">
        CVE: <span class="meta-value">${action.cveId}</span>
      </div>
    </div>
    <div class="action-card-description">
      <strong>Impact:</strong> ${action.impact}
    </div>
    <div class="action-card-footer">
      <button class="btn btn--primary btn--sm action-btn">Take Action</button>
      <div class="time-indicator">⏱️ ${action.timeToAction}</div>
    </div>
  `;
  
  // Add click event listener to the entire card
  card.addEventListener('click', (e) => {
    // Prevent opening modal if clicking the button specifically
    if (!e.target.classList.contains('action-btn')) {
      openActionModal(action);
    }
  });
  
  // Add specific click handler for the action button
  const actionBtn = card.querySelector('.action-btn');
  actionBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card click
    openActionModal(action);
  });
  
  return card;
}

// Initialize progress circles
function initializeProgressCircles() {
  const progressCircles = document.querySelectorAll('.progress-circle');
  
  progressCircles.forEach(circle => {
    const progress = circle.getAttribute('data-progress');
    if (progress) {
      circle.style.setProperty('--progress', progress);
      
      // Animate the progress
      setTimeout(() => {
        circle.style.setProperty('--progress', progress);
      }, 500);
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  // AI Assistant toggle
  if (aiPanelToggle) {
    aiPanelToggle.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('AI Assistant toggle clicked');
      toggleAIPanel();
    });
  } else {
    console.warn('AI Panel toggle button not found');
  }
  
  // AI Panel close
  if (aiPanelClose) {
    aiPanelClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeAIPanel();
    });
  }
  
  // Alert banner close
  if (alertClose) {
    alertClose.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Alert close clicked');
      closeAlert();
    });
  } else {
    console.warn('Alert close button not found');
  }
  
  // Modal event listeners
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalCancel) {
    modalCancel.addEventListener('click', closeModal);
  }
  
  if (modalConfirm) {
    modalConfirm.addEventListener('click', confirmAction);
  }
  
  // Close modal when clicking backdrop
  if (actionModal) {
    actionModal.addEventListener('click', (e) => {
      if (e.target === actionModal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  }
  
  // Close celebration when clicking anywhere
  if (celebration) {
    celebration.addEventListener('click', closeCelebration);
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (celebration && !celebration.classList.contains('hidden')) {
        closeCelebration();
      } else if (actionModal && !actionModal.classList.contains('hidden')) {
        closeModal();
      } else if (aiPanel && aiPanel.classList.contains('active')) {
        closeAIPanel();
      }
    }
  });
}

// AI Panel functions
function toggleAIPanel() {
  if (!aiPanel) {
    console.warn('AI Panel element not found');
    return;
  }
  console.log('Toggling AI Panel, current state:', aiPanel.classList.contains('active'));
  aiPanel.classList.toggle('active');
}

function closeAIPanel() {
  if (!aiPanel) return;
  aiPanel.classList.remove('active');
}

// Alert functions
function closeAlert() {
  if (!alertBanner) {
    console.warn('Alert banner element not found');
    return;
  }
  console.log('Closing alert banner');
  alertBanner.classList.add('hidden');
}

// Modal functions
function openActionModal(action) {
  if (!actionModal || !modalTitle || !modalBody) return;
  
  modalTitle.textContent = action.title;
  
  modalBody.innerHTML = `
    <div class="vulnerability-details">
      <div class="detail-section">
        <h4 class="detail-title">Vulnerability Information</h4>
        <p class="detail-text">
          <strong>CVE ID:</strong> <a href="https://nvd.nist.gov/vuln/detail/${action.cveId}" target="_blank" class="cve-link">${action.cveId}</a><br>
          <strong>Severity:</strong> ${action.severity.toUpperCase()}<br>
          <strong>Affected Devices:</strong> ${action.deviceCount} devices
        </p>
      </div>
      
      <div class="detail-section">
        <h4 class="detail-title">Impact Analysis</h4>
        <p class="detail-text">${action.impact}</p>
      </div>
      
      <div class="detail-section">
        <h4 class="detail-title">AI Recommendation</h4>
        <p class="detail-text">${action.recommendation}</p>
      </div>
      
      <div class="detail-section">
        <h4 class="detail-title">Time to Action</h4>
        <p class="detail-text">
          <strong>Recommended timeframe:</strong> ${action.timeToAction}<br>
          ${action.severity === 'critical' ? 
            '⚠️ <strong>Immediate attention required</strong> - This vulnerability poses significant risk to production systems.' :
            '📅 Schedule maintenance window to address this vulnerability.'
          }
        </p>
      </div>
    </div>
  `;
  
  // Store the action for confirmation
  modalConfirm.setAttribute('data-action-id', action.id);
  
  actionModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!actionModal) return;
  
  actionModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function confirmAction() {
  const actionId = modalConfirm.getAttribute('data-action-id');
  const action = appData.priorityActions.find(a => a.id == actionId);
  
  if (!action) return;
  
  console.log('Confirming action for:', action.title);
  
  // Close modal first
  closeModal();
  
  // Show celebration
  setTimeout(() => {
    showCelebration();
  }, 300);
  
  // Update progress (simulate progress increase)
  setTimeout(() => {
    updateProgress();
  }, 1000);
  
  // Remove the action from the list (simulate completion)
  setTimeout(() => {
    removeCompletedAction(actionId);
  }, 3500);
}

// Celebration functions
function showCelebration() {
  if (!celebration) {
    console.warn('Celebration element not found');
    return;
  }
  
  console.log('Showing celebration');
  celebration.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Auto-close after 3 seconds
  setTimeout(() => {
    closeCelebration();
  }, 3000);
}

function closeCelebration() {
  if (!celebration) return;
  
  celebration.classList.add('hidden');
  document.body.style.overflow = '';
}

// Progress update functions
function updateProgress() {
  // Update progress circle
  const progressCircle = document.querySelector('.progress-circle');
  if (progressCircle) {
    const currentProgress = parseInt(progressCircle.getAttribute('data-progress'));
    const newProgress = Math.min(currentProgress + 5, 100);
    progressCircle.setAttribute('data-progress', newProgress);
    progressCircle.style.setProperty('--progress', newProgress);
    
    // Update the displayed value
    const progressValue = progressCircle.querySelector('.progress-value');
    if (progressValue) {
      progressValue.textContent = `${newProgress}%`;
    }
  }
  
  // Update completed actions count
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length >= 2) {
    // Update completed actions (second stat)
    const completedStat = statValues[1];
    if (completedStat && completedStat.textContent === '198') {
      completedStat.textContent = '199';
    }
  }
  
  // Update streak (first stat)
  if (statValues.length >= 1) {
    const streakStat = statValues[0];
    if (streakStat && streakStat.textContent === '12') {
      streakStat.textContent = '13';
    }
  }
}

function removeCompletedAction(actionId) {
  // Remove from data
  const actionIndex = appData.priorityActions.findIndex(a => a.id == actionId);
  if (actionIndex > -1) {
    appData.priorityActions.splice(actionIndex, 1);
  }
  
  // Remove from DOM with animation
  const card = document.querySelector(`[data-action-id="${actionId}"]`);
  if (card) {
    card.style.transition = 'all 0.5s ease-out';
    card.style.opacity = '0';
    card.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
      card.remove();
      
      // If no more critical actions, update alert banner
      const hasCritical = appData.priorityActions.some(a => a.severity === 'critical');
      if (!hasCritical && alertBanner && !alertBanner.classList.contains('hidden')) {
        const alertText = alertBanner.querySelector('.alert-text');
        const alertIcon = alertBanner.querySelector('.alert-icon');
        if (alertText && alertIcon) {
          alertText.innerHTML = '<strong>Great Progress!</strong> All critical vulnerabilities have been addressed. Keep up the excellent work!';
          alertBanner.style.backgroundColor = 'var(--color-bg-3)';
          alertIcon.textContent = '✅';
        }
      }
    }, 500);
  }
}

// Utility functions
function formatTimeAgo(hours) {
  if (hours < 1) return 'Less than an hour ago';
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function getSeverityColor(severity) {
  const colors = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#ca8a04',
    low: '#16a34a'
  };
  return colors[severity] || '#6b7280';
}

// Auto-refresh functionality (simulate real-time updates)
function initializeAutoRefresh() {
  // Simulate periodic updates every 30 seconds
  setInterval(() => {
    // Update some random metrics to show "live" data
    updateLiveMetrics();
  }, 30000);
}

function updateLiveMetrics() {
  // Simulate small changes in impact metrics
  const impactValues = document.querySelectorAll('.impact-value');
  
  if (impactValues.length >= 4) {
    // Randomly increase incidents prevented
    const incidentsElement = impactValues[0];
    const current = parseInt(incidentsElement.textContent);
    if (Math.random() > 0.7) { // 30% chance to update
      incidentsElement.textContent = current + 1;
    }
    
    // Update security score slightly
    const scoreElement = impactValues[3];
    const currentScore = parseInt(scoreElement.textContent.replace('%', ''));
    if (Math.random() > 0.8) { // 20% chance to update
      const newScore = Math.min(currentScore + 1, 100);
      scoreElement.textContent = `${newScore}%`;
    }
  }
}

// Initialize auto-refresh when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeAutoRefresh, 5000); // Start after 5 seconds
});

// Smooth scrolling for any anchor links
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Performance optimization: Lazy load non-critical content
function lazyLoadContent() {
  // This would be used for loading additional data when needed
  // For now, it's a placeholder for future enhancements
}

// Export functions for potential testing or external use
window.VulnerabilityDashboard = {
  openActionModal,
  closeModal,
  toggleAIPanel,
  updateProgress,
  showCelebration
};