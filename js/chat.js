// AI Chat — handles message sending, local tier lookup, and DeepSeek API calls
(function() {
  var API_URL = 'https://hr-query.3061006817.workers.dev';
  var messagesEl = document.getElementById('chat-messages');
  var inputEl = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');
  var shortcuts = document.querySelectorAll('.shortcut-card');
  var history = [];
  var isLoading = false;

  // Shortcut cards
  shortcuts.forEach(function(card) {
    card.addEventListener('click', function() {
      var action = this.dataset.action;
      shortcuts.forEach(function(c) { c.classList.remove('active'); });
      this.classList.add('active');

      if (action === 'tier') {
        inputEl.placeholder = '输入公司名称，如：西山居、米哈游、莉莉丝...';
        inputEl.focus();
      } else if (action === 'recommend') {
        inputEl.placeholder = '输入候选人信息：岗位、公司、经验、薪资等...';
        inputEl.focus();
      } else {
        inputEl.placeholder = '输入你的问题...';
        inputEl.focus();
      }
    });
  });

  // Send on Enter
  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener('click', sendMessage);

  function sendMessage() {
    var text = inputEl.value.trim();
    if (!text || isLoading) return;

    appendMessage('user', text);
    inputEl.value = '';
    inputEl.placeholder = '输入公司名称、候选人信息或问题...';
    shortcuts.forEach(function(c) { c.classList.remove('active'); });

    // Try local tier lookup first
    var tierResult = localTierLookup(text);
    if (tierResult) {
      appendMessage('ai', tierResult);
      return;
    }

    // Otherwise call API
    callAPI(text);
  }

  function localTierLookup(query) {
    var tiers = CANDIDATE_DATA.companyTiers;
    var q = query.replace(/[？?,.，。\s]+/g, '').toLowerCase();

    // Direct match
    for (var name in tiers) {
      if (q === name.toLowerCase() || q.includes(name.toLowerCase())) {
        var info = tiers[name];
        var emoji = info.tier === 'T0' ? '🏆' : info.tier === 'T1' ? '🥈' : '🥉';
        return emoji + ' <b>' + name + '</b> → <b>' + info.tier + '</b>\n' + info.desc + '\n\n' +
          '梯队划分依据：团队规模、产品营收、行业口碑、技术实力综合判断。';
      }
    }

    // Check if it looks like a company query (short text, no spaces suggesting a sentence)
    if (q.length <= 10 && !q.includes('如何') && !q.includes('怎么') && !q.includes('推荐')) {
      return '🔍 未在本地数据库中找到「' + query + '」的梯队信息。\n\n正在尝试 AI 分析...';
    }

    return null;
  }

  function callAPI(text) {
    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    history.push({ role: 'user', content: text });

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: text, history: history.slice(-6) })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      removeTyping();
      if (data.success && data.reply) {
        appendMessage('ai', data.reply);
        history.push({ role: 'assistant', content: data.reply });
      } else {
        appendMessage('ai', '⚠️ AI 服务暂时不可用，请稍后重试。\n\n提示：公司梯队查询可离线使用，直接输入公司名即可。');
      }
    })
    .catch(function() {
      removeTyping();
      // If local lookup returned the "not found" message, provide a fallback
      appendMessage('ai', '⚠️ AI 服务连接失败。\n\n💡 离线可用功能：\n• 直接输入公司名称查梯队（如"西山居"、"米哈游"）\n• 本地数据覆盖 30+ 游戏公司\n\n网络恢复后即可使用推荐语生成等 AI 功能。');
    })
    .finally(function() {
      isLoading = false;
      sendBtn.disabled = false;
    });
  }

  function appendMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + (role === 'user' ? 'user' : 'ai');

    var avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';

    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = formatText(text);

    div.appendChild(avatar);
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function formatText(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'chat-msg ai';
    div.id = 'typing-msg';

    var avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = '🤖';

    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    div.appendChild(avatar);
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    var el = document.getElementById('typing-msg');
    if (el) el.remove();
  }
})();
