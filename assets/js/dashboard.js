// ===== PAGE MANAGEMENT =====
function setPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  document.getElementById(`nav-${pageName}`).classList.add('active');
  
  // Update title
  const titles = {
    dashboard: 'Dashboard',
    florra: 'Florra AI',
    verify: 'Verify Practice',
    leaderboard: 'Leaderboard'
  };
  document.getElementById('page-title').textContent = titles[pageName];
  
  // Show selected page
  const content = document.getElementById('content');
  content.innerHTML = '';
  
  if (pageName === 'dashboard') renderDashboard();
  else if (pageName === 'florra') renderFlorra();
  else if (pageName === 'verify') renderVerify();
  else if (pageName === 'leaderboard') renderLeaderboard();
}

// ===== DASHBOARD PAGE =====
function renderDashboard() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="page active" id="page-dashboard">
      <!-- Metrics -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Total Score</div>
          <div class="metric-value">1,240</div>
          <div class="metric-change">+240 this month</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Current Level</div>
          <div class="metric-value">4</div>
          <div class="metric-change">Next: 1,500 pts</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Achievements</div>
          <div class="metric-value">12</div>
          <div class="metric-change">2 new this week</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Verified Practices</div>
          <div class="metric-value">28</div>
          <div class="metric-change">+8 pending</div>
        </div>
      </div>

      <!-- Activity -->
      <div class="activity-section">
        <div class="section-title">Recent Activity</div>
        <div class="activity-item">
          <div class="activity-icon">🌾</div>
          <div class="activity-content">
            <div class="activity-title">Crop Rotation Verified</div>
            <div class="activity-time">2 hours ago</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">💧</div>
          <div class="activity-content">
            <div class="activity-title">Completed Water Conservation Task</div>
            <div class="activity-time">1 day ago</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">🏆</div>
          <div class="activity-content">
            <div class="activity-title">Reached Level 4</div>
            <div class="activity-time">3 days ago</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">📸</div>
          <div class="activity-content">
            <div class="activity-title">Image Verification Accepted</div>
            <div class="activity-time">5 days ago</div>
          </div>
        </div>
      </div>

      <!-- Streak -->
      <div class="streak-container">
        <div class="streak-days">12</div>
        <div class="streak-label">Day Streak 🔥</div>
      </div>
    </div>
  `;
}

// ===== FLORRA AI PAGE =====
let chatHistory = [
  { role: 'ai', text: 'नमस्ते! 🌱 मैं Florra हूँ, आपका कृषि सहायक। कृषि, जल संरक्षण, या टिकाऊ खेती के बारे में मुझसे कुछ भी पूछें!' }
];

function renderFlorra() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="page active" id="page-florra">
      <div class="chat-container">
        <div class="chat-messages" id="chat-messages">
          ${chatHistory.map(msg => `
            <div class="message ${msg.role}">
              <div class="message-bubble">${msg.text}</div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input-group">
          <input type="text" class="chat-input" id="chat-input" placeholder="Ask Florra about farming...">
          <button class="chat-send-btn" onclick="sendMessage()">Send</button>
        </div>
      </div>
    </div>
  `;
  
  // Focus input and setup enter key
  const input = document.getElementById('chat-input');
  input.focus();
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  chatHistory.push({ role: 'user', text: message });
  
  // Get AI response
  const aiResponse = getAIResponse(message);
  chatHistory.push({ role: 'ai', text: aiResponse });
  
  // Refresh chat
  renderFlorra();
  
  // Auto-scroll
  setTimeout(() => {
    const messages = document.getElementById('chat-messages');
    messages.scrollTop = messages.scrollHeight;
  }, 50);
}

function getAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  const responses = {
    'water': 'पानी बचाने के लिए ड्रिप सिंचाई सबसे अच्छा तरीका है। यह 40-60% पानी बचा सकता है और पैदावार भी बढ़ाता है। 💧',
    'crop': 'फसल चक्र से मिट्टी की उर्वरता बढ़ती है। हर 3 साल में फसल बदलने की सलाह दी जाती है। 🌾',
    'soil': 'मिट्टी की जांच हर साल करवाएं। कार्बनिक खाद मिट्टी को स्वस्थ रखता है। 🌱',
    'organic': 'जैविक खेती से मिट्टी की गुणवत्ता बेहतर ��ोती है और रसायन कम होते हैं। 🌿',
    'weather': 'मौसम की जानकारी के लिए स्थानीय कृषि विभाग से संपर्क करें। बारिश के पहले सिंचाई कम करें। ☁️',
    'pest': 'कीटों से बचाव के लिए ट्रैप क्रॉप और जैविक कीटनाशक बेहतर हैं। 🦗',
    'yield': 'पैदावार बढ़ाने के लिए गुणवत्तापूर्ण बीज, सही समय पर बुवाई, और उचित सिंचाई जरूरी है। 📈'
  };
  
  // Check for keywords
  for (const [key, response] of Object.entries(responses)) {
    if (msg.includes(key)) return response;
  }
  
  // Default responses
  const defaultResponses = [
    'यह बहुत अच्छा सवाल है! 🤔 अपने स्थानीय कृषि अधिकारी से सलाह लें।',
    'टिकाऊ खेती के लिए प्रकृति के साथ काम करें। 🌍',
    'धरा पर आपका स्वागत है! अधिक विवरण के लिए पूछें। 🌱'
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ===== VERIFY PRACTICE PAGE =====
function renderVerify() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <div class="page active" id="page-verify">
      <div class="verify-container">
        <div class="upload-area" onclick="verifyImage()">
          <div class="upload-icon">📸</div>
          <div class="upload-text">Upload Farm Image</div>
          <div class="upload-subtext">Click to upload a photo of your farming practice</div>
        </div>
        <div class="verification-result" id="verification-result">
          <div class="result-status">
            <div class="result-badge success" id="result-badge">✓</div>
            <div>
              <div class="result-text" id="result-title">Practice Verified!</div>
              <div class="result-details" id="result-details">Your sustainable farming practice has been verified.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function verifyImage() {
  const result = document.getElementById('verification-result');
  const badge = document.getElementById('result-badge');
  const title = document.getElementById('result-title');
  const details = document.getElementById('result-details');
  
  // Random success/failure
  const isSuccess = Math.random() > 0.3;
  
  if (isSuccess) {
    result.classList.add('show');
    badge.className = 'result-badge success';
    badge.textContent = '✓';
    title.textContent = 'Practice Verified! ✓';
    details.textContent = 'Your sustainable farming practice has been successfully verified. +50 points added to your account! 🎉';
  } else {
    result.classList.add('show');
    badge.className = 'result-badge fail';
    badge.textContent = '✗';
    title.textContent = 'Verification Unsuccessful';
    details.textContent = 'The image does not clearly show a sustainable farming practice. Please upload a clearer image.';
  }
}

// ===== LEADERBOARD PAGE =====
function renderLeaderboard() {
  const content = document.getElementById('content');
  
  const farmers = [
    { rank: 1, name: 'Ravi Kumar', location: 'Indore, MP', score: 2840 },
    { rank: 2, name: 'Priya Singh', location: 'Pune, MH', score: 2620 },
    { rank: 3, name: 'Arun Patel', location: 'Ahmedabad, GJ', score: 2450 },
    { rank: 4, name: 'Sunita Das', location: 'Kolkata, WB', score: 2180 },
    { rank: 5, name: 'Mohan Verma', location: 'Jaipur, RJ', score: 2050 },
    { rank: 6, name: 'Kavita Sharma', location: 'Chandigarh', score: 1920 },
    { rank: 7, name: 'Rajesh Gupta', location: 'Delhi', score: 1850 },
    { rank: 8, name: 'Anita Reddy', location: 'Bangalore, KA', score: 1720 }
  ];
  
  content.innerHTML = `
    <div class="page active" id="page-leaderboard">
      <div class="leaderboard-container">
        <div class="leaderboard-list">
          ${farmers.map(f => `
            <div class="leaderboard-item">
              <div class="rank-badge ${f.rank === 1 ? 'top1' : f.rank === 2 ? 'top2' : f.rank === 3 ? 'top3' : 'other'}">
                ${f.rank === 1 ? '🥇' : f.rank === 2 ? '🥈' : f.rank === 3 ? '🥉' : f.rank}
              </div>
              <div class="leaderboard-info">
                <div class="leaderboard-name">${f.name}</div>
                <div class="leaderboard-loc">${f.location}</div>
              </div>
              <div class="leaderboard-score">${f.score} pts</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  setPage('dashboard');
});
