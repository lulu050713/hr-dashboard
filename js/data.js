// 沈婧怡 · HR Dashboard 数据文件
// 更新时间: 2026-08-07
// 数据来源: AI工具人才筛选表 + 汇总统计

const CANDIDATE_DATA = {
  // === 招聘漏斗总览 ===
  pipeline: {
    stages: [
      { name: '电话初筛', value: 350, desc: '日均9-10人' },
      { name: '推荐业务', value: 225, desc: '日均6.0（程序3.7+美术7.7）' },
      { name: '业务通过/约面', value: 149, desc: '程序85% / 美术60%' },
      { name: '面试推进', value: 82, desc: '一面完成（美术含测试环节）' },
      { name: 'Offer/入职', value: 6, desc: '5已入职 + 1拒绝' }
    ]
  },

  // === 入职战绩 ===
  onboarding: [
    { name: '阿里P6人选', position: '后端开发', salary: '40万/年', cycle: '10工作日三面入职', highlight: '极速标杆' },
    { name: '外部人选', position: '测试开发', salary: '78万年包', cycle: '四面完成', highlight: '高薪突破' },
    { name: '外部人选', position: '战斗策划', salary: '24万/年', cycle: '常规流程', highlight: '策划线首单' },
    { name: '外部人选', position: '资深3D角色', salary: 'P4级别', cycle: '常规流程', highlight: '美术线产出' },
    { name: '外部人选', position: '场景原画', salary: 'P4级别', cycle: '常规流程', highlight: '美术线产出' },
  ],

  // === 完整转化漏斗 ===
  conversionFunnel: [
    { stage: '电话初筛', programVal: 90, artVal: 260, total: 350, rate: '—' },
    { stage: '推荐业务', programVal: 55, artVal: 170, total: 225, rate: '64%' },
    { stage: '业务通过', programVal: 47, artVal: 102, total: 149, rate: '程序85%/美术60%' },
    { stage: '测试回收(美术)', programVal: '—', artVal: 78, total: '—', rate: '完成率76%' },
    { stage: '测试通过/约一面', programVal: 47, artVal: 52, total: 99, rate: '美术通过67%' },
    { stage: '一面完成', programVal: 42, artVal: 40, total: 82, rate: '—' },
    { stage: '一面通过→二面', programVal: 25, artVal: 22, total: 47, rate: '程序60%/美术55%' },
    { stage: '二面完成', programVal: 23, artVal: 16, total: 39, rate: '—' },
    { stage: '二面通过', programVal: 14, artVal: 9, total: 23, rate: '程序61%/美术56%' },
    { stage: '三面/终面', programVal: 9, artVal: 3, total: 12, rate: '—' },
    { stage: '三面通过', programVal: 6, artVal: 3, total: 9, rate: '程序67%/美术100%' },
    { stage: 'Offer发放', programVal: 4, artVal: 2, total: 6, rate: '—' },
    { stage: 'Offer拒绝', programVal: 1, artVal: 0, total: 1, rate: '—' },
    { stage: '已入职', programVal: 3, artVal: 2, total: 5, rate: '—' },
  ],

  // === 面试淘汰/流失分布 ===
  attrition: [
    { stage: '业务不通过', count: 76, reason: '项目经历不匹配/岗位风格不符/资历不够' },
    { stage: '美术测试未完成', count: 24, reason: '2周周期内放弃或未按时提交' },
    { stage: '美术测试未通过', count: 26, reason: '测试作品质量不达标' },
    { stage: '一面淘汰', count: 35, reason: '技术深度不足/项目描述浅/沟通表达' },
    { stage: '二面淘汰', count: 16, reason: '风格匹配度不够/团队协作适配/主美不认可' },
    { stage: '三面淘汰', count: 3, reason: '薪资预期差距/管理风格' },
    { stage: '流程慢候选人流失', count: 3, reason: '二面后推进慢 候选人接受其他offer' },
    { stage: 'HC冻结流失', count: 1, reason: '三面通过 项目公测数据不好HC暂停' },
    { stage: 'Offer拒绝', count: 1, reason: '接受腾讯竞争offer' },
  ],

  // === 分阶段数据 ===
  phaseData: [
    { phase: '程序&策划期', period: '6.16-7.7 (3周)', recommend: 55, dailyAvg: '3.7', onboarded: 3, note: '程序/策划/测开，无测试环节' },
    { phase: '美术期', period: '7.7-8.7 (4.5周)', recommend: 170, dailyAvg: '7.7', onboarded: 2, note: '9个细分方向，含2周测试周期' },
  ],

  // === 美术测试瓶颈时间线 ===
  artTimeline: [
    { batch: 'W1批', period: '7.7-7.11', count: 30, testDue: '~7.23', maxStage: '三面/Offer', status: '2人入职 1人冻结流失' },
    { batch: 'W2批', period: '7.14-7.18', count: 38, testDue: '~7.30', maxStage: '一面/二面', status: '部分二面中 流程变慢' },
    { batch: 'W3批', period: '7.21-7.25', count: 35, testDue: '~8.6', maxStage: '测试刚过/开始一面', status: '刚进入面试' },
    { batch: 'W4批', period: '7.28-8.7', count: 67, testDue: '8.7之后', maxStage: '测试制作中', status: '大量堆积' },
  ],

  // === 周度产出 ===
  weeklyActivity: [
    { week: 'W1 (6.16-6.20)', recommend: 15, dailyAvg: '3.0', note: '程序策划启动，搭建渠道' },
    { week: 'W2 (6.23-6.27)', recommend: 20, dailyAvg: '4.0', note: '稳态爬坡' },
    { week: 'W3 (6.30-7.4)', recommend: 20, dailyAvg: '4.0', note: '程序稳态+策划补充' },
    { week: 'W4 (7.7-7.11)', recommend: 30, dailyAvg: '6.0', note: '美术切入，双线并行' },
    { week: 'W5 (7.14-7.18)', recommend: 38, dailyAvg: '7.6', note: '🔥 峰值周' },
    { week: 'W6 (7.21-7.25)', recommend: 35, dailyAvg: '7.0', note: '稳态高位' },
    { week: 'W7 (7.28-8.1)', recommend: 38, dailyAvg: '7.6', note: '🔥 峰值周' },
    { week: 'W8 (8.4-8.7)', recommend: 29, dailyAvg: '7.3', note: '4天，维持高位' },
  ],

  // === 活跃管线快照 ===
  activePipeline: [
    { stage: '测试制作中', count: '~50', note: 'W4批次为主 测试未到期' },
    { stage: '测试待评审', count: '~12', note: 'W3批次 刚回收' },
    { stage: '一面中/待约', count: '~10', note: 'W3测试通过+W2剩余' },
    { stage: '二面中/待约', count: '~5', note: 'W2批次' },
    { stage: '三面待反馈/冻结', count: '~1', note: 'W1批次 HC暂停' },
  ],

  // === 岗位分布 ===
  positions: [
    { name: '角色原画', value: 35 },
    { name: '3D角色', value: 30 },
    { name: '程序/测开', value: 25 },
    { name: 'UI设计', value: 25 },
    { name: '3D场景', value: 24 },
    { name: '场景原画', value: 22 },
    { name: '地编', value: 18 },
    { name: '动作', value: 16 },
    { name: '策划', value: 10 },
    { name: '特效', value: 10 },
    { name: 'TA/灯光/关卡/其他', value: 10 }
  ],

  // === GPT 人才统计 ===
  gpt: [
    { name: 'GPT人才', value: 138 },
    { name: '非GPT', value: 70 },
    { name: '待确认', value: 17 }
  ],

  // === GPT 层级分布 ===
  gptTier: [
    { name: 'T0（腾讯/米哈游/网易）', value: 10 },
    { name: 'T1（莉莉丝/叠纸/鹰角等）', value: 48 },
    { name: 'T2（巨人/西山居/心动等）', value: 80 }
  ],

  // === 日度活跃趋势 ===
  dailyActivity: {
    dates: ['6/16','6/17','6/18','6/19','6/20','6/23','6/24','6/25','6/26','6/27','6/30','7/1','7/2','7/3','7/4','7/7','7/8','7/9','7/10','7/11','7/14','7/15','7/16','7/17','7/18','7/21','7/22','7/23','7/24','7/25','7/28','7/29','7/30','7/31','8/1','8/4','8/5','8/6','8/7'],
    newCandidates: [2,3,3,4,3,4,4,4,4,4,4,4,4,4,4,5,6,7,6,6,8,8,7,8,7,7,7,7,7,7,8,8,7,8,7,7,8,7,7],
    calls: [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10,10,10,10,10,12,12,12,12,12,12,12,10,10,10,12,12,12,10,10,10,10,10,8]
  },

  // === 招聘渠道 ===
  channels: [
    { name: '脉脉', value: 100 },
    { name: 'Boss直聘', value: 70 },
    { name: '内部人才库', value: 35 },
    { name: '其他渠道', value: 20 },
  ],

  // === Word Cloud ===
  wordCloud: [
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

  // === Mock candidates for AI chat ===
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

  // === Enhanced candidates for chat ===
  enhancedCandidates: [
    { name: '李先生', position: '3D角色', company: '友塔', tier: 'T2', exp: '2.5年', salary: '25K×13薪', style: '次世代写实', ai: '积极使用', city: '深圳', status: '面试中', project: 'Chief Almighty（欧美写实SLG）', team: '角色组4人', detail: '负责次世代角色制作、CG动画宣传角色，审核外包' },
    { name: '张女士', position: '3D场景', company: '西山居', tier: 'T2', exp: '6年', salary: '33K×14薪', style: '手绘国风/PBR次世代', ai: '积极使用，偏好手绘', city: '成都', status: 'Offer阶段', project: '剑网3指尖江湖/剑网3无界', team: '场景组，带7人', detail: '负责场景模型制作、规范制定、画面统一、后期优化维护，最多同时跟4家外包' },
    { name: '王先生', position: '3D角色', company: '米哈游', tier: 'T1', exp: '4年', salary: '35K×16薪', style: '二次元风格化', ai: 'AI辅助建模', city: '上海', status: '推荐中', project: '原神/崩坏系列', team: '角色组8人', detail: '负责角色高模制作、材质调试，对接外包品质验收' },
    { name: '赵女士', position: '场景原画', company: '巨人网络', tier: 'T2', exp: '5年', salary: '23K×12.5薪', style: 'Q版/写实/国风/欧卡多风格', ai: 'SD/MJ融入工作流', city: '上海', status: 'Offer阶段', project: '风格化小游戏', team: '3-5人场景组长经验', detail: 'Q版、写实、国风、欧卡、二次元多风格覆盖，2019年完成角色原画→场景原画转型' },
    { name: '陈先生', position: '3D场景', company: '腾讯', tier: 'T0', exp: '3年', salary: '25K×14薪', style: '写实大世界', ai: 'AI生图+图生3D', city: '深圳', status: '面试中', project: '和平精英', team: '大地图场景制作', detail: '负责UGC关卡搭建、CG场景制作、模型贴图资产，对接三个外包团队' },
    { name: '刘女士', position: '角色原画', company: '莉莉丝', tier: 'T1', exp: '3年', salary: '22K×15薪', style: '欧美写实/黑暗奇幻', ai: '草图后AI渲染出图', city: '上海', status: '推荐中', project: '在研SLG项目', team: '原画组6人', detail: '负责角色设计、loading图、官网宣传图，作品以西式黑暗奇幻见长' },
    { name: '周女士', position: 'UI设计', company: '阿里', tier: 'T1', exp: '5年+', salary: '年包49W', style: 'MOBA/卡牌/H5', ai: '关注AI漫剧', city: '杭州', status: '推荐中', project: 'Catchyoo小游戏', team: '中台4年半，带2外包', detail: '纯2D，UI主设计，插画/美术/场景把握全负责' },
  ],

  recTemplate: {
    input: '3D角色，人选李先生，人在深圳，看杭州上海。在职友塔，想要寻求更好发展。虚线带2人，团队8人，主要负责次世代角色制作、CG动画宣传角色，审核外包角色及反馈。上一段在点维文化，负责王者荣耀CG、火影忍者CG完整角色，离职原因想做游戏。薪资25K×13薪。平时游戏：守望先锋、英雄联盟、大世界类也有玩。AI积极使用。',
    output: '推荐一名3D角色人选\n1、李先生，友塔在职，意向深圳/杭州/上海；看机会原因：寻求更好发展。此前点维文化因想做游戏而离职。\n2、友塔（GPT）2.5年，负责次世代角色制作、CG动画宣传角色，审核外包角色及反馈；团队8人，虚线带2人。点维文化1年，负责王者荣耀CG、火影忍者CG完整角色。风格以写实为主。AI使用：积极使用。\n3、薪资：25K×13薪。\n4、暂无其他流程；游戏体验：守望先锋、英雄联盟、大世界类也有玩。'
  },

  // === Company Tier Mapping ===
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

  // === Pipeline Detail ===
  pipelineDetails: {
    interview: [
      { id: 1, name: '张先生', position: '3D场景', stage: '测试中', stageDate: '2026-08-06', round: 0, timeline: [{ date: '8/6', action: '发送测试题', detail: '已发送测试题，预计8/8回收' }] },
      { id: 2, name: '李女士', position: '角色原画', stage: '待一面', stageDate: '2026-08-05', round: 0, timeline: [{ date: '8/5', action: '推荐业务', detail: '已推荐给业务面试官，排期中' }] },
      { id: 3, name: '王先生', position: 'UI设计', stage: '一面待评价', stageDate: '2026-08-02', round: 1, timeline: [{ date: '8/2', action: '一面完成', detail: '业务面试官面试完成' }, { date: '8/5', action: '跟进催办', detail: '已提醒面试官提交评价' }] },
      { id: 4, name: '赵女士', position: '场景原画', stage: '一面待评价', stageDate: '2026-07-31', round: 1, timeline: [{ date: '7/31', action: '一面完成', detail: '业务面试官面试完成' }, { date: '8/2', action: '第一次催办', detail: '企业微信提醒面试官' }, { date: '8/5', action: '升级提醒', detail: '抄送HRBP协助跟进' }] },
      { id: 5, name: '陈先生', position: '3D角色', stage: '二面待评价', stageDate: '2026-08-01', round: 2, timeline: [{ date: '8/1', action: '二面完成', detail: '主美面试完成' }, { date: '8/4', action: '跟进中', detail: '面试官回复"这周内给反馈"' }] },
      { id: 6, name: '刘女士', position: '地编', stage: '一面待评价', stageDate: '2026-07-30', round: 1, timeline: [{ date: '7/30', action: '一面完成', detail: '业务面试官面试完成' }, { date: '8/1', action: '第一次催办', detail: '企业微信提醒' }, { date: '8/4', action: '升级', detail: '已升级至招聘负责人' }] },
      { id: 7, name: '黄先生', position: '动作', stage: '二面进行中', stageDate: '2026-08-06', round: 2, timeline: [{ date: '8/4', action: '一面通过', detail: '业务面试官评价：技术扎实，风格匹配' }, { date: '8/6', action: '二面进行中', detail: '今下午主美面试' }] },
      { id: 8, name: '周女士', position: '特效', stage: '待二面', stageDate: '2026-08-05', round: 1, timeline: [{ date: '8/2', action: '一面通过', detail: '反馈积极，推进二面' }, { date: '8/5', action: '约二面', detail: '已与主美约时间，待确认' }] },
      { id: 9, name: '吴先生', position: '技术美术', stage: '三面待评价', stageDate: '2026-07-28', round: 3, timeline: [{ date: '7/28', action: '三面完成', detail: '总监面试完成' }, { date: '8/1', action: '跟进中', detail: '已确认本周三前给回复' }] },
      { id: 10, name: '郑女士', position: '3D模型', stage: '待二面', stageDate: '2026-08-04', round: 1, timeline: [{ date: '8/4', action: '一面通过', detail: '评价良好，风格匹配度待二面确认' }, { date: '8/6', action: '约二面', detail: '已约8/8二面' }] },
      { id: 11, name: '孙先生', position: '关卡美术', stage: '二面待评价', stageDate: '2026-08-01', round: 2, timeline: [{ date: '8/1', action: '二面完成', detail: '主美面试完成' }] },
      { id: 12, name: '马女士', position: '资深GUI', stage: '待一面', stageDate: '2026-08-06', round: 0, timeline: [{ date: '8/6', action: '推荐业务', detail: '已推荐，待业务反馈' }] },
      { id: 13, name: '钱先生', position: '3D场景', stage: '二面待评价', stageDate: '2026-07-29', round: 2, timeline: [{ date: '7/29', action: '二面完成', detail: '主美面试完成' }, { date: '8/1', action: '再次跟进', detail: '已催办，等待反馈' }] },
      { id: 14, name: '何女士', position: '特效', stage: '一面待评价', stageDate: '2026-08-01', round: 1, timeline: [{ date: '8/1', action: '一面完成', detail: '业务面试官面试完成' }] },
      { id: 15, name: '吕先生', position: '动作', stage: '待二面', stageDate: '2026-08-04', round: 1, timeline: [{ date: '8/4', action: '一面通过', detail: '评价良好' }] },
      { id: 16, name: '许女士', position: '灯光', stage: '一面待评价', stageDate: '2026-07-31', round: 1, timeline: [{ date: '7/31', action: '一面完成', detail: '业务面试官面试完成' }, { date: '8/3', action: '催办', detail: '企业微信提醒' }] }
    ],
    offer: [
      { id: 101, name: '杨先生', direction: '策划', position: '战斗策划', stage: '已入职', stageDate: '2026-07-20', round: 0, timeline: [{ date: '7/15', action: 'Offer发放', detail: '常规流程' }, { date: '7/20', action: '入职', detail: '策划线首单' }] },
      { id: 102, name: '王先生', direction: '程序', position: '后端开发(阿里P6)', stage: '已入职', stageDate: '2026-07-02', round: 0, timeline: [{ date: '6/20', action: '推荐', detail: '阿里P6背景' }, { date: '7/2', action: '入职', detail: '10工作日极速三面入职' }] },
      { id: 103, name: '梁先生', direction: '程序', position: '测试开发', stage: '已入职', stageDate: '2026-07-28', round: 0, timeline: [{ date: '7/10', action: 'Offer发放', detail: '78万年包 四面完成' }, { date: '7/28', action: '入职', detail: '高薪突破' }] },
      { id: 104, name: '李女士', direction: '美术', position: '场景原画', stage: '已入职', stageDate: '2026-08-04', round: 0, timeline: [{ date: '7/30', action: 'Offer发放', detail: 'P4级别' }, { date: '8/4', action: '入职', detail: '美术线产出' }] },
      { id: 105, name: '唐先生', direction: '美术', position: '资深3D角色', stage: '已入职', stageDate: '2026-08-01', round: 0, timeline: [{ date: '7/25', action: 'Offer发放', detail: 'P4级别' }, { date: '8/1', action: '入职', detail: '美术线产出' }] },
      { id: 106, name: '陈先生', direction: '程序', position: '后端开发', stage: 'Offer拒绝', stageDate: '2026-07-08', round: 0, timeline: [{ date: '7/5', action: 'Offer发放', detail: '常规流程' }, { date: '7/8', action: '拒绝', detail: '接受腾讯竞争offer' }] },
    ]
  }
};
