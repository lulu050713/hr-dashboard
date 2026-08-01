// Dashboard Charts & AI Chat

// Color palette
const COLORS = {
  blue: '#3b82f6',
  indigo: '#6366f1',
  purple: '#8b5cf6',
  pink: '#ec4899',
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  green: '#10b981',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  slate: '#64748b',
};

const GRADIENT = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];
const GRADIENT_FULL = ['#3b82f6','#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899','#f43f5e','#f97316','#f59e0b','#10b981','#14b8a6','#06b6d4','#64748b','#475569'];

// ==========================================
// 1. Position Word Cloud (Hero Section)
// ==========================================
function initWordCloud() {
  const dom = document.getElementById('wordcloud-chart');
  if (!dom) return;
  const chart = echarts.init(dom);

  const option = {
    tooltip: { show: true, formatter: '{b}: {c}人' },
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '90%',
      height: '90%',
      sizeRange: [14, 48],
      rotationRange: [-30, 30],
      rotationStep: 15,
      gridSize: 8,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        fontWeight: 'bold',
        color: function () {
          const colors = [
            '#3b82f6','#6366f1','#8b5cf6','#a855f7','#ec4899',
            '#f43f5e','#f97316','#f59e0b','#10b981','#14b8a6',
            '#06b6d4','#0ea5e9','#64748b','#475569'
          ];
          return colors[Math.floor(Math.random() * colors.length)];
        }
      },
      emphasis: {
        textStyle: { fontSize: 52, fontWeight: 'bold' }
      },
      data: CANDIDATE_DATA.wordCloud
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// ==========================================
// 2. Pipeline Funnel Chart
// ==========================================
function initFunnelChart() {
  const dom = document.getElementById('funnel-chart');
  if (!dom) return;
  const chart = echarts.init(dom);
  const { stages } = CANDIDATE_DATA.pipeline;

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人<br/>{@[2]}'
    },
    series: [{
      type: 'funnel',
      left: '15%', right: '15%', top: 30, bottom: 30,
      minSize: '18%', maxSize: '100%',
      gap: 4,
      label: {
        show: true, position: 'inside', fontSize: 13,
        formatter: '{b}\n{c}人',
        color: '#fff', fontWeight: 600
      },
      labelLine: { show: false },
      itemStyle: { border: 'none' },
      emphasis: { label: { fontSize: 16 } },
      data: stages.map((s, i) => ({
        name: s.name,
        value: s.value,
        desc: s.desc,
        itemStyle: { color: GRADIENT[i] }
      }))
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// ==========================================
// 3. Position Distribution Pie Chart
// ==========================================
function initPositionChart() {
  const dom = document.getElementById('position-chart');
  if (!dom) return;
  const chart = echarts.init(dom);

  const option = {
    title: { text: '岗位分布', left: 'center', top: 8, textStyle: { fontSize: 14, fontWeight: 600 } },
    tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
    legend: { bottom: 5, textStyle: { fontSize: 10 }, type: 'scroll' },
    series: [{
      type: 'pie', radius: ['38%', '68%'], center: ['50%', '50%'],
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
      data: CANDIDATE_DATA.positions
        .filter(p => p.value > 1)
        .map((p, i) => ({ ...p, itemStyle: { color: GRADIENT_FULL[i % GRADIENT_FULL.length] } }))
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// ==========================================
// 4. GPT Ratio Chart
// ==========================================
function initGPTChart() {
  const dom = document.getElementById('gpt-chart');
  if (!dom) return;
  const chart = echarts.init(dom);

  const option = {
    title: { text: 'GPT人才筛选', left: 'center', top: 8, textStyle: { fontSize: 14, fontWeight: 600 } },
    tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
    series: [{
      type: 'pie', radius: ['45%', '75%'], center: ['50%', '55%'],
      roseType: 'area',
      itemStyle: { borderRadius: 6 },
      label: { fontSize: 11, formatter: '{b}\n{c}人 ({d}%)' },
      data: [
        { value: 78, name: 'GPT人才', itemStyle: { color: '#10b981' } },
        { value: 42, name: '非GPT', itemStyle: { color: '#94a3b8' } },
        { value: 8, name: '待确认', itemStyle: { color: '#f59e0b' } }
      ]
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// ==========================================
// 5. Daily Activity Trend
// ==========================================
function initTrendChart() {
  const dom = document.getElementById('trend-chart');
  if (!dom) return;
  const chart = echarts.init(dom);
  const { dates, newCandidates, calls } = CANDIDATE_DATA.dailyActivity;

  const option = {
    title: { text: '每日招聘活跃度', left: 'center', top: 8, textStyle: { fontSize: 14, fontWeight: 600 } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['新增人选', '电话沟通'], bottom: 5 },
    grid: { left: 50, right: 50, top: 50, bottom: 40 },
    xAxis: { type: 'category', data: dates, axisLabel: { rotate: 30, fontSize: 10 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
    series: [
      {
        name: '新增人选', type: 'bar', data: newCandidates,
        itemStyle: { color: '#6366f1', borderRadius: [4,4,0,0] }, barWidth: 12
      },
      {
        name: '电话沟通', type: 'line', data: calls,
        smooth: true, lineStyle: { color: '#f59e0b', width: 2 },
        symbol: 'circle', symbolSize: 4, itemStyle: { color: '#f59e0b' }
      }
    ]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// ==========================================
// 6. Smart AI Chat
// ==========================================
// ==========================================
// Initialize All
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initWordCloud();
  initFunnelChart();
  initPositionChart();
  initGPTChart();
  initTrendChart();
});
