/* === 数据面板交互 === */

function openDataPanel() {
  const panel = document.getElementById('data-panel');
  if (!panel) return;
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
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

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeDataPanel();
});

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
      <div class="ov-card"><div class="ov-value">225</div><div class="ov-label">累计推荐</div><div class="ov-sub">7.5周 全岗位合计</div></div>
      <div class="ov-card"><div class="ov-value">6.0</div><div class="ov-label">日均推荐</div><div class="ov-sub">程序3.7 + 美术7.7</div></div>
      <div class="ov-card"><div class="ov-value">~78</div><div class="ov-label">活跃管线</div><div class="ov-sub">测试+面试各阶段</div></div>
      <div class="ov-card"><div class="ov-value">5</div><div class="ov-label">已入职</div><div class="ov-sub">6 Offer · 1拒绝 · 5入职</div></div>
    </div>
  `;

  // === 入职战绩 ===
  const onboardHTML = `
    <h3>🏆 已入职战绩</h3>
    <div class="onboard-cards">
      <div class="ob-card highlight">
        <div class="ob-name">阿里P6人选</div>
        <div class="ob-pos">后端开发</div>
        <div class="ob-salary">40万/年</div>
        <div class="ob-cycle">⚡ 10工作日三面入职</div>
      </div>
      <div class="ob-card highlight">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">测试开发</div>
        <div class="ob-salary">78万年包</div>
        <div class="ob-cycle">⚡ 四面完成 高薪突破</div>
      </div>
      <div class="ob-card">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">战斗策划</div>
        <div class="ob-salary">24万/年</div>
        <div class="ob-cycle">✅ 策划线首单</div>
      </div>
      <div class="ob-card">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">资深3D角色</div>
        <div class="ob-salary">P4级别</div>
        <div class="ob-cycle">✅ 美术线产出</div>
      </div>
      <div class="ob-card">
        <div class="ob-name">外部人选</div>
        <div class="ob-pos">场景原画</div>
        <div class="ob-salary">P4级别</div>
        <div class="ob-cycle">✅ 美术线产出</div>
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

  // === 完整转化漏斗 ===
  let funnelRows = D.conversionFunnel.map(f => `
    <tr>
      <td><strong>${f.stage}</strong></td>
      <td>${f.programVal}</td>
      <td>${f.artVal}</td>
      <td><strong>${f.total}</strong></td>
      <td>${f.rate}</td>
    </tr>
  `).join('');

  // === 面试淘汰分布 ===
  let attritionRows = D.attrition.map(a => `
    <tr>
      <td><strong>${a.stage}</strong></td>
      <td>${a.count}</td>
      <td>${a.reason}</td>
    </tr>
  `).join('');

  // === 美术测试时间线 ===
  let timelineRows = D.artTimeline.map(t => `
    <tr>
      <td><strong>${t.batch}</strong></td>
      <td>${t.period}</td>
      <td>${t.count}</td>
      <td>${t.testDue}</td>
      <td>${t.maxStage}</td>
      <td>${t.status}</td>
    </tr>
  `).join('');

  // === 活跃管线快照 ===
  let pipelineRows = D.activePipeline.map(p => `
    <tr>
      <td><strong>${p.stage}</strong></td>
      <td>${p.count}</td>
      <td>${p.note}</td>
    </tr>
  `).join('');

  // === 汇总渲染 ===
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

    <h3>🔄 完整转化漏斗</h3>
    <table class="data-table">
      <thead><tr><th>阶段</th><th>程序策划</th><th>美术</th><th>合计</th><th>转化率</th></tr></thead>
      <tbody>${funnelRows}</tbody>
    </table>

    <h3>🎨 美术测试瓶颈时间线</h3>
    <table class="data-table">
      <thead><tr><th>批次</th><th>推荐时间</th><th>人数</th><th>测试回收</th><th>截至8.7最远</th><th>状态</th></tr></thead>
      <tbody>${timelineRows}</tbody>
    </table>

    <h3>📉 面试淘汰/流失分布</h3>
    <table class="data-table">
      <thead><tr><th>淘汰阶段</th><th>人数</th><th>主要原因</th></tr></thead>
      <tbody>${attritionRows}</tbody>
    </table>

    <h3>📋 截至8.7活跃管线快照</h3>
    <table class="data-table">
      <thead><tr><th>阶段</th><th>人数</th><th>说明</th></tr></thead>
      <tbody>${pipelineRows}</tbody>
    </table>
    <p style="text-align:center;color:#888;margin-top:8px;font-size:13px;">合计活跃 ~78人 · 大量堆积在测试环节（美术2周测试周期）</p>
  `;
})();
