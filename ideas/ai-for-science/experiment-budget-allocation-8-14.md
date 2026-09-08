---
id: "idea-133"
slug: "experiment-budget-allocation-8-14"
category: "AI for Science"
difficulty: "Advanced"
status: "Open"
compute: "Low"
source: "AI-generated"
model: "SciBERT + planner LLM"
dataset: "Papers, domain corpora, experiment logs"
keywords: ["experiment budget allocation","AI for Science","idea-zoo","open research"]
upvotes: 148
downvotes: 11
trending: 97
created_at: "2026-08-06"
human_reviewed: false
discussion_number: null
verification_verdict: "Strong"
score_implementability: 8
score_operability: 7
score_innovation: 8
score_similarity_risk: 4
score_verification_confidence: 8
score_potential_impact: 8
author_github: "community"
---

## Title EN
Experiment Budget Allocation

## Title ZH
实验预算分配

## Tagline EN
Test whether experiment budget allocation can improve hit rate, uncertainty calibration, and experiment cost in scientific discovery workflows.

## Tagline ZH
检验“实验预算分配”能否改善科学发现流程的命中率、不确定性校准与实验成本。

## Summary EN
Experiment Budget Allocation studies a focused intervention for scientific discovery workflows. The project turns the concept into a falsifiable comparison on Papers, domain corpora, experiment logs, using SciBERT + planner LLM as the initial implementation target. Its value lies in showing not only whether the intervention works, but also when its gains justify the added complexity.

## Summary ZH
“实验预算分配”研究一种面向科学发现流程的具体干预方法。项目以 SciBERT + planner LLM 为首个实现对象，在 Papers, domain corpora, experiment logs 上把这一概念转化为可证伪的对照实验。研究不仅判断方法是否有效，还要明确收益在什么条件下足以抵偿新增复杂度。

## Challenge EN
Scientific discovery workflows are commonly evaluated with aggregate scores that hide where experiment budget allocation helps or fails. A convincing study must separate genuine capability gains from prompt sensitivity, data leakage, and extra compute. It must also define failure cases before running the experiment rather than explaining them after the fact.

## Challenge ZH
现有科学发现流程常依赖汇总分数，难以看清“实验预算分配”究竟在哪些场景有效、又在哪些场景失效。可信研究必须区分真实能力提升与提示敏感、数据泄漏及额外算力带来的表面收益，并在实验前预先定义失败条件，而不是事后解释结果。

## Method EN
Implement a reproducible baseline and one experiment budget allocation variant with matched prompts, data splits, and compute budgets. Evaluate both on Papers, domain corpora, experiment logs, stratify results by task difficulty, and record hit rate, uncertainty calibration, and experiment cost. Run ablations that remove the proposed mechanism, then publish seeds, configurations, traces, and negative results so another team can reproduce the comparison.

## Method ZH
实现一个可复现基线和一个“实验预算分配”实验版本，严格对齐提示词、数据切分与算力预算。在 Papers, domain corpora, experiment logs 上按任务难度分层评测，并记录命中率、不确定性校准与实验成本。通过移除关键机制进行消融，同时公开随机种子、配置、运行轨迹与负面结果，确保其他团队能够复现实验。

## Expected Outcome EN
The primary deliverable is an open benchmark report with confidence intervals, cost-quality curves, and a catalog of failure cases. Success means a repeatable improvement in at least one target metric without an unacceptable regression in the others. A null result is still useful if it identifies the conditions under which experiment budget allocation should not be deployed.

## Expected Outcome ZH
主要产出是一份开放基准报告，包含置信区间、成本—质量曲线和失败案例目录。成功标准是在至少一项核心指标上获得可重复提升，同时其他指标不出现不可接受的退化。即使结果为阴性，只要明确了“实验预算分配”不适合部署的条件，研究仍然有价值。

## Why Now EN
Open models, public datasets, and standardized evaluation tooling now make a controlled study of experiment budget allocation feasible for a small research team. At the same time, production adoption of scientific discovery workflows is exposing limitations that headline benchmarks miss. A transparent study now can establish a stronger baseline before informal practices become entrenched.

## Why Now ZH
开放模型、公开数据集与标准化评测工具已使小型团队能够对“实验预算分配”开展受控研究。与此同时，科学发现流程进入真实应用后暴露出许多榜单分数无法反映的问题。此时开展透明研究，可以在未经验证的经验做法固化之前建立更可靠的基线。

## Verification Note EN
Experiment Budget Allocation is a research proposal, not a verified result. Feasibility is supported by the availability of SciBERT + planner LLM and Papers, domain corpora, experiment logs; the main risks are confounding variables, benchmark contamination, and conclusions that do not transfer beyond the selected tasks. Human expert review is still required before treating the stated scores as evidence.

## Verification Note ZH
“实验预算分配”是研究提案，而非已经验证的结论。SciBERT + planner LLM 与 Papers, domain corpora, experiment logs 的可用性支持其初步可行性；主要风险包括混杂变量、基准污染，以及结论无法迁移到所选任务之外。在把页面评分视为证据之前，仍需相关领域专家进行人工审阅。
