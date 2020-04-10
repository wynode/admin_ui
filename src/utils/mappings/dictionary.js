// 能力评估模型
export const directionType = new Map([
  [1, '细致度'],
  [2, '敏锐度'],
  [4, '专业度'],
])

// 题目类型
export const questionType = new Map([
  ['select', '选择题'],
  ['judge', '判断题'],
])

// 题目状态
export const questionStatusType = new Map([
  ['disabled', '禁用'],
  ['normal', '启用'],
  ['preaudit', '待审核'],
  ['unpermit', '未通过'],
])

// 冲关结果
export const checkPointResult = new Map([
  ['success', '成功'],
  ['failed', '失败'],
  ['examing', '考试中'],
  ['stopped', '中断'],
])

// 答题结果
export const examResult = new Map([
  ['undo', '未填写'],
  ['correct', '正确'],
  ['wrong', '错误'],
  ['timeout', '回答超时'],
])

// 通关评价
export const examRank = new Map([
  [3, '三星'],
  [2, '二星'],
  [1, '一星'],
])

// 关卡分类
export const checkPointCategory = new Map([
  ['law', '法规'],
  // ['challenge', '挑战'],
  ['political', '鉴政师'],
  ['porn', '鉴黄师'],
  ['terror', '鉴恐师'],
  ['vulgar', '鉴俗师'],
  ['fraud', '鉴诈师'],
  ['label', '鉴图师'],
  ['label_text', '鉴文师'],
])

// 关卡状态
export const checkPointStatus = new Map([
  ['disabled', '禁用'],
  ['normal', '启用'],
  ['unstart', '待开始'],
  ['ended', '已结束'],
  ['deleted', '已删除'],
])

// 用户状态
export const userStatus = new Map([
  ['active', '正常'],
  ['non-active', '冻结'],
])

// 广播状态
export const boradcastStatus = new Map([
  ['disabled', '禁用'],
  ['normal', '启用'],
  ['unstart', '待开始'],
  ['ended', '已结束'],
  ['deleted', '已删除'],
])

// 轮播状态
export const bannerStatus = new Map([
  ['disabled', '禁用'],
  ['normal', '启用'],
  ['unstart', '待开始'],
  ['ended', '已结束'],
  ['deleted', '已删除'],
])

// 违规类型
export const questionCategoryStat = new Map([
  ['exam_law_count', '法规'],
  ['exam_political_count', '鉴政师'],
  ['exam_porn_count', '鉴黄师'],
  ['exam_terror_count', '鉴恐师'],
  ['exam_vulgar_count', '鉴俗师'],
  ['exam_fraud_count', '鉴诈师'],
  ['exam_label_count', '鉴图师'],
  ['exam_label_text_count', '鉴文师'],
])

// 净网违规类型
export const purifyCategoryStat = new Map([
  ['purify_mix_count', '综合'],
  ['purify_political_count', '涉政'],
  ['purify_porn_count', '涉黄'],
  ['purify_terror_count', '涉恐'],
  ['purify_vulgar_count', '涉俗'],
  ['purify_fraud_count', '涉诈'],
  ['purify_label_count', '鉴图师'],
  ['purify_label_text_count', '鉴文师'],
])

// 能力矩阵
export const radarType = new Map([
  ['professional', '专业度'],
  ['complete', '完成度'],
  ['correct', '准确度'],
  ['detailed', '细致度'],
  ['keen', '敏锐度'],
])

// 帮助中心类型
export const wikiTypes = new Map([
  ['menu', '菜单'],
  ['article', '文章'],
])

export const scoreStatusType = new Map([
  ['preaudit', '待处理'],
  ['success', '成功'],
  ['fail', '失败'],
])

// 靶场正确选项
export const auditResult = new Map([
  ['normal', '正常'],
  ['illegal', '违规'],
])

// 内容状态选项
export const practiceOrderStatus = new Map([
  ['disable', '禁用'],
  ['enable', '启用'],
])

// 内容类型选项
export const contentTypeChoices = new Map([
  ['image', '图片'],
  ['text', '文本'],
  ['imagetext', '图文混合'],
  // ['video', '视频'],
  // ['audio', '音频'],
])

// 练习记录下用户练习状态
export const practiceUserFlowStatus = new Map([
  ['doing', '进行中'],
  ['stop', '中断'],
  ['done', '已完成'],
])

// 练习明细下练习结果
export const practiceResult = new Map([
  ['fail', '失败'],
  ['success', '成功'],
])

// 练习明细下正确结果和提交结果
export const practiceAuditResult = new Map([
  ['normal', '正常'],
  ['illegal', '违规'],
])

// 质检类型
export const qcType = new Map([
  ['normal', '合规'],
  ['illegal', '不合规'],
  ['to_qc', '待质检'],
])

// 净网状态
export const prueAuditResult = new Map([
  ['normal', '正常'],
  ['illegal', '违规'],
  ['to_audit', '待审核'],
])

// 关卡分类
export const keywordsCategory = new Map([
  // ['challenge', '挑战'],
  ['political', '鉴政师'],
  ['porn', '鉴黄师'],
  ['terror', '鉴恐师'],
  ['vulgar', '鉴俗师'],
  ['fraud', '鉴诈师'],
  ['label', '鉴图师'],
  ['label_text', '鉴文师'],
])
