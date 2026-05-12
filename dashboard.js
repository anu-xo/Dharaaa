const API_KEY = "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";
const pages = { dashboard: renderDashboard, florra: renderFlorra, verify: renderVerify, leaderboard: renderLeaderboard };
let currentPage = 'dashboard';
let chatMessages = [
  { role: 'bot', text: 'Hello Ravi! 🌿 I\'m Florra, your AI farming assistant. Ask me anything about crop health, irrigation, fertilizers, or any farming question — I\'m here to help!', time: 'Just now' }
];
let isTyping = false;

function setPage(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('nav-' + page).classList.add('active');
  const titles = { dashboard: 'Dashboard', florra: 'Florra AI Assistant', verify: 'Verify Practice', leaderboard: 'Leaderboard' };
  document.getElementById('page-title').textContent = titles[page];
  pages[page]();
}

function renderDashboard() {
  document.getElementById('content').innerHTML = `
    <div class="page-enter">
      <!-- ALERT -->
      <div class="alert-card" style="margin-bottom:18px;">
        <div class="alert-icon"><i class="ti ti-alert-triangle"></i></div>
        <div style="flex:1;">
          <div class="alert-title">⚠️ Missed opportunity detected</div>
          <div class="alert-sub">Soil moisture check is 2 days overdue. Get guidance from Florra or log it now.</div>
        </div>
        <button class="btn btn-primary" onclick="setPage('florra')"><i class="ti ti-message-chatbot"></i> Ask Florra</button>
      </div>

      <!-- METRICS -->
      <div class="metric-grid">
        <div class="metric-card green-accent">
          <div class="metric-icon green"><i class="ti ti-leaf"></i></div>
          <div class="metric-label">Sustainability Score</div>
          <div class="metric-val green">76/100</div>
          <div class="metric-delta"><i class="ti ti-trending-up"></i> +8 this week</div>
        </div>
        <div class="metric-card blue-accent">
          <div class="metric-icon blue"><i class="ti ti-droplet"></i></div>
          <div class="metric-label">Water Saved</div>
          <div class="metric-val blue">340 L</div>
          <div class="metric-delta"><i class="ti ti-trending-up"></i> 12% above average</div>
        </div>
        <div class="metric-card amber-accent">
          <div class="metric-icon amber"><i class="ti ti-coin"></i></div>
          <div class="metric-label">Points Earned</div>
          <div class="metric-val amber">1,240</div>
          <div class="metric-delta"><i class="ti ti-trending-up"></i> +80 today</div>
        </div>
        <div class="metric-card">
          <div class="metric-icon fire"><i class="ti ti-flame"></i></div>
          <div class="metric-label">Active Streak</div>
          <div class="metric-val fire">6 days</div>
          <div class="metric-delta neutral">🔥 Outstanding!</div>
        </div>
      </div>

      <!-- ROW 2 -->
      <div class="row2">
        <!-- SCORE CARD -->
        <div class="card">
          <div class="card-title"><i class="ti ti-chart-pie"></i> Sustainability Score</div>
          <div class="score-ring">
            <div class="ring-wrap">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#EAF3DE" stroke-width="9"/>
                <circle cx="40" cy="40" r="32" fill="none" stroke="url(#greenGrad)" stroke-width="9"
                  stroke-dasharray="${2*Math.PI*32*0.76} ${2*Math.PI*32*(1-0.76)}"
                  stroke-linecap="round"/>
                <defs>
                  <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#3B6D11"/>
                    <stop offset="100%" stop-color="#97C459"/>
                  </linearGradient>
                </defs>
              </svg>
              <div class="ring-center"><span class="ring-num">76</span><span class="ring-of">/100</span></div>
            </div>
            <div>
              <div class="score-tag"><i class="ti ti-star"></i> Good — Above district average</div>
              <div class="score-hint" style="margin-top:6px;">Improve irrigation scheduling to reach <strong>85+</strong></div>
            </div>
          </div>
          <div class="bar-section">
            <div class="bar-row">
              <span class="bar-label">Irrigation</span>
              <div class="bar-bg"><div class="bar-fill" style="width:82%;background:linear-gradient(90deg,#3B6D11,#63991E)"></div></div>
              <span class="bar-pct">82%</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Soil health</span>
              <div class="bar-bg"><div class="bar-fill" style="width:70%;background:linear-gradient(90deg,#63991E,#97C459)"></div></div>
              <span class="bar-pct">70%</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Crop rotation</span>
              <div class="bar-bg"><div class="bar-fill" style="width:65%;background:linear-gradient(90deg,#97C459,#C0DD97)"></div></div>
              <span class="bar-pct">65%</span>
            </div>
            <div class="bar-row">
              <span class="bar-label">Pesticide use</span>
              <div class="bar-bg"><div class="bar-fill" style="width:88%;background:linear-gradient(90deg,#3B6D11,#63991E)"></div></div>
              <span class="bar-pct">88%</span>
            </div>
          </div>
        </div>

        <!-- STREAK + ACTIVITY -->
        <div class="card">
          <div class="card-title"><i class="ti ti-flame"></i> Weekly Streak</div>
          <div class="streak-label">This week's activity</div>
          <div class="streak-row">
            ${[['Sun','✓'],['Mon','✓'],['Tue','✓'],['Wed','✓'],['Thu','✓'],['Fri','→'],['Sat','']].map(([d,s],i) => {
              let cls = i < 5 ? 'streak-done' : i === 5 ? 'streak-today' : 'streak-miss';
              return `<div class="streak-day ${cls}"><span>${s || '–'}</span>${d}</div>`;
            }).join('')}
          </div>
          <div class="streak-info">
            🔥 <strong>6-day streak!</strong> You've logged activities for 6 consecutive days.<br>
            Complete today's tasks to earn <strong>+20 bonus points!</strong>
          </div>

          <div class="activity-list">
            <div class="activity-label">Recent Activity</div>
            <div class="activity-item">
              <div class="act-icon green"><i class="ti ti-droplet-check"></i></div>
              <div class="activity-text"><strong>Drip irrigation verified</strong> — wheat field</div>
              <div class="activity-time">2 hours ago</div>
            </div>
            <div class="activity-item">
              <div class="act-icon amber"><i class="ti ti-alert-circle"></i></div>
              <div class="activity-text"><strong>Soil test missed</strong> — reminder sent</div>
              <div class="activity-time">1 day ago</div>
            </div>
            <div class="activity-item">
              <div class="act-icon green"><i class="ti ti-plant-2"></i></div>
              <div class="activity-text"><strong>Organic fertilizer logged</strong> — +15 pts</div>
              <div class="activity-time">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFlorra() {
  document.getElementById('content').innerHTML = `
    <div class="page-enter chat-wrap" style="height:calc(100vh - 60px - 48px);">
      <div class="chat-header">
        <div class="florra-avatar"><i class="ti ti-plant"></i></div>
        <div>
          <div class="florra-name">Florra</div>
          <div class="florra-status"><div class="status-dot"></div> AI Agriculture Assistant · Online</div>
        </div>
      </div>

      <div class="chat-messages" id="chat-msgs"></div>

      <div class="quick-q" id="quick-qs">
        <span class="quick-chip" onclick="sendQuick('Why are my crops turning yellow?')">🌾 Yellow crops</span>
        <span class="quick-chip" onclick="sendQuick('What is the best crop for Kharif season in Madhya Pradesh?')">🌧️ Kharif crop advice</span>
        <span class="quick-chip" onclick="sendQuick('How can I reduce water usage in my wheat field?')">💧 Save water</span>
        <span class="quick-chip" onclick="sendQuick('What is the best organic fertilizer for wheat?')">🌿 Fertilizer advice</span>
      </div>

     <div class="chat-input-row">
  <div class="chat-input-wrap">
    <i class="ti ti-message-circle"></i>
    <input
      type="text"
      id="chat-input"
      placeholder="Ask Florra anything about your farm..."
      onkeydown="if(event.key==='Enter')sendChat()"
    />
  </div>
  <button class="mic-btn" onclick="startVoice()">
    <i class="ti ti-microphone"></i>
  </button>
  <button class="send-btn" id="send-btn" onclick="sendChat()">
    <i class="ti ti-send"></i>
  </button>
</div> 
  `;
  renderMessages();
}

function renderMessages() {
  const el = document.getElementById('chat-msgs');
  if (!el) return;
  el.innerHTML = chatMessages.map(m => `
    <div class="msg ${m.role === 'user' ? 'user' : 'bot'}">
      <div class="msg-bubble">${m.text}</div>
      <div class="msg-time">${m.time}</div>
    </div>
  `).join('');
  if (isTyping) {
    el.innerHTML += `<div class="msg bot"><div class="typing"><div class="dot-anim"></div><div class="dot-anim"></div><div class="dot-anim"></div></div></div>`;
  }
  el.scrollTop = el.scrollHeight;
}

function sendQuick(q) {
  document.getElementById('chat-input').value = q;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || isTyping) return;
  input.value = '';
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  chatMessages.push({ role: 'user', text, time: now });
  isTyping = true;
  renderMessages();
  document.getElementById('send-btn').disabled = true;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Florra, an AI agriculture assistant for Dharaa — a sustainable farming platform in India. Speak in simple Hinglish understandable to Indian farmers.
Use friendly and practical language.
              
Farmer message: ${text}`
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that.";
    isTyping = false;
    chatMessages.push({ role: 'bot', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  } catch (e) {
    isTyping = false;
    chatMessages.push({ role: 'bot', text: '🔴 Network error. Please check your connection and try again.', time: 'Just now' });
  }
  renderMessages();
  if (document.getElementById('send-btn')) document.getElementById('send-btn').disabled = false;
}

function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("chat-input").value = transcript;
  };

  recognition.onerror = (event) => {
    alert("Voice error: " + event.error);
  };
}

function renderVerify() {
  document.getElementById('content').innerHTML = `
    <div class="page-enter verify-grid">
      <div>
        <div class="upload-zone" onclick="simulateUpload()" id="upload-zone">
          <div class="upload-icon-wrap"><i class="ti ti-camera-plus"></i></div>
          <div class="upload-title">Upload a crop or field image</div>
          <div class="upload-sub">AI will analyze and verify your sustainable practice</div>
          <div class="type-chips">
            <span class="type-chip">🌾 Crop health</span>
            <span class="type-chip">💧 Irrigation</span>
            <span class="type-chip">🌱 Soil</span>
          </div>
          <div style="margin-top:18px;">
            <button class="btn btn-primary" style="margin:0 auto;display:flex;align-items:center;gap:6px;" onclick="simulateUpload()">
              <i class="ti ti-upload"></i> Upload Image
            </button>
          </div>
        </div>

        <div style="margin-top:16px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:16px;">
          <div style="font-size:12px;font-weight:600;color:var(--ink-faint);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Supported Formats</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${['JPG/JPEG','PNG','HEIC','WebP'].map(f => `<span style="font-size:12px;padding:4px 10px;background:var(--paper);border:1px solid var(--border);border-radius:6px;color:var(--ink-mid);">${f}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="analysis-card" id="analysis-box" style="display:none;animation:fadeUp 0.3s ease;">
        <div class="analysis-title"><i class="ti ti-robot" style="color:var(--green-bright);"></i> AI Analysis Result</div>
        <div class="analysis-row">
          <span class="analysis-label">Practice detected</span>
          <span class="badge badge-good"><i class="ti ti-check"></i> Drip Irrigation</span>
        </div>
        <div class="analysis-row">
          <span class="analysis-label">Crop health</span>
          <span class="badge badge-good"><i class="ti ti-check"></i> Healthy</span>
        </div>
        <div class="analysis-row">
          <span class="analysis-label">Water efficiency</span>
          <span class="badge badge-good"><i class="ti ti-check"></i> Efficient</span>
        </div>
        <div class="analysis-row">
          <span class="analysis-label">Soil coverage</span>
          <span class="badge badge-warn"><i class="ti ti-alert-circle"></i> Mulching recommended</span>
        </div>
        <div class="analysis-tip">
          💡 <strong>Suggestion:</strong> Apply organic mulch around plant bases — this can reduce soil moisture evaporation by up to 25%.
        </div>
        <div class="pts-earned">
          <i class="ti ti-coin" style="font-size:18px;"></i>
          +35 sustainability points earned — Drip Irrigation verified!
        </div>
        <button class="btn btn-outline" style="width:100%;margin-top:10px;justify-content:center;display:flex;align-items:center;gap:5px;" onclick="setPage('florra')">
          <i class="ti ti-message-chatbot"></i> Get advice from Florra
        </button>
      </div>

      <!-- Empty state for analysis -->
      <div class="analysis-card" id="analysis-empty" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:300px;">
        <div style="font-size:48px;margin-bottom:12px;opacity:0.3;">🔍</div>
        <div style="font-size:14px;color:var(--ink-faint);line-height:1.6;">Upload an image and<br>AI analysis will appear here</div>
      </div>
    </div>
  `;
}

function simulateUpload() {
  const zone = document.getElementById('upload-zone');
  const box = document.getElementById('analysis-box');
  const empty = document.getElementById('analysis-empty');
  zone.innerHTML = `
    <div class="upload-icon-wrap" style="background:var(--amber-pale);">
      <i class="ti ti-loader spin" style="color:var(--amber);font-size:28px;"></i>
    </div>
    <div style="font-size:14px;font-weight:500;color:var(--ink-mid);margin-top:10px;">Analyzing image...</div>
    <div style="font-size:12px;color:var(--ink-faint);margin-top:4px;">AI is examining your farming practice</div>
  `;
  zone.style.pointerEvents = 'none';
  setTimeout(() => {
    zone.innerHTML = `
      <div class="upload-icon-wrap" style="background:var(--green-mist);">
        <i class="ti ti-check" style="color:var(--green-mid);font-size:28px;"></i>
      </div>
      <div style="font-size:14px;font-weight:600;color:var(--green-mid);margin-top:10px;">✅ Image analyzed!</div>
      <div style="font-size:12px;color:var(--ink-faint);margin-top:4px;">See results here →</div>
    `;
    empty.style.display = 'none';
    box.style.display = 'block';
  }, 1800);
}

function renderLeaderboard() {
  const farmers = [
    { rank:1, name:'Suresh Patel', loc:'Bhopal', score:94, pts:2840, medal:'🥇' },
    { rank:2, name:'Anita Sharma', loc:'Ujjain', score:89, pts:2210, medal:'🥈' },
    { rank:3, name:'Manoj Yadav', loc:'Jabalpur', score:85, pts:1980, medal:'🥉' },
    { rank:4, name:'Ravi Kumar', loc:'Indore', score:76, pts:1240, you:true },
    { rank:5, name:'Priya Verma', loc:'Dewas', score:72, pts:1140 },
  ];
  document.getElementById('content').innerHTML = `
    <div class="page-enter lb-wrap">
      <div class="lb-header">
        <div>
          <div class="section-title" style="font-size:15px;">🏆 Top Sustainable Farmers</div>
          <div class="lb-sub">This month · Madhya Pradesh</div>
        </div>
        <div class="rank-badge">Your rank: <strong>#4</strong></div>
      </div>

      ${farmers.map(f => `
        <div class="lb-item ${f.you ? 'you' : ''}">
          <div class="lb-rank">${f.medal || f.rank}</div>
          <div class="lb-avatar">${f.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="lb-name-wrap">
            <div class="lb-name">${f.name} ${f.you ? '<span class="you-tag">You</span>' : ''}</div>
            <div class="lb-loc"><i class="ti ti-map-pin" style="font-size:10px;"></i> ${f.loc}</div>
          </div>
          <div class="lb-score-wrap">
            <div class="lb-score">${f.score}/100</div>
            <div class="lb-score-bar"><div class="lb-score-fill" style="width:${f.score}%;"></div></div>
            <div class="lb-pts">${f.pts.toLocaleString('en-IN')} pts</div>
          </div>
        </div>
      `).join('')}

      <div class="lb-callout">
        <i class="ti ti-rocket"></i>
        <div>Just <strong>14 more points</strong> to overtake rank #3! Verify 2 more sustainable practices today.</div>
      </div>
    </div>
  `;
}

// Init
setPage('dashboard');

const style = document.createElement('style');
style.textContent = '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
document.head.appendChild(style);
