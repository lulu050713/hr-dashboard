// ==========================================
// 7. Pipeline Panel - Workday & Warning Logic
// ==========================================
const TODAY = new Date(2026, 6, 28); // July 28, 2026 (Tuesday)

function isWorkday(date) {
  const d = date.getDay();
  return d !== 0 && d !== 6;
}

function countWorkdays(fromDateStr) {
  const from = new Date(fromDateStr + 'T00:00:00+08:00');
  let count = 0;
  let d = new Date(from);
  d.setDate(d.getDate() + 1);
  while (d <= TODAY) {
    if (isWorkday(d)) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function daysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00+08:00');
  return Math.ceil((target - TODAY) / (1000 * 60 * 60 * 24));
}

function getWarningLevel(candidate) {
  const { stage, stageDate } = candidate;

  if (stage === '待入职') {
    const days = daysUntil(stageDate);
    return days <= 7
      ? { level: 'warning', text: days + '天后入职 ⚠️', workdays: days }
      : { level: 'normal', text: days + '天后', workdays: days };
  }
  if (stage === 'Offer已发') {
    const wd = countWorkdays(stageDate);
    return wd <= 3
      ? { level: 'normal', text: wd + '个工作日', workdays: wd }
      : { level: 'warning', text: wd + '个工作日, 需跟进', workdays: wd };
  }
  if (stage === '审批中') {
    const wd = countWorkdays(stageDate);
    if (wd > 7) return { level: 'critical', text: wd + '天, 严重超期', workdays: wd };
    if (wd > 5) return { level: 'warning', text: wd + '天, 超期', workdays: wd };
    return { level: 'normal', text: wd + '天', workdays: wd };
  }

  // Non-evaluation stages
  if (stage.includes('进行中') || stage === '测试中' || stage === '待一面' || stage === '待二面' || stage === '待三面') {
    const wd = countWorkdays(stageDate);
    if ((stage === '待一面' && wd > 2) || (stage === '待二面' && wd > 3))
      return { level: 'warning', text: '待排期' + wd + '天', workdays: wd };
    return { level: 'normal', text: wd === 0 ? '今日' : wd + '天', workdays: wd };
  }

  // Evaluation stages
  const wd = countWorkdays(stageDate);
  const round = candidate.round || 1;
  const threshold = (round >= 3) ? 5 : 3;

  if (wd > threshold + 2) return { level: 'critical', text: wd + '天, 严重超期', workdays: wd };
  if (wd > threshold) return { level: 'warning', text: wd + '天, 超期', workdays: wd };
  return { level: 'normal', text: wd + '天', workdays: wd };
}

// ==========================================
// 8. Pipeline Panel Rendering
// ==========================================
let currentPipelineType = null;
let currentFilter = 'all';

function openPipelinePanel(type) {
  currentPipelineType = type;
  currentFilter = 'all';

  const section = document.getElementById('pipeline-detail');
  const title = document.getElementById('pipeline-panel-title');
  const count = document.getElementById('pipeline-panel-count');
  const data = CANDIDATE_DATA.pipelineDetails[type];

  if (type === 'interview') {
    title.innerHTML = '📋 面试管道追踪';
    count.textContent = data.length + '人';
    document.getElementById('pipeline-thead').innerHTML =
      '<tr><th>姓名</th><th>岗位</th><th>当前阶段</th><th>时间</th><th>工作日</th><th>状态</th><th></th></tr>';
  } else {
    title.innerHTML = '🎯 Offer 追踪';
    count.textContent = data.length + '人';
    document.getElementById('pipeline-thead').innerHTML =
      '<tr><th>姓名</th><th>方向</th><th>岗位</th><th>Offer状态</th><th>时间</th><th>工作日</th><th>状态</th><th></th></tr>';
  }

  document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('active-card'));
  const targetCards = document.querySelectorAll('.metric-card.accent-purple, .metric-card.accent-red');
  if (type === 'interview') targetCards[0].classList.add('active-card');
  else targetCards[1].classList.add('active-card');

  section.style.display = 'block';
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

  renderPipelineTable();
  updateWarningSidebar();
  updateStatsBar();

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
}

window.closePipelinePanel = function() {
  document.getElementById('pipeline-detail').style.display = 'none';
  currentPipelineType = null;
  document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('active-card'));
};

function renderPipelineTable() {
  const tbody = document.getElementById('pipeline-tbody');
  const data = CANDIDATE_DATA.pipelineDetails[currentPipelineType];
  const enriched = data.map(c => ({ ...c, warning: getWarningLevel(c) }));
  const filtered = currentFilter === 'all' ? enriched : enriched.filter(c => c.warning.level === currentFilter);

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">暂无数据</td></tr>';
    return;
  }

  filtered.forEach(c => {
    const w = c.warning;
    const rowClass = 'row-' + w.level;
    const badgeClass = 'badge-' + w.level;
    const badgeLabel = { normal: '✅ 正常', warning: '🟡 预警', critical: '🔴 严重' }[w.level];

    const row = document.createElement('tr');
    row.className = rowClass + ' row-expand';
    row.dataset.id = c.id;

    row.innerHTML =
      '<td><span class="expand-icon">▶</span><strong>' + c.name + '</strong></td>' +
      '<td>' + (c.direction || '') + '</td>' +
      '<td>' + c.position + '</td>' +
      '<td>' + c.stage + '</td>' +
      '<td>' + c.stageDate.slice(5) + '</td>' +
      '<td>' + w.text + '</td>' +
      '<td><span class="badge-stage ' + badgeClass + '">' + badgeLabel + '</span></td>' +
      '<td></td>';

    const tlRow = document.createElement('tr');
    tlRow.className = 'timeline-row';
    tlRow.style.display = 'none';
    tlRow.dataset.timelineFor = c.id;
    tlRow.innerHTML = '<td colspan="8"><div class="timeline-inner">' +
      c.timeline.map(t =>
        '<div class="timeline-item">' +
        '<span class="timeline-date">' + t.date + '</span>' +
        '<span class="timeline-dot">●</span>' +
        '<span class="timeline-text"><strong>' + t.action + '</strong>：' + t.detail + '</span>' +
        '</div>'
      ).join('') +
      '</div></td>';

    row.addEventListener('click', function() {
      const icon = this.querySelector('.expand-icon');
      if (tlRow.style.display === 'none') {
        tlRow.style.display = '';
        icon.classList.add('open');
      } else {
        tlRow.style.display = 'none';
        icon.classList.remove('open');
      }
    });

    tbody.appendChild(row);
    tbody.appendChild(tlRow);
  });
}

function updateWarningSidebar() {
  const sidebarList = document.getElementById('warning-list');
  const sidebarEmpty = document.getElementById('warning-empty');
  const data = CANDIDATE_DATA.pipelineDetails[currentPipelineType];
  const enriched = data.map(c => ({ ...c, warning: getWarningLevel(c) }));
  const warnings = enriched.filter(c => c.warning.level !== 'normal');

  if (warnings.length === 0) {
    sidebarList.innerHTML = '';
    sidebarEmpty.style.display = 'block';
    return;
  }

  sidebarEmpty.style.display = 'none';
  sidebarList.innerHTML = warnings.map(c =>
    '<div class="warning-card ' + c.warning.level + '">' +
    '<div class="wc-name">' + c.name + ' · ' + c.position + '</div>' +
    '<div class="wc-detail">' + c.stage + '<br>' + c.warning.text + '</div>' +
    '</div>'
  ).join('');
}

function updateStatsBar() {
  const bar = document.getElementById('pipeline-stats-bar');
  const data = CANDIDATE_DATA.pipelineDetails[currentPipelineType];
  const enriched = data.map(c => ({ ...c, warning: getWarningLevel(c) }));
  const normal = enriched.filter(c => c.warning.level === 'normal').length;
  const warning = enriched.filter(c => c.warning.level === 'warning').length;
  const critical = enriched.filter(c => c.warning.level === 'critical').length;
  bar.innerHTML =
    '<span class="stat-normal">✅ 正常 ' + normal + '人</span>' +
    '<span class="stat-warning">🟡 预警 ' + warning + '人</span>' +
    '<span class="stat-critical">🔴 严重 ' + critical + '人</span>';
}

// Filter buttons
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderPipelineTable();
    updateWarningSidebar();
  }
});

// ==========================================
// 9. AI Platform Interactive Demo
// ==========================================
const DEMO_CANDIDATES = [
  { name: "李先生", detail: "字节跳动 | 测试开发工程师 | 西安", status: "pending" },
  { name: "张女士", detail: "米哈游 | 游戏测试开发 | 上海", status: "pending" },
  { name: "王先生", detail: "腾讯 | 高级测试工程师 | 深圳", status: "pending" },
  { name: "赵女士", detail: "莉莉丝 | 测试开发 | 杭州", status: "pending" },
];

function renderDemoCandidates() {
  const container = document.getElementById("demo-candidates");
  if (!container) return;
  container.innerHTML = DEMO_CANDIDATES.map((c, i) => `
    <div class="demo-card" id="dc-${i}">
      <div class="dc-avatar">${i + 1}</div>
      <div class="dc-info">
        <div class="dc-name">${c.name}</div>
        <div class="dc-detail">${c.detail}</div>
      </div>
      <div class="dc-status">
        <span class="dc-tag ${c.status === "sent" ? "sent" : "pending"}" id="dc-tag-${i}">
          ${c.status === "sent" ? "✓ 已招呼" : "待招呼"}
        </span>
      </div>
    </div>
  `).join("");
}

window.handleDemoGreet = function() {
  const btn = document.getElementById("demo-greet-btn");
  const status = document.getElementById("demo-status");
  const toast = document.getElementById("demo-toast");
  if (btn.disabled) return;

  btn.disabled = true;
  btn.textContent = "⏳ 发送中...";
  status.textContent = "正在批量打招呼...";

  // Sequential animation
  DEMO_CANDIDATES.forEach((c, i) => {
    setTimeout(() => {
      const card = document.getElementById("dc-" + i);
      const tag = document.getElementById("dc-tag-" + i);
      if (card) card.classList.add("greeting");
      setTimeout(() => {
        if (card) { card.classList.remove("greeting"); card.classList.add("greeted"); }
        if (tag) { tag.className = "dc-tag sent"; tag.textContent = "✓ 已招呼"; }
        c.status = "sent";
        status.textContent = "已完成 " + (i + 1) + "/" + DEMO_CANDIDATES.length;
      }, 600);
    }, i * 700);
  });

  setTimeout(() => {
    btn.textContent = "✅ 已招呼 " + DEMO_CANDIDATES.length + " 人";
    status.textContent = "全部招呼发送完毕";
    toast.style.display = "block";
    toast.innerHTML = "<strong>🎉 一键招呼完成！</strong> 已向 " + DEMO_CANDIDATES.length + " 名候选人批量发送招呼消息。实际平台支持同时触达200+候选人。";
  }, DEMO_CANDIDATES.length * 700 + 600);
};

document.addEventListener("DOMContentLoaded", renderDemoCandidates);
