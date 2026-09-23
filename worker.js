// Cloudflare Worker - HR Dashboard Query Handler
// 当前版本：结构化响应。后续升级可接入 Workers AI

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Use POST', { status: 405 });
  }

  try {
    const { query } = await request.json();
    const reply = getResponse(query);

    return new Response(JSON.stringify({ success: true, reply }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, reply: '查询失败' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

function getResponse(query) {
  const q = query.trim();

  if (q.includes('程序')) {
    return `💻 <b>程序类候选人</b>\n\n涵盖岗位：\n• 测试工程师\n• 测试开发\n• 游戏客户端开发\n• 服务端开发\n\n当前来源：Boss直聘、脉脉、内部人才库，多渠道持续寻访中。\n\n💡 完整候选人明细见 <a href="#mapping">人才地图</a>。`;
  }

  if (q.includes('美术')) {
    return `🎨 <b>美术类候选人</b>\n\n涵盖岗位：\n• 3D角色 · 3D场景 · 3D模型\n• 场景原画 · 角色原画 · UI设计\n• 特效 · 动作 · 地编 · 技术美术\n\n追踪表中 130+ 位美术候选人，覆盖 T0-T2 梯队企业。\n\n💡 完整候选人明细见 <a href="#mapping">人才地图</a>。`;
  }

  if (q.includes('策划')) {
    return `🎮 <b>策划类候选人</b>\n\n涵盖岗位：\n• 战斗策划 · 系统策划\n• 关卡策划 · 数值策划\n\n当前来自脉脉、Boss直聘、内部推荐等渠道。\n\n💡 完整候选人明细见 <a href="#mapping">人才地图</a>。`;
  }

  if (q.includes('岗位汇总') || q.includes('汇总')) {
    return `📊 <b>岗位全景分布</b>\n\n🏢 GPT 公司分级：T0（腾讯·米哈游·网易）→ T1（莉莉丝·叠纸·鹰角等）→ T2（30+ 厂商）\n\n👥 候选人总量：130+ 人\n• 美术类：~110 人（角色原画 23、UI设计 16、3D角色 15…）\n• 程序类：测试、测开\n• 策划类：战斗策划等\n\n📋 数据来源：AI工具人才筛选表（POPO在线表格，实时更新）。\n\n💡 点击上方对应卡片查看分类详情。`;
  }

  if (q.includes('推荐语') || q.includes('推荐')) {
    return `📝 <b>推荐语标准模板</b>\n\n推荐一名[岗位]人选\n1、[姓名]，[公司]在职/离职，Last day [日期]。意向城市：[城市]。离职原因：[原因]。\n2、[核心经历：含团队架构、是否带人、具体工作内容、引擎/工具链]。AI 使用：[情况]。\n3、薪资：[金额]×[薪数]。\n4、[其他流程]；游戏体验：[游戏列表]。\n\n💡 输入人选具体信息，我将按此模板生成标准化推荐语。\n\n⚠️ 此模板源自沈婧怡在网易游戏的实战经验，已用于多位候选人推荐并被业务团队采纳。`;
  }

  return `🔍 搜索「${q}」\n\n可尝试以下查询：\n• 输入「程序」/「美术」/「策划」查岗位分布\n• 输入「岗位汇总」看全景\n• 输入「推荐语」获取模板\n\n💡 后续升级：接入 AI 大模型后，可输入公司名查梯队、输入具体信息自动生成推荐语。`;
}
