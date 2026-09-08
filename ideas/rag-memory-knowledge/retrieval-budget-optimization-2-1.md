---
id: "idea-018"
slug: "retrieval-budget-optimization-2-1"
category: "RAG, Memory & Knowledge"
difficulty: "Intermediate"
status: "Debate"
compute: "High"
source: "Hybrid"
model: "BGE + reranker + GPT-style generator"
dataset: "NQ, HotpotQA, TimeQA"
keywords: ["retrieval budget optimization","RAG, Memory & Knowledge","idea-zoo","open research"]
upvotes: 67
downvotes: 8
trending: 95
created_at: "2026-09-02"
human_reviewed: false
discussion_number: null
verification_verdict: "Promising"
score_implementability: 7
score_operability: 9
score_innovation: 7
score_similarity_risk: 3
score_verification_confidence: 7
score_potential_impact: 7
author_github: "community"
---

## Title EN
Retrieval Budget Optimization

## Title ZH
检索预算优化

## Tagline EN
Test whether retrieval budget optimization can improve evidence recall, citation precision, and retrieval latency in retrieval pipelines.

## Tagline ZH
检验“检索预算优化”能否改善检索与记忆流水线的证据召回率、引用准确率与检索时延。

## Summary EN
Retrieval Budget Optimization studies a focused intervention for retrieval pipelines. The project turns the concept into a falsifiable comparison on NQ, HotpotQA, TimeQA, using BGE + reranker + GPT-style generator as the initial implementation target. Its value lies in showing not only whether the intervention works, but also when its gains justify the added complexity.

## Summary ZH
“检索预算优化”研究一种面向检索与记忆流水线的具体干预方法。项目以 BGE + reranker + GPT-style generator 为首个实现对象，在 NQ, HotpotQA, TimeQA 上把这一概念转化为可证伪的对照实验。研究不仅判断方法是否有效，还要明确收益在什么条件下足以抵偿新增复杂度。

## Challenge EN
Retrieval pipelines are commonly evaluated with aggregate scores that hide where retrieval budget optimization helps or fails. A convincing study must separate genuine capability gains from prompt sensitivity, data leakage, and extra compute. It must also define failure cases before running the experiment rather than explaining them after the fact.

## Challenge ZH
现有检索与记忆流水线常依赖汇总分数，难以看清“检索预算优化”究竟在哪些场景有效、又在哪些场景失效。可信研究必须区分真实能力提升与提示敏感、数据泄漏及额外算力带来的表面收益，并在实验前预先定义失败条件，而不是事后解释结果。

## Method EN
Implement a reproducible baseline and one retrieval budget optimization variant with matched prompts, data splits, and compute budgets. Evaluate both on NQ, HotpotQA, TimeQA, stratify results by task difficulty, and record evidence recall, citation precision, and retrieval latency. Run ablations that remove the proposed mechanism, then publish seeds, configurations, traces, and negative results so another team can reproduce the comparison.

## Method ZH
实现一个可复现基线和一个“检索预算优化”实验版本，严格对齐提示词、数据切分与算力预算。在 NQ, HotpotQA, TimeQA 上按任务难度分层评测，并记录证据召回率、引用准确率与检索时延。通过移除关键机制进行消融，同时公开随机种子、配置、运行轨迹与负面结果，确保其他团队能够复现实验。

## Expected Outcome EN
The primary deliverable is an open benchmark report with confidence intervals, cost-quality curves, and a catalog of failure cases. Success means a repeatable improvement in at least one target metric without an unacceptable regression in the others. A null result is still useful if it identifies the conditions under which retrieval budget optimization should not be deployed.

## Expected Outcome ZH
主要产出是一份开放基准报告，包含置信区间、成本—质量曲线和失败案例目录。成功标准是在至少一项核心指标上获得可重复提升，同时其他指标不出现不可接受的退化。即使结果为阴性，只要明确了“检索预算优化”不适合部署的条件，研究仍然有价值。

## Why Now EN
Open models, public datasets, and standardized evaluation tooling now make a controlled study of retrieval budget optimization feasible for a small research team. At the same time, production adoption of retrieval pipelines is exposing limitations that headline benchmarks miss. A transparent study now can establish a stronger baseline before informal practices become entrenched.

## Why Now ZH
开放模型、公开数据集与标准化评测工具已使小型团队能够对“检索预算优化”开展受控研究。与此同时，检索与记忆流水线进入真实应用后暴露出许多榜单分数无法反映的问题。此时开展透明研究，可以在未经验证的经验做法固化之前建立更可靠的基线。

## Verification Note EN
Retrieval Budget Optimization is a research proposal, not a verified result. Feasibility is supported by the availability of BGE + reranker + GPT-style generator and NQ, HotpotQA, TimeQA; the main risks are confounding variables, benchmark contamination, and conclusions that do not transfer beyond the selected tasks. Human expert review is still required before treating the stated scores as evidence.

## Verification Note ZH
“检索预算优化”是研究提案，而非已经验证的结论。BGE + reranker + GPT-style generator 与 NQ, HotpotQA, TimeQA 的可用性支持其初步可行性；主要风险包括混杂变量、基准污染，以及结论无法迁移到所选任务之外。在把页面评分视为证据之前，仍需相关领域专家进行人工审阅。
