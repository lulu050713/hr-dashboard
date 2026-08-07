/* === 数据面板交互 === */

function openDataPanel() {
  const panel = document.getElementById('data-panel');
  if (!panel) return;
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  // GSAP 动画
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.data-panel', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
  }
}

function closeDataPanel() {
  const panel = document.getElementById('data-panel');
  if (!panel) return;
  panel.classList.remove('open');
  document.body.style.overflow = '';
}

// ESC 关闭
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeDataPanel();
});

// 点击遮罩关闭
document.addEventListener('click', function(e) {
  if (e.target.id === 'data-panel') closeDataPanel();
});

// 渲染数据面板内容
(function initDataPanel() {
  const body = document.getElementById('data-panel-body');
  if (!body || typeof CANDIDATE_DATA === 'undefined') return;

  const D = CANDIDATE_DATA;

  // === 总览卡片 ===
  const overviewHTML = `
    <div class="overview-cards">
      <div class="ov-card"><div class="ov-value">195</div><div class="ov-label">累计推荐</div><div class="ov-sub">全岗位合计</div></div>
      <div class="ov-card"><div class="ov-value">5-6</div><div class="ov-label">日均推荐</div><div class="ov-sub">稳态期 峰值日8人</div></div>
      <div class="ov-card"><div class="ov-value">21</div><div class="ov-label">活跃管线</div><div class="ov-sub">5 Offer + 16 面试</div></div>
      <div class="ov-card"><div class="ov-value">4</div><div class="ov-label">已入职</div><div class="ov-sub">7.5周内交付</div></div>
    </div>
  `;

  // === 入职战绩 ===
  const onboardHTML = `
    <h3>🏆 已入职战绩</h3>
    <div class="onboard-cards">
      <div class="ob-card highlight">
        <div class="ob-name">阿里P6人选</div>
        <div class="ob-pos">程序方向</div>
        <div class="ob-salary">40万/年</div>
        <div class="ob-cycle">⚡ 10工作日三面入职</div>
      </div>
      <div class="ob-card">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">战斗策划</div>
        <div class="ob-salary">24万/年</div>
        <div class="ob-cycle">✅ 常规入职</div>
      </div>
      <div class="ob-card">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">资深3D角色</div>
        <div class="ob-salary">P4级别</div>
        <div class="ob-cycle">✅ 常规入职</div>
      </div>
      <div class="ob-card">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">场景原画</div>
        <div class="ob-salary">P4级别</div>
        <div class="ob-cycle">✅ 常规入职</div>
      </div>
    </div>
  `;

  // === 分阶段数据 ===
  let phaseRows = D.phaseData.map(p => `
    <tr>
      <td><strong>${p.phase}</strong></td>
      <td>${p.period}</td>
      <td><strong>${p.recommend}</strong></td>
      <td>${p.dailyAvg}/天</td>
      <td>${p.onboarded}</td>
      <td>${p.note}</td>
    </tr>
  `).join('');

  // === 周度趋势 ===
  let weeklyRows = D.weeklyActivity.map(w => `
    <tr>
      <td><strong>${w.week}</strong></td>
      <td><strong>${w.recommend}</strong></td>
      <td>${w.dailyAvg}/天</td>
      <td>${w.note}</td>
    </tr>
  `).join('');

  // === 转化漏斗 ===
  let funnelRows = D.conversionFunnel.map(f => `
    <tr>
      <td><strong>${f.stage}</strong></td>
      <td>${f.value}</td>
      <td>${f.rate}</td>
    </tr>
  `).join('');

  // === 效率对标 ===
  let benchRows = D.efficiencyBench.map(b => `
    <tr>
      <td>${b.metric}</td>
      <td><strong>${b.value}</strong></td>
      <td>${b.benchmark}</td>
      <td>${b.result}</td>
    </tr>
  `).join('');

  // === 汇总 ===
  body.innerHTML = `
    ${overviewHTML}
    ${onboardHTML}

    <h3>📈 分阶段数据</h3>
    <table class="data-table">
      <thead><tr><th>阶段</th><th>周期</th><th>推荐数</th><th>日均</th><th>已入职</th><th>说明</th></tr></thead>
      <tbody>${phaseRows}</tbody>
    </table>

    <h3>📅 周度产出趋势</h3>
    <table class="data-table">
      <thead><tr><th>周次</th><th>推荐数</th><th>日均</th><th>备注</th></tr></thead>
      <tbody>${weeklyRows}</tbody>
    </table>

    <h3>🔄 转化漏斗</h3>
    <table class="data-table">
      <thead><tr><th>阶段</th><th>人数</th><th>转化率</th></tr></thead>
      <tbody>${funnelRows}</tbody>
    </table>

    <h3>📊 效率对标</h3>
    <table class="data-table">
      <thead><tr><th>指标</th><th>实际</th><th>行业基准</th><th>判定</th></tr></thead>
      <tbody>${benchRows}</tbody>
    </table>

    <h3>⚡ 关键高光</h3>
    <ul class="highlight-list">
      <li><span class="hl-icon">⚡</span><span><strong>极速标杆</strong> — 阿里 P6（40万）10 工作日内三面入职，全链路跑通</span></li>
      <li><span class="hl-icon">💰</span><span><strong>高薪推进</strong> — 测开 78 万年包（+20%涨幅）四面→谈薪中</span></li>
      <li><span class="hl-icon">📈</span><span><strong>峰值产能</strong> — 周推荐 30 人、日推荐 8 人</span></li>
      <li><span class="hl-icon">🎨</span><span><strong>全链路覆盖</strong> — 9 个美术细分方向 + 程序/策划/测开</span></li>
      <li><span class="hl-icon">🤖</span><span><strong>AI 驱动</strong> — 全流程 AI 辅助寻访→评估→推荐→追踪</span></li>
      <li><span class="hl-icon">📐</span><span><strong>数据健康</strong> — 端到端转化 2.1%、推面比 28%，均在行业基准内</span></li>
    </ul>
  `;
})();
