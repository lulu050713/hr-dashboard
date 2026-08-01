// Mock data derived from AI工具人才筛选表 + 汇总数据
// All candidate names and personal info have been anonymized

const CANDIDATE_DATA = {
  // Pipeline funnel aggregate data
  pipeline: {
    stages: [
      { name: '电话初筛', value: 250, desc: '日均10人' },
      { name: '推荐业务', value: 135, desc: '日均5-6人' },
      { name: '业务通过', value: 88, desc: '程序策划75-80% / 美术测试50-55%' },
      { name: '面试推进', value: 16, desc: '管道中活跃' },
      { name: 'Offer阶段', value: 5, desc: '策划1 · 程序2 · 美术2' }
    ]
  },

  // Position distribution from table
  positions: [
    { name: '角色原画', value: 23 },
    { name: 'UI设计', value: 16 },
    { name: '3D角色', value: 15 },
    { name: '3D场景', value: 13 },
    { name: '场景原画', value: 12 },
    { name: '地编', value: 10 },
    { name: '动作', value: 8 },
    { name: '特效', value: 5 },
    { name: '技术美术', value: 4 },
    { name: '3D模型', value: 3 },
    { name: '绑定', value: 2 },
    { name: '灯光', value: 2 },
    { name: '场景概念', value: 3 },
    { name: '其他', value: 12 }
  ],

  // GPT ratio
  gpt: [
    { name: 'GPT人才', value: 78 },
    { name: '非GPT', value: 42 },
    { name: '待确认', value: 8 }
  ],

  // GPT tier distribution
  gptTier: [
    { name: 'T0', value: 5 },
    { name: 'T1', value: 28 },
    { name: 'T2', value: 45 }
  ],

  // Daily activity trend
  dailyActivity: {
    dates: ['7/8', '7/9', '7/10', '7/13', '7/14', '7/15', '7/16', '7/17', '7/18', '7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27', '7/28'],
    newCandidates: [12, 15, 3, 9, 5, 7, 8, 6, 10, 4, 7, 5, 8, 6, 9, 7, 2],
    calls: [10, 10, 10, 12, 8, 10, 10, 8, 12, 10, 10, 10, 8, 12, 10, 10, 8]
  },

  // Mock candidates for AI chat demo (anonymized)
  candidates: [
    { id: 1, position: '3D场景', name: '候选人A', company: '西山居', tier: 'T2', gpt: true, exp: '6年', style: '手绘国风/PBR次世代', salary: '33K×14薪', ai: '积极使用，偏好手绘风格化', status: '推荐中' },
    { id: 2, position: '场景原画', name: '候选人B', company: '巨人网络', tier: 'T2', gpt: true, exp: '5年', style: 'Q版/写实/国风/欧卡/二次元多风格', salary: '23K×12.5薪', ai: 'SD/MJ融入工作流', status: 'Offer阶段' },
    { id: 3, position: '3D角色', name: '候选人C', company: '友塔', tier: 'T2', gpt: true, exp: '2.5年', style: '次世代写实', salary: '25K×13薪', ai: '积极使用', status: '面试中' },
    { id: 4, position: '地编', name: '候选人D', company: '4399', tier: 'T2', gpt: true, exp: '多年', style: '风格化/欧卡/写实', salary: '31K×13薪', ai: '积极使用，辅助三视图/模型资源', status: '推荐中' },
    { id: 5, position: '角色原画', name: '候选人E', company: '友塔', tier: 'T2', gpt: true, exp: '2.5年', style: '欧美写实/黑暗奇幻怪物', salary: '17K×14薪', ai: '草图后AI渲染出图', status: '推荐中' },
    { id: 6, position: 'UI设计', name: '候选人F', company: '阿里', tier: 'T1', gpt: true, exp: '5年+', style: 'MOBA/卡牌/H5', salary: 'P6, 年包49W', ai: '关注AI漫剧', status: '推荐中' },
    { id: 7, position: '3D硬表面/枪械', name: '候选人G', company: '无端科技', tier: 'T2', gpt: true, exp: '多年', style: '写实FPS', salary: '13K×13薪', ai: '前期原画生图/中模制作/贴图调整', status: 'Offer阶段' },
    { id: 8, position: '3D场景', name: '候选人H', company: '腾讯', tier: 'T0', gpt: true, exp: '3年', style: '写实大世界', salary: '25K×14薪', ai: 'AI生图+图生3D', status: '面试中' },
  ],

  // Word cloud - combined positions across all experience
  wordCloud: [
    // 核心HR技能
    { name: '招聘全流程', value: 20 },
    { name: '候选人沟通', value: 18 },
    { name: '流程优化', value: 16 },
    { name: '数据驱动', value: 15 },
    { name: 'AI + HR', value: 14 },
    { name: '校园招聘', value: 13 },
    { name: '面试评估', value: 12 },
    { name: '入职管理', value: 11 },
    { name: '跨部门协调', value: 10 },
    { name: 'SOP搭建', value: 9 },
    { name: 'offer发放', value: 8 },
    { name: '合同管理', value: 8 },
    { name: '多任务处理', value: 7 },
    // 辅助技能
    { name: '新媒体运营', value: 6 },
    { name: '活动统筹', value: 6 },
    { name: '视频剪辑', value: 5 },
    { name: '社群运营', value: 5 },
    { name: '宣讲策划', value: 4 },
    { name: 'Excel', value: 4 },
    { name: '数据分析', value: 4 },
    { name: '档案管理', value: 3 },
    { name: 'Canva设计', value: 3 },
    { name: 'PS/PR', value: 3 },
    { name: '直播统筹', value: 2 },
  ],

  // Sourcing channels
  channels: [
    { name: '脉脉', value: 45 },
    { name: 'Boss直聘', value: 35 },
    { name: '内部人才库', value: 20 }
  ],

  // ===== Company Tier Mapping =====
  companyTiers: {
    '腾讯': { tier: 'T0', desc: '第一梯队 · 游戏行业顶级厂商' },
    '米哈游': { tier: 'T1', desc: '第二梯队 · 二次元赛道领军者' },
    '网易': { tier: 'T0', desc: '第一梯队 · 自研能力头部厂商' },
    '莉莉丝': { tier: 'T1', desc: '第二梯队 · 卡牌/SLG强厂' },
    '叠纸': { tier: 'T1', desc: '第二梯队 · 女性向赛道标杆' },
    '鹰角': { tier: 'T1', desc: '第二梯队 · 明日方舟开发商' },
    '字节': { tier: 'T1', desc: '第二梯队 · 朝夕光年游戏业务' },
    '沐瞳': { tier: 'T1', desc: '第二梯队 · MOBA出海强厂' },
    '阿里': { tier: 'T1', desc: '第二梯队 · 灵犀互娱/阿里互娱' },
    '库洛': { tier: 'T1', desc: '第二梯队 · 鸣潮/战双开发商' },
    '点点互动': { tier: 'T1', desc: '第二梯队 · 海外休闲游戏强厂' },
    'Funplus': { tier: 'T1', desc: '第二梯队 · SLG出海大厂' },
    'FunPlus': { tier: 'T1', desc: '第二梯队 · SLG出海大厂' },
    '巨人': { tier: 'T2', desc: '第三梯队 · 征途系列老牌厂商' },
    '西山居': { tier: 'T2', desc: '第三梯队 · 剑网3/尘白禁区' },
    '心动': { tier: 'T2', desc: '第三梯队 · TapTap生态' },
    '完美': { tier: 'T2', desc: '第三梯队 · 完美世界游戏' },
    'Garena': { tier: 'T2', desc: '第三梯队 · Free Fire开发商' },
    '无端': { tier: 'T2', desc: '第三梯队 · 生死狙击2' },
    '深蓝互动': { tier: 'T2', desc: '第三梯队 · 女性向/二次元' },
    '友塔': { tier: 'T2', desc: '第三梯队 · SLG出海' },
    '祖龙': { tier: 'T2', desc: '第三梯队 · UE4手游先驱' },
    '4399': { tier: 'T2', desc: '第三梯队 · 小游戏/页游大厂' },
    '三七互娱': { tier: 'T2', desc: '第三梯队 · 买量发行大厂' },
    'IGG': { tier: 'T2', desc: '第三梯队 · SLG老牌出海厂' },
    '乐元素': { tier: 'T2', desc: '第三梯队 · 消除类强厂' },
    '多益网络': { tier: 'T2', desc: '第三梯队 · 神武系列' },
    'Bilibili': { tier: 'T2', desc: '第三梯队 · 二次元发行/自研' },
    '游族': { tier: 'T2', desc: '第三梯队 · 少年系列' },
    'EA': { tier: 'T2', desc: '第三梯队 · 国际大厂' },
    '育碧': { tier: 'T2', desc: '第三梯队 · 国际大厂' },
    '拳头': { tier: 'T2', desc: '第三梯队 · 英雄联盟开发商' },
  },

  // Enhanced candidates for chat (anonymized with real-style data)
  enhancedCandidates: [
    { name: '李先生', position: '3D角色', company: '友塔', tier: 'T2', exp: '2.5年', salary: '25K×13薪', style: '次世代写实', ai: '积极使用', city: '深圳', status: '面试中', project: 'Chief Almighty（欧美写实SLG）', team: '角色组4人', detail: '负责次世代角色制作、CG动画宣传角色，审核外包' },
    { name: '张女士', position: '3D场景', company: '西山居', tier: 'T2', exp: '6年', salary: '33K×14薪', style: '手绘国风/PBR次世代', ai: '积极使用，偏好手绘', city: '成都', status: 'Offer阶段', project: '剑网3指尖江湖/剑网3无界', team: '场景组，带7人', detail: '负责场景模型制作、规范制定、画面统一、后期优化维护，最多同时跟4家外包' },
    { name: '王先生', position: '3D角色', company: '米哈游', tier: 'T1', exp: '4年', salary: '35K×16薪', style: '二次元风格化', ai: 'AI辅助建模', city: '上海', status: '推荐中', project: '原神/崩坏系列', team: '角色组8人', detail: '负责角色高模制作、材质调试，对接外包品质验收' },
    { name: '赵女士', position: '场景原画', company: '巨人网络', tier: 'T2', exp: '5年', salary: '23K×12.5薪', style: 'Q版/写实/国风/欧卡多风格', ai: 'SD/MJ融入工作流', city: '上海', status: 'Offer阶段', project: '风格化小游戏', team: '3-5人场景组长经验', detail: 'Q版、写实、国风、欧卡、二次元多风格覆盖，2019年完成角色原画→场景原画转型' },
    { name: '陈先生', position: '3D场景', company: '腾讯', tier: 'T0', exp: '3年', salary: '25K×14薪', style: '写实大世界', ai: 'AI生图+图生3D', city: '深圳', status: '面试中', project: '和平精英', team: '大地图场景制作', detail: '负责UGC关卡搭建、CG场景制作、模型贴图资产，对接三个外包团队' },
    { name: '刘女士', position: '角色原画', company: '莉莉丝', tier: 'T1', exp: '3年', salary: '22K×15薪', style: '欧美写实/黑暗奇幻', ai: '草图后AI渲染出图', city: '上海', status: '推荐中', project: '在研SLG项目', team: '原画组6人', detail: '负责角色设计、loading图、官网宣传图，作品以西式黑暗奇幻见长' },
    { name: '周女士', position: 'UI设计', company: '阿里', tier: 'T1', exp: '5年+', salary: '年包49W', style: 'MOBA/卡牌/H5', ai: '关注AI漫剧', city: '杭州', status: '推荐中', project: 'Catchyoo小游戏', team: '中台4年半，带2外包', detail: '纯2D，UI主设计，插画/美术/场景把握全负责' },
  ],

  // Recommendation template example
  recTemplate: {
    input: '3D角色，人选李先生，人在深圳，看杭州上海。在职友塔，想要寻求更好发展。虚线带2人，团队8人，主要负责次世代角色制作、CG动画宣传角色，审核外包角色及反馈。上一段在点维文化，负责王者荣耀CG、火影忍者CG完整角色，离职原因想做游戏。薪资25K×13薪。平时游戏：守望先锋、英雄联盟、大世界类也有玩。AI积极使用。',
    output: '推荐一名3D角色人选\n1、李先生，友塔在职，意向深圳/杭州/上海；看机会原因：寻求更好发展。此前点维文化因想做游戏而离职。\n2、友塔（GPT）2.5年，负责次世代角色制作、CG动画宣传角色，审核外包角色及反馈；团队8人，虚线带2人。点维文化1年，负责王者荣耀CG、火影忍者CG完整角色。风格以写实为主。AI使用：积极使用。\n3、薪资：25K×13薪。\n4、暂无其他流程；游戏体验：守望先锋、英雄联盟、大世界类也有玩。'
  },

  // ===== Pipeline Detail: 面试管道 + Offer 追踪 =====
  // today = 2026-07-28 (周二)
  pipelineDetails: {
    interview: [
      { id: 1, name: '张先生', position: '3D场景', stage: '测试中', stageDate: '2026-07-28', round: 0, timeline: [{ date: '7/28', action: '发送测试题', detail: '已发送测试题，预计7/30回收' }] },
      { id: 2, name: '李女士', position: '角色原画', stage: '待一面', stageDate: '2026-07-28', round: 0, timeline: [{ date: '7/28', action: '推荐业务', detail: '已推荐给业务面试官，排期中' }] },
      { id: 3, name: '王先生', position: 'UI设计', stage: '一面待评价', stageDate: '2026-07-25', round: 1, timeline: [{ date: '7/25', action: '一面完成', detail: '业务面试官面试完成' }, { date: '7/28', action: '跟进催办', detail: '已提醒面试官提交评价' }] },
      { id: 4, name: '赵女士', position: '场景原画', stage: '一面待评价', stageDate: '2026-07-23', round: 1, timeline: [{ date: '7/23', action: '一面完成', detail: '业务面试官面试完成' }, { date: '7/25', action: '第一次催办', detail: '企业微信提醒面试官' }, { date: '7/28', action: '升级提醒', detail: '抄送HRBP协助跟进' }] },
      { id: 5, name: '陈先生', position: '3D角色', stage: '二面待评价', stageDate: '2026-07-22', round: 2, timeline: [{ date: '7/22', action: '二面完成', detail: '主美面试完成' }, { date: '7/24', action: '第一次催办', detail: '企业微信提醒' }, { date: '7/27', action: '第二次催办', detail: '面试官回复"这周内给反馈"' }] },
      { id: 6, name: '刘女士', position: '地编', stage: '一面待评价', stageDate: '2026-07-21', round: 1, timeline: [{ date: '7/21', action: '一面完成', detail: '业务面试官面试完成' }, { date: '7/23', action: '第一次催办', detail: '企业微信提醒' }, { date: '7/25', action: '第二次催办', detail: '无回复' }, { date: '7/28', action: '升级', detail: '已升级至招聘负责人' }] },
      { id: 7, name: '黄先生', position: '动作', stage: '二面进行中', stageDate: '2026-07-28', round: 2, timeline: [{ date: '7/25', action: '一面通过', detail: '业务面试官评价：技术扎实，风格匹配' }, { date: '7/28', action: '二面进行中', detail: '今下午主美面试' }] },
      { id: 8, name: '周女士', position: '特效', stage: '待二面', stageDate: '2026-07-27', round: 1, timeline: [{ date: '7/25', action: '一面通过', detail: '反馈积极，推进二面' }, { date: '7/27', action: '约二面', detail: '已与主美约时间，待确认' }] },
      { id: 9, name: '吴先生', position: '技术美术', stage: '三面待评价', stageDate: '2026-07-20', round: 3, timeline: [{ date: '7/20', action: '三面完成', detail: '总监面试完成' }, { date: '7/24', action: '第一次催办', detail: '总监出差，预计本周内反馈' }, { date: '7/28', action: '跟进中', detail: '已确认本周三前给回复' }] },
      { id: 10, name: '郑女士', position: '3D模型', stage: '待二面', stageDate: '2026-07-25', round: 1, timeline: [{ date: '7/25', action: '一面通过', detail: '评价良好，风格匹配度待二面确认' }, { date: '7/27', action: '约二面', detail: '已约7/30二面' }] },
      { id: 11, name: '孙先生', position: '关卡美术', stage: '二面待评价', stageDate: '2026-07-24', round: 2, timeline: [{ date: '7/24', action: '二面完成', detail: '主美面试完成' }] },
      { id: 12, name: '马女士', position: '资深GUI', stage: '待一面', stageDate: '2026-07-28', round: 0, timeline: [{ date: '7/28', action: '推荐业务', detail: '已推荐，待业务反馈' }] },
      { id: 13, name: '钱先生', position: '3D场景', stage: '二面待评价', stageDate: '2026-07-21', round: 2, timeline: [{ date: '7/21', action: '二面完成', detail: '主美面试完成' }, { date: '7/24', action: '第一次催办', detail: '面试官请假至7/25' }, { date: '7/28', action: '再次跟进', detail: '已催办，等待反馈' }] },
      { id: 14, name: '何女士', position: '特效', stage: '一面待评价', stageDate: '2026-07-24', round: 1, timeline: [{ date: '7/24', action: '一面完成', detail: '业务面试官面试完成' }] },
      { id: 15, name: '吕先生', position: '动作', stage: '待二面', stageDate: '2026-07-27', round: 1, timeline: [{ date: '7/27', action: '一面通过', detail: '评价良好' }, { date: '7/28', action: '约二面', detail: '协调主美时间中' }] },
      { id: 16, name: '许女士', position: '灯光', stage: '一面待评价', stageDate: '2026-07-23', round: 1, timeline: [{ date: '7/23', action: '一面完成', detail: '业务面试官面试完成' }, { date: '7/25', action: '催办', detail: '企业微信提醒' }] }
    ],
    offer: [
      { id: 101, name: '杨先生', direction: '策划', position: '战斗策划', stage: '审批中', stageDate: '2026-07-24', round: 0, timeline: [{ date: '7/24', action: '发起Offer审批', detail: '部门leader已批，等HRBP审批' }] },
      { id: 102, name: '王先生', direction: '程序', position: '测试', stage: '审批中', stageDate: '2026-07-18', round: 0, timeline: [{ date: '7/18', action: '发起Offer审批', detail: '薪资超预算需特批' }, { date: '7/22', action: '升级处理', detail: '已提交特批申请至HRD' }, { date: '7/25', action: '跟进', detail: 'HRD已阅，待最终批复' }] },
      { id: 103, name: '梁先生', direction: '程序', position: '测开', stage: '待入职', stageDate: '2026-08-05', round: 0, timeline: [{ date: '7/22', action: 'Offer确认', detail: '人选已接受Offer' }, { date: '7/25', action: '入职准备', detail: '已收集入职材料，背调进行中' }] },
      { id: 104, name: '李女士', direction: '美术', position: '场景原画', stage: 'Offer已发', stageDate: '2026-07-27', round: 0, timeline: [{ date: '7/27', action: 'Offer发放', detail: '已发送正式Offer' }, { date: '7/28', action: '跟进', detail: '人选在对比另一家Offer，需持续跟进' }] },
      { id: 105, name: '唐先生', direction: '美术', position: '3D角色', stage: '审批中', stageDate: '2026-07-25', round: 0, timeline: [{ date: '7/25', action: '发起Offer审批', detail: '正常流程中' }] }
    ]
  }
};
