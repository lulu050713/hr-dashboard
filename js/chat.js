// AI Chat — handles message sending, local tier lookup, and DeepSeek API calls
(function() {
  var DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
  var DEEPSEEK_KEY = 'sk-458dd295dfc2493fa139afe30172f3dd';
  var SYSTEM_PROMPT = '你是网易游戏HR招聘助手，专注于游戏行业人才招聘。你的能力：\n\n1. **公司梯队判定**：\n- T0（第一梯队）：腾讯、网易、米哈游\n- T1（第二梯队）：莉莉丝、叠纸、鹰角、字节、沐瞳、阿里、库洛、点点互动、Funplus\n- T2（第三梯队）：巨人、西山居、心动、完美世界、Garena、无端、深蓝互动、快手、乐元素、雷霆、IGG、蛮啾、散爆、祖龙、多益、盛趣、欢乐互娱、永航、友塔、元趣、智明星通、英雄互娱、游族、三七互娱、江娱互动、游卡、Bilibili、4399、途游、拳头、EA、育碧\n判定依据：团队规模、产品营收、行业口碑、技术实力。\n\n2. **推荐语生成**模板：\n推荐一名[岗位]人选\n1、[姓名]，[公司]在职/离职，意向[城市]；看机会原因：[原因]。\n2、[公司]（GPT/非GPT）[年限]，负责[核心职责]；团队[规模]。风格：[描述]。AI使用：[情况]。\n3、薪资：[金额]×[薪数]。\n4、[其他流程]；游戏体验：[游戏列表]。\n\n3. **招聘问答**：回答游戏行业招聘相关问题。\n\n回答简洁专业，使用中文。如果用户只输入公司名，直接给出梯队判定和简要分析。';

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

    var messages = [{ role: 'system', content: SYSTEM_PROMPT }];
    history.slice(-6).forEach(function(msg) {
      messages.push({ role: msg.role, content: msg.content });
    });

    fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + DEEPSEEK_KEY
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      removeTyping();
      var reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      if (reply) {
        appendMessage('ai', reply);
        history.push({ role: 'assistant', content: reply });
      } else {
        appendMessage('ai', '⚠️ AI 服务暂时不可用，请稍后重试。\n\n提示：公司梯队查询可离线使用，直接输入公司名即可。');
      }
    })
    .catch(function() {
      removeTyping();
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
