// Cloudflare Worker — HR AI Assistant backend (DeepSeek API)
// Deploy: wrangler deploy
// Environment variable needed: DEEPSEEK_API_KEY

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const ALLOWED_ORIGINS = [
  'https://lulu050713.github.io',
  'http://localhost:8080',
  'http://127.0.0.1:8080'
];

const SYSTEM_PROMPT = `你是网易游戏HR招聘助手，专注于游戏行业人才招聘。你的能力：

1. **公司梯队判定**：根据以下分级标准判断公司梯队
   - T0（第一梯队）：腾讯、网易、米哈游
   - T1（第二梯队）：莉莉丝、叠纸、鹰角、字节（朝夕光年）、沐瞳、阿里（灵犀互娱）、库洛、点点互动、Funplus
   - T2（第三梯队）：巨人、西山居、心动、完美世界、Garena、无端、深蓝互动、快手、乐元素、雷霆、IGG、蛮啾、散爆、祖龙、多益、盛趣、欢乐互娱、永航、友塔、元趣、智明星通、英雄互娱、游族、三七互娱、江娱互动、游卡、Bilibili、4399、途游、拳头、EA、育碧
   判定依据：团队规模、产品营收、行业口碑、技术实力综合判断。

2. **推荐语生成**：按以下模板生成标准化推荐语
   模板：
   推荐一名[岗位]人选
   1、[姓名]，[公司]在职/离职，意向[城市]；看机会原因：[原因]。
   2、[公司]（GPT/非GPT）[年限]，负责[核心职责]；团队[规模]。[上一段经历]。风格：[风格描述]。AI使用：[使用情况]。
   3、薪资：[金额]×[薪数]。
   4、[其他流程]；游戏体验：[游戏列表]。

3. **招聘问答**：回答游戏行业招聘相关问题，包括岗位画像、薪资水平、市场行情等。

回答要简洁专业，使用中文。如果用户只输入一个公司名，直接给出梯队判定和简要分析。`;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return Response.json({ success: false, reply: 'Method not allowed' }, { status: 405, headers: corsHeaders });
    }

    try {
      const { query, history } = await request.json();
      if (!query || typeof query !== 'string') {
        return Response.json({ success: false, reply: '请提供查询内容' }, { status: 400, headers: corsHeaders });
      }

      const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
      if (Array.isArray(history)) {
        history.slice(-6).forEach(msg => {
          if (msg.role === 'user' || msg.role === 'assistant') {
            messages.push({ role: msg.role, content: String(msg.content).slice(0, 2000) });
          }
        });
      }
      messages.push({ role: 'user', content: query.slice(0, 2000) });

      const apiRes = await fetch(DEEPSEEK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!apiRes.ok) {
        const errText = await apiRes.text();
        return Response.json({ success: false, reply: 'AI 服务暂时不可用' }, { status: 502, headers: corsHeaders });
      }

      const data = await apiRes.json();
      const reply = data.choices?.[0]?.message?.content || '无法生成回复';

      return Response.json({ success: true, reply }, { headers: corsHeaders });
    } catch (err) {
      return Response.json({ success: false, reply: '服务器错误: ' + err.message }, { status: 500, headers: corsHeaders });
    }
  }
};
