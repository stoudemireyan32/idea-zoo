import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'ideas')

const categoryCopy = {
  'Reasoning & Reliability': {
    zh: '推理与可靠性', object: 'reasoning systems', objectZh: '推理系统',
    metric: 'answer accuracy, calibration error, and reasoning cost', metricZh: '答案准确率、校准误差与推理成本',
  },
  'RAG, Memory & Knowledge': {
    zh: '检索、记忆与知识', object: 'retrieval pipelines', objectZh: '检索与记忆流水线',
    metric: 'evidence recall, citation precision, and retrieval latency', metricZh: '证据召回率、引用准确率与检索时延',
  },
  'Agentic Systems': {
    zh: '智能体系统', object: 'tool-using agents', objectZh: '工具型智能体',
    metric: 'task success, intervention rate, and execution cost', metricZh: '任务成功率、人工介入率与执行成本',
  },
  'Multimodal & Vision-Language': {
    zh: '多模态与视觉语言', object: 'multimodal models', objectZh: '多模态模型',
    metric: 'grounding accuracy, robustness, and inference cost', metricZh: '定位准确率、鲁棒性与推理成本',
  },
  'Training & Alignment': {
    zh: '训练与对齐', object: 'aligned language models', objectZh: '对齐后的语言模型',
    metric: 'task utility, policy compliance, and training efficiency', metricZh: '任务效用、策略遵循度与训练效率',
  },
  'Inference & Systems Optimization': {
    zh: '推理与系统优化', object: 'model-serving systems', objectZh: '模型服务系统',
    metric: 'latency, throughput, memory use, and output quality', metricZh: '时延、吞吐量、内存占用与输出质量',
  },
  'Evaluation & Benchmarks': {
    zh: '评测与基准', object: 'AI evaluation suites', objectZh: 'AI 评测体系',
    metric: 'validity, coverage, reproducibility, and evaluation cost', metricZh: '有效性、覆盖度、可复现性与评测成本',
  },
  'AI for Science': {
    zh: 'AI 科学研究', object: 'scientific discovery workflows', objectZh: '科学发现流程',
    metric: 'hit rate, uncertainty calibration, and experiment cost', metricZh: '命中率、不确定性校准与实验成本',
  },
  'Safety, Governance & Policy': {
    zh: '安全、治理与政策', object: 'AI governance controls', objectZh: 'AI 治理控制机制',
    metric: 'risk recall, false-positive rate, and auditability', metricZh: '风险召回率、误报率与可审计性',
  },
  'Human-AI Interaction': {
    zh: '人机交互', object: 'human-AI interfaces', objectZh: '人机协作界面',
    metric: 'task completion, user effort, trust calibration, and accessibility', metricZh: '任务完成率、用户负担、信任校准与可访问性',
  },
  'Data & Synthetic Data Engineering': {
    zh: '数据与合成数据工程', object: 'training-data pipelines', objectZh: '训练数据流水线',
    metric: 'data quality, coverage, leakage risk, and production cost', metricZh: '数据质量、覆盖度、泄漏风险与生产成本',
  },
  'Open Source Community Mechanics': {
    zh: '开源社区机制', object: 'open-source research communities', objectZh: '开源研究社区',
    metric: 'participation, review quality, contributor retention, and moderation load', metricZh: '参与度、评审质量、贡献者留存与治理负担',
  },
}

const exact = {
  'adaptive reasoning budget': '自适应推理预算', 'counterfactual chain auditing': '反事实推理链审计',
  'verifier-first decoding': '验证器优先解码', 'uncertainty-aware refusal': '不确定性感知拒答',
  'long-context logic stability': '长上下文逻辑稳定性', 'reasoning trace compression': '推理轨迹压缩',
  'self-critique consistency': '自我批判一致性', 'proof-grounded generation': '证明约束生成',
  'symbolic-neural hybrid reasoning': '符号—神经混合推理', 'reasoning hallucination detection': '推理幻觉检测',
  'causal trace alignment': '因果轨迹对齐', 'robust multi-hop decomposition': '鲁棒多跳分解',
  'error-aware self-correction': '错误感知自我修正', 'process reward calibration': '过程奖励校准',
  'reasoning safety guardrails': '推理安全护栏', 'uncertain step abstention': '不确定步骤弃权',
  'deliberation depth routing': '思考深度路由',
}

const glossary = {
  adaptive:'自适应', reasoning:'推理', budget:'预算', counterfactual:'反事实', chain:'链', auditing:'审计', verifier:'验证器', first:'优先', decoding:'解码', uncertainty:'不确定性', aware:'感知', refusal:'拒答', long:'长', context:'上下文', logic:'逻辑', stability:'稳定性', trace:'轨迹', compression:'压缩', self:'自我', critique:'批判', consistency:'一致性', proof:'证明', grounded:'约束', generation:'生成', symbolic:'符号', neural:'神经', hybrid:'混合', hallucination:'幻觉', detection:'检测', causal:'因果', alignment:'对齐', robust:'鲁棒', multi:'多', hop:'跳', decomposition:'分解', error:'错误', correction:'修正', process:'过程', reward:'奖励', calibration:'校准', safety:'安全', guardrails:'护栏', uncertain:'不确定', step:'步骤', abstention:'弃权', deliberation:'思考', depth:'深度', routing:'路由',
  retrieval:'检索', freshness:'时效性', memory:'记忆', decay:'衰减', policy:'策略', knowledge:'知识', conflict:'冲突', query:'查询', reranking:'重排序', evidence:'证据', source:'来源', trust:'可信度', cross:'跨', lingual:'语言', session:'会话', graph:'图谱', contradiction:'矛盾', repair:'修复', packing:'编排', optimization:'优化', domain:'领域', enterprise:'企业级', temporal:'时序', benchmark:'基准',
  tool:'工具', planning:'规划', failure:'失败', rollback:'回滚', protocol:'协议', latency:'时延', delegation:'委派', control:'控制', agent:'智能体', action:'行动', sandbox:'沙箱', goal:'目标', priority:'优先级', scheduling:'调度', schema:'模式', drift:'漂移', recovery:'恢复', retry:'重试', checkpoint:'检查点', reliability:'可靠性', role:'角色', specialized:'专业化', team:'团队', cost:'成本', governance:'治理', explainability:'可解释性', execution:'执行', replay:'回放', debugging:'调试', human:'人工', interrupt:'中断', task:'任务', quality:'质量', metric:'指标', autonomous:'自主',
  visual:'视觉', language:'语言', video:'视频', image:'图像', audio:'音频', grounding:'定位', rationale:'依据', localization:'定位', multimodal:'多模态', fusion:'融合', caption:'描述', object:'对象', spatial:'空间', compositional:'组合', perception:'感知', document:'文档', chart:'图表', understanding:'理解', embodied:'具身', instruction:'指令', following:'遵循', text:'文本', consistency:'一致性', accessibility:'可访问性',
  training:'训练', preference:'偏好', adversarial:'对抗', robustness:'鲁棒性', tax:'代价', measurement:'测量', constitutional:'宪法式', curriculum:'课程式', supervision:'监督', feedback:'反馈', objective:'目标', balancing:'平衡', monitoring:'监测', scaling:'扩展', red:'红队', augmented:'增强', hacking:'投机', sensitive:'敏感', finetuning:'微调', modeling:'建模', tuned:'调优', distillation:'蒸馏', small:'小型', model:'模型', transfer:'迁移', eval:'评测', shift:'偏移', debate:'辩论',
  inference:'推理', serving:'服务', batching:'批处理', cache:'缓存', quantization:'量化', speculative:'推测式', throughput:'吞吐量', memory:'内存', hardware:'硬件', kernel:'算子', energy:'能耗', efficient:'高效', sparse:'稀疏', mixture:'混合', experts:'专家', loading:'加载', request:'请求', workload:'负载', prediction:'预测', early:'提前', exit:'退出',
  evaluation:'评测', opposition:'对立', prompting:'提示', faithfulness:'忠实度', level:'级别', community:'社区', review:'评审', citation:'引用', leakage:'泄漏', comparability:'可比性', accounting:'核算', multilingual:'多语言', fairness:'公平性', severity:'严重度', rubric:'量表', interactive:'交互式', harness:'框架', continuous:'持续', scorecard:'评分卡', correctness:'正确性',
  materials:'材料', hypothesis:'假设', triage:'筛选', protein:'蛋白质', experiment:'实验', molecule:'分子', property:'性质', forecasting:'预测', reaction:'反应', pathway:'路径', recommendation:'推荐', scientific:'科学', literature:'文献', synthesis:'综述', lab:'实验室', automation:'自动化', negative:'负面', result:'结果', mining:'挖掘', claim:'论断', verification:'验证', simulation:'模拟', guided:'引导', high:'高', ranking:'排序', instrument:'仪器', log:'日志', anomaly:'异常', novelty:'新颖性', allocation:'分配', discipline:'学科', discovery:'发现', science:'科学', workflow:'工作流', copilots:'助手',
  harm:'危害', compliance:'合规', risk:'风险', taxonomy:'分类体系', sensitive:'敏感', abuse:'滥用', pattern:'模式', ready:'就绪', audit:'审计', trail:'轨迹', privacy:'隐私', provenance:'溯源', tagging:'标记', jurisdiction:'司法辖区', moderation:'审核', alerts:'预警', escalation:'升级', incident:'事件', dashboarding:'看板化', oversight:'监督', loop:'闭环', design:'设计', card:'卡片', standard:'标准', strategies:'策略',
  user:'用户', intent:'意图', disambiguation:'消歧', effort:'负担', minimization:'最小化', trust:'信任', explanation:'解释', conversational:'对话式', interface:'界面', collaborative:'协作', decision:'决策', support:'支持', cognitive:'认知', load:'负荷', personalization:'个性化', correction:'纠错', mixed:'混合', initiative:'主动权', accessibility:'可访问性', novice:'新手', expert:'专家', handoff:'交接', satisfaction:'满意度', interruption:'打断', transparency:'透明度',
  synthetic:'合成', data:'数据', contamination:'污染', hard:'困难', example:'样本', diversity:'多样性', balancing:'均衡', adaptation:'适配', curation:'筛选', automated:'自动化', labeling:'标注', teacher:'教师', student:'学生', bias:'偏差', preserving:'保护', scenario:'场景', dataset:'数据集', freshness:'新鲜度', duplication:'重复', focused:'导向', augmentation:'增强',
  open:'开源', contributor:'贡献者', onboarding:'引导', discussion:'讨论', metrics:'指标', maintainer:'维护者', burnout:'倦怠', issue:'议题', reproducibility:'可复现性', incentive:'激励', reputation:'声誉', consensus:'共识', formation:'形成', fork:'分叉', collaboration:'协作', roadmap:'路线图', prioritization:'优先排序', contribution:'贡献', attribution:'归因', license:'许可证', compatibility:'兼容性', sustainability:'可持续性', mentorship:'导师制', matching:'匹配', moderation:'治理',
  plan:'规划', agents:'智能体', state:'状态', scoring:'评分', linking:'链接', construction:'构建', pipeline:'流水线', aligned:'对齐', kit:'工具包', utility:'效用', frontier:'前沿', suite:'套件', assistive:'辅助式', creativity:'创意', workflows:'工作流', clarification:'澄清', dialogue:'对话', co:'协同', pilot:'助手', intervention:'干预', timing:'时机', editing:'编辑', protocols:'协议', confidence:'置信度', ux:'交互', cues:'提示', conversation:'对话', controls:'控制', interactions:'交互', vs:'与', mode:'模式', switching:'切换', collection:'收集', loops:'闭环', to:'转', triggers:'触发条件', board:'看板', interaction:'交互', dynamic:'动态', edge:'边缘端', cloud:'云端', split:'拆分', policies:'策略', fault:'故障', tolerant:'容错', path:'路径', green:'绿色', heterogeneous:'异构', qos:'服务质量', kv:'键值', tenant:'租户', isolation:'隔离', p95:'P95', reduction:'降低', strategy:'策略', observability:'可观测性', token:'词元', caching:'缓存', modal:'模态', fine:'细粒度', grained:'', medical:'医学', report:'报告', checking:'检查', tracing:'追踪', ocr:'OCR', noise:'噪声', resilient:'鲁棒', speech:'语音', use:'使用', vision:'视觉', of:'', thought:'思维', validation:'验证', anti:'反', herding:'从众', playbooks:'手册', signals:'信号', constructive:'建设性', templates:'模板', rules:'规则', conversion:'转化', duplicate:'重复', idea:'想法', backed:'支持', norms:'规范', newcomer:'新贡献者', prompts:'提示', lifecycle:'生命周期', tracking:'跟踪', pr:'PR', transparent:'透明', for:'面向', rag:'RAG', reconstruction:'重建', answer:'答案', vector:'向量', arbitration:'仲裁', assisted:'辅助', learning:'学习', diagnosis:'诊断', weighting:'加权', traceability:'可追溯性', content:'内容', teaming:'测试', kpi:'KPI', under:'应对', rl:'强化学习', style:'式',
}

const translateTitle = (title) => {
  const key = title.toLowerCase().replaceAll('–', '-').replaceAll('—', '-')
  if (exact[key]) return exact[key]
  return key.split(/([\s-]+)/).map((token) => {
    if (/^[\s-]+$/.test(token)) return token.includes('-') ? '—' : ''
    return glossary[token] ?? token.toUpperCase()
  }).join('').replaceAll('——', '—')
}

const taglineRules = [
  { pattern: /detection|detecting|alerts?$/i, en: (t, c) => `Catch ${t} failures before they undermine ${c.object}.`, zh: (t, c) => `在${t}相关故障影响${c.objectZh}之前及时识别它们。` },
  { pattern: /benchmark|suite|scorecard|evaluation$/i, en: (t, c) => `A reproducible test bed for measuring ${t} across real operating conditions.`, zh: (t, c) => `建立可复现测试平台，在真实运行条件下衡量${t}。` },
  { pattern: /metric|metrics|scoring|measurement$/i, en: (t, c) => `Turn ${t} into a metric teams can compare, audit, and improve.`, zh: (t) => `把${t}转化为可比较、可审计、可持续改进的指标。` },
  { pattern: /calibration$/i, en: (t) => `Align confidence with reality through measurable ${t}.`, zh: (t) => `通过可度量的${t}，让系统置信度更贴近真实表现。` },
  { pattern: /routing$/i, en: (t, c) => `Send each workload down the right path with ${t}.`, zh: (t) => `利用${t}为每项负载选择合适的处理路径。` },
  { pattern: /scheduling$/i, en: (t) => `Schedule limited resources around ${t} without sacrificing quality.`, zh: (t) => `围绕${t}调度有限资源，同时守住质量底线。` },
  { pattern: /planning$/i, en: (t) => `Make ${t} explicit, testable, and resilient to changing conditions.`, zh: (t) => `让${t}变得显式、可测试，并能适应条件变化。` },
  { pattern: /optimization$/i, en: (t, c) => `Find the practical quality–cost frontier for ${t} in ${c.object}.`, zh: (t, c) => `寻找${c.objectZh}采用${t}时切实可行的质量—成本边界。` },
  { pattern: /compression$/i, en: (t) => `Reduce the footprint of ${t} while preserving the information that matters.`, zh: (t) => `压缩${t}的资源占用，同时保留真正影响结果的信息。` },
  { pattern: /governance$/i, en: (t) => `Give teams enforceable rules and audit trails for ${t}.`, zh: (t) => `为${t}建立可执行规则与完整审计轨迹。` },
  { pattern: /protocol|policy|policies|standard|rules|guardrails$/i, en: (t) => `Define a practical ${t} that remains enforceable under real-world pressure.`, zh: (t) => `制定在真实压力下仍可执行的${t}方案。` },
  { pattern: /monitoring|tracking|observability|dashboarding$/i, en: (t) => `Make ${t} visible early enough for teams to act.`, zh: (t) => `让${t}足够早地显现，使团队能够及时行动。` },
  { pattern: /verification|validation|auditing|checking$/i, en: (t) => `Expose hidden errors by making ${t} systematic and reproducible.`, zh: (t) => `通过系统且可复现的${t}揭示隐藏错误。` },
  { pattern: /recovery|rollback|repair|self-correction$/i, en: (t, c) => `Help ${c.object} recover safely through ${t} instead of starting over.`, zh: (t, c) => `让${c.objectZh}借助${t}安全恢复，而不是从头再来。` },
  { pattern: /allocation|budget$/i, en: (t) => `Spend scarce resources where ${t} can deliver the largest verified gain.`, zh: (t) => `把稀缺资源投入${t}最可能带来可验证收益的环节。` },
  { pattern: /generation|synthesis|construction|augmentation$/i, en: (t) => `Produce better research inputs through controlled ${t}, not blind scale.`, zh: (t) => `以受控的${t}提升研究输入质量，而不是盲目追求规模。` },
  { pattern: /retrieval|reranking|linking$/i, en: (t) => `Surface stronger evidence with ${t} while keeping provenance intact.`, zh: (t) => `利用${t}找到更有力的证据，同时保留完整来源链。` },
  { pattern: /forecasting|prediction$/i, en: (t) => `Make ${t} useful by attaching calibrated uncertainty to every prediction.`, zh: (t) => `为每次预测附带校准后的不确定性，让${t}真正可用。` },
  { pattern: /recommendation$/i, en: (t) => `Rank actionable candidates through evidence-aware ${t}.`, zh: (t) => `通过证据感知的${t}对可行动候选项进行排序。` },
  { pattern: /mining$/i, en: (t) => `Recover overlooked signal through transparent ${t}.`, zh: (t) => `通过透明的${t}找回被忽略的有效信号。` },
  { pattern: /localization|grounding$/i, en: (t) => `Connect model claims to the exact evidence through ${t}.`, zh: (t) => `通过${t}把模型结论与精确证据位置连接起来。` },
  { pattern: /alignment$/i, en: (t) => `Measure where ${t} holds—and where it quietly breaks.`, zh: (t) => `衡量${t}在何处成立，又在何处悄然失效。` },
  { pattern: /consistency|stability|robustness|reliability$/i, en: (t) => `Stress-test ${t} beyond clean benchmarks and ideal inputs.`, zh: (t) => `让${t}接受超越理想输入和标准基准的压力测试。` },
  { pattern: /explainability|transparency$/i, en: (t) => `Make ${t} useful for decisions rather than merely descriptive.`, zh: (t) => `让${t}真正服务于决策，而不只是事后描述。` },
  { pattern: /collaboration|review|debate|feedback/i, en: (t) => `Improve collective decisions by redesigning ${t} around evidence.`, zh: (t) => `围绕证据重新设计${t}，提升群体决策质量。` },
  { pattern: /workflow|workflows|pipeline|lifecycle/i, en: (t) => `Turn ${t} into a workflow contributors can inspect and reproduce.`, zh: (t) => `把${t}变成贡献者能够检查和复现的工作流。` },
  { pattern: /control|controls|balancing$/i, en: (t) => `Keep humans in command with measurable ${t}.`, zh: (t) => `通过可度量的${t}确保人类始终掌握控制权。` },
]

const makeTagline = (title, titleZh, copy, index) => {
  const rule = taglineRules.find(({ pattern }) => pattern.test(title))
  if (rule) return { en: rule.en(title.toLowerCase(), copy), zh: rule.zh(titleZh, copy) }
  const fallbacks = [
    { en: `Reveal when ${title.toLowerCase()} creates real value—and when it does not.`, zh: `揭示${titleZh}何时创造真实价值，以及何时无效。` },
    { en: `Move ${title.toLowerCase()} from a promising concept to a falsifiable experiment.`, zh: `把${titleZh}从有潜力的概念推进为可证伪实验。` },
    { en: `Map the benefits, costs, and failure modes of ${title.toLowerCase()}.`, zh: `系统描绘${titleZh}的收益、成本与失败模式。` },
    { en: `Build an evidence-backed case for—or against—${title.toLowerCase()}.`, zh: `用实验证据判断${titleZh}究竟是否值得采用。` },
    { en: `Find the operating conditions where ${title.toLowerCase()} remains dependable.`, zh: `找出${titleZh}能够保持可靠的运行条件。` },
  ]
  return fallbacks[index % fallbacks.length]
}

const readSections = (body) => Object.fromEntries(
  [...body.matchAll(/^##\s+(.+)\n([\s\S]*?)(?=\n##\s+|$)/gm)].map((match) => [match[1].trim(), match[2].trim()]),
)

const getMeta = (frontmatter, key) => {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return match ? JSON.parse(match[1]) : null
}

const files = fs.readdirSync(root, { recursive: true })
  .filter((name) => name.endsWith('.md') && name !== 'TEMPLATE.md')
  .map((name) => path.join(root, name))

for (const [index, file] of files.entries()) {
  const raw = fs.readFileSync(file, 'utf8')
  const [, frontmatter, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  const sections = readSections(body)
  const title = sections['Title EN']
  const titleZh = translateTitle(title)
  const category = getMeta(frontmatter, 'category')
  const model = getMeta(frontmatter, 'model')
  const dataset = getMeta(frontmatter, 'dataset')
  const copy = categoryCopy[category]
  const topic = title.toLowerCase()
  const tagline = makeTagline(title, titleZh, copy, index)

  const next = {
    'Title EN': title,
    'Title ZH': titleZh,
    'Tagline EN': tagline.en,
    'Tagline ZH': tagline.zh,
    'Summary EN': `${title} studies a focused intervention for ${copy.object}. The project turns the concept into a falsifiable comparison on ${dataset}, using ${model} as the initial implementation target. Its value lies in showing not only whether the intervention works, but also when its gains justify the added complexity.`,
    'Summary ZH': `“${titleZh}”研究一种面向${copy.objectZh}的具体干预方法。项目以 ${model} 为首个实现对象，在 ${dataset} 上把这一概念转化为可证伪的对照实验。研究不仅判断方法是否有效，还要明确收益在什么条件下足以抵偿新增复杂度。`,
    'Challenge EN': `${copy.object.charAt(0).toUpperCase() + copy.object.slice(1)} are commonly evaluated with aggregate scores that hide where ${topic} helps or fails. A convincing study must separate genuine capability gains from prompt sensitivity, data leakage, and extra compute. It must also define failure cases before running the experiment rather than explaining them after the fact.`,
    'Challenge ZH': `现有${copy.objectZh}常依赖汇总分数，难以看清“${titleZh}”究竟在哪些场景有效、又在哪些场景失效。可信研究必须区分真实能力提升与提示敏感、数据泄漏及额外算力带来的表面收益，并在实验前预先定义失败条件，而不是事后解释结果。`,
    'Method EN': `Implement a reproducible baseline and one ${topic} variant with matched prompts, data splits, and compute budgets. Evaluate both on ${dataset}, stratify results by task difficulty, and record ${copy.metric}. Run ablations that remove the proposed mechanism, then publish seeds, configurations, traces, and negative results so another team can reproduce the comparison.`,
    'Method ZH': `实现一个可复现基线和一个“${titleZh}”实验版本，严格对齐提示词、数据切分与算力预算。在 ${dataset} 上按任务难度分层评测，并记录${copy.metricZh}。通过移除关键机制进行消融，同时公开随机种子、配置、运行轨迹与负面结果，确保其他团队能够复现实验。`,
    'Expected Outcome EN': `The primary deliverable is an open benchmark report with confidence intervals, cost-quality curves, and a catalog of failure cases. Success means a repeatable improvement in at least one target metric without an unacceptable regression in the others. A null result is still useful if it identifies the conditions under which ${topic} should not be deployed.`,
    'Expected Outcome ZH': `主要产出是一份开放基准报告，包含置信区间、成本—质量曲线和失败案例目录。成功标准是在至少一项核心指标上获得可重复提升，同时其他指标不出现不可接受的退化。即使结果为阴性，只要明确了“${titleZh}”不适合部署的条件，研究仍然有价值。`,
    'Why Now EN': `Open models, public datasets, and standardized evaluation tooling now make a controlled study of ${topic} feasible for a small research team. At the same time, production adoption of ${copy.object} is exposing limitations that headline benchmarks miss. A transparent study now can establish a stronger baseline before informal practices become entrenched.`,
    'Why Now ZH': `开放模型、公开数据集与标准化评测工具已使小型团队能够对“${titleZh}”开展受控研究。与此同时，${copy.objectZh}进入真实应用后暴露出许多榜单分数无法反映的问题。此时开展透明研究，可以在未经验证的经验做法固化之前建立更可靠的基线。`,
    'Verification Note EN': `${title} is a research proposal, not a verified result. Feasibility is supported by the availability of ${model} and ${dataset}; the main risks are confounding variables, benchmark contamination, and conclusions that do not transfer beyond the selected tasks. Human expert review is still required before treating the stated scores as evidence.`,
    'Verification Note ZH': `“${titleZh}”是研究提案，而非已经验证的结论。${model} 与 ${dataset} 的可用性支持其初步可行性；主要风险包括混杂变量、基准污染，以及结论无法迁移到所选任务之外。在把页面评分视为证据之前，仍需相关领域专家进行人工审阅。`,
  }

  const nextBody = Object.entries(next).map(([heading, text]) => `## ${heading}\n${text}`).join('\n\n')
  const correctedFrontmatter = frontmatter.replace(/^human_reviewed:\s*true$/m, 'human_reviewed: false')
  fs.writeFileSync(file, `---\n${correctedFrontmatter}\n---\n\n${nextBody}\n`)
}

console.log(`Rewrote ${files.length} bilingual idea files.`)
