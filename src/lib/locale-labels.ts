import type { Locale } from '../types'

const zhLabels: Record<string, string> = {
  'Reasoning & Reliability': '推理与可靠性',
  'RAG, Memory & Knowledge': '检索、记忆与知识',
  'Agentic Systems': '智能体系统',
  'Multimodal & Vision-Language': '多模态与视觉语言',
  'Training & Alignment': '训练与对齐',
  'Inference & Systems Optimization': '推理与系统优化',
  'Evaluation & Benchmarks': '评测与基准',
  'AI for Science': 'AI 科学研究',
  'Safety, Governance & Policy': '安全、治理与政策',
  'Human-AI Interaction': '人机交互',
  'Data & Synthetic Data Engineering': '数据与合成数据工程',
  'Open Source Community Mechanics': '开源社区机制',
  Beginner: '入门', Intermediate: '中级', Advanced: '高级',
  Open: '开放', Debate: '讨论中', Claimed: '已认领', 'In Progress': '进行中',
  Low: '低', Medium: '中', High: '高',
  'AI-generated': 'AI 生成', Community: '社区', Hybrid: '混合',
  Strong: '较强', Promising: '有潜力', Speculative: '探索性',
}

export const localeLabel = (value: string, locale: Locale) =>
  locale === 'zh' ? (zhLabels[value] ?? value) : value
