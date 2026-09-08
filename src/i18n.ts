import type { Locale } from './types'

export type I18nShape = {
  brandSubtitle: string
  nav: {
    home: string
    explore: string
    about: string
    contribute: string
    github: string
    random: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    primary: string
    secondary: string
  }
  stats: {
    ideas: string
    areas: string
    open: string
  }
  sections: {
    featured: string
    trending: string
    areas: string
    how: string
  }
  howSteps: string[]
  explore: {
    title: string
    subtitle: string
    searchPlaceholder: string
    noResult: string
    clearFilter: string
    resultCount: string
    random: string
  }
  filters: {
    area: string
    difficulty: string
    status: string
    compute: string
    source: string
    sort: string
    all: string
  }
  sorts: {
    trending: string
    upvotes: string
    downvotes: string
    score: string
    newest: string
    oldest: string
    random: string
  }
  idea: {
    backToExplore: string
    challenge: string
    method: string
    expectedOutcome: string
    whyNow: string
    metadata: string
    model: string
    dataset: string
    keywords: string
    voting: string
    upvotes: string
    downvotes: string
    comments: string
    discussOnGitHub: string
    upvote: string
    downvote: string
    voteHint: string
    aiGenerated: string
    humanReviewed: string
  }
  about: {
    title: string
    subtitle: string
    founder: string
    body: string[]
  }
  contribute: {
    title: string
    subtitle: string
    stepsTitle: string
    steps: string[]
    cta: string
  }
  footer: {
    note: string
  }
}

export const translations: Record<Locale, I18nShape> = {
  en: {
    brandSubtitle: 'Open AI Research Idea Commons',
    nav: {
      home: 'Home',
      explore: 'Explore',
      about: 'About',
      contribute: 'Contribute',
      github: 'GitHub',
      random: 'Random Idea',
    },
    hero: {
      badge: 'Premium AI Research Community',
      title: "Research ideas shouldn't die inside someone's notebook.",
      subtitle:
        'Idea Zoo is an open editorial platform where AI researchers discover, debate, and build the next meaningful experiments.',
      primary: 'Explore Ideas',
      secondary: '🎲 Random Idea',
    },
    stats: {
      ideas: '10 Demo Ideas',
      areas: '10 Research Areas',
      open: 'Open to Everyone',
    },
    sections: {
      featured: 'Featured Ideas',
      trending: 'Trending Now',
      areas: 'Research Areas',
      how: 'How It Works',
    },
    howSteps: [
      'Discover research directions worth your time.',
      'Debate assumptions, risks, and novelty openly.',
      'Build experiments and contribute improvements.',
    ],
    explore: {
      title: 'Explore Research Ideas',
      subtitle:
        'Search, filter, and sort ideas by area, difficulty, and research practicality.',
      searchPlaceholder: 'Search title, method, model, dataset, or keywords…',
      noResult: 'No ideas match the current filters.',
      clearFilter: 'Clear Filters',
      resultCount: 'results',
      random: 'Random Idea',
    },
    filters: {
      area: 'Research Area',
      difficulty: 'Difficulty',
      status: 'Status',
      compute: 'Compute',
      source: 'Source',
      sort: 'Sort',
      all: 'All',
    },
    sorts: {
      trending: 'Trending',
      upvotes: 'Most Upvoted',
      downvotes: 'Most Downvoted',
      score: 'Highest Score',
      newest: 'Newest',
      oldest: 'Oldest',
      random: 'Random',
    },
    idea: {
      backToExplore: 'Back to Explore',
      challenge: 'Research Challenge',
      method: 'Proposed Method',
      expectedOutcome: 'Expected Outcome',
      whyNow: 'Why Now',
      metadata: 'Idea Metadata',
      model: 'Suggested Model',
      dataset: 'Suggested Dataset',
      keywords: 'Keywords',
      voting: 'Community Voting',
      upvotes: 'Upvotes',
      downvotes: 'Downvotes',
      comments: 'Comments',
      discussOnGitHub: 'Discuss on GitHub',
      upvote: 'Upvote',
      downvote: 'Downvote',
      voteHint:
        'Click the upvote/downvote stat card to vote. One vote per idea per local viewer (mutually exclusive, switchable). In local mock mode, discussion jump is disabled unless real discussion mapping is configured.',
      aiGenerated: 'AI-generated',
      humanReviewed: 'Human reviewed',
    },
    about: {
      title: 'About Idea Zoo',
      subtitle:
        'Premium AI Research Lab spirit × Open Source Community × Editorial Research Platform.',
      founder: 'Founded by Yan Li',
      body: [
        'Idea Zoo exists for one purpose: helping researchers find research questions worth building, not just models worth running.',
        'This MVP is intentionally lightweight and open, so the community can shape ranking logic, contribution patterns, and discussion quality from day one.',
      ],
    },
    contribute: {
      title: 'Contribute Ideas',
      subtitle:
        'Idea Zoo grows through open review, reproducible thinking, and community pull requests.',
      stepsTitle: 'Contribution Flow',
      steps: [
        'Fork the repository and create your idea file from template.',
        'Describe challenge, method, expected outcome, and compute realism.',
        'Open a pull request and discuss with the community.',
      ],
      cta: 'Open GitHub Repository',
    },
    footer: {
      note: 'Discover. Debate. Build. Share.',
    },
  },
  zh: {
    brandSubtitle: '开放式 AI 研究灵感社区',
    nav: {
      home: '首页',
      explore: '探索',
      about: '关于',
      contribute: '贡献',
      github: 'GitHub',
      random: '随机灵感',
    },
    hero: {
      badge: '高质量 AI 研究社区',
      title: '研究想法不该困在某个人的笔记本里。',
      subtitle:
        'Idea Zoo 是一个开放式研究灵感编辑平台，让 AI 研究者发现、辩论并实践真正值得做的实验。',
      primary: '探索 Ideas',
      secondary: '🎲 随机 Idea',
    },
    stats: {
      ideas: '10 个 Demo Ideas',
      areas: '10 个研究方向',
      open: '对所有人开放',
    },
    sections: {
      featured: '精选 Ideas',
      trending: '趋势热点',
      areas: '研究方向',
      how: '使用流程',
    },
    howSteps: ['发现值得投入的研究方向。', '公开讨论假设、风险与新颖性。', '构建实验并贡献改进。'],
    explore: {
      title: '探索研究灵感',
      subtitle: '通过搜索、筛选和排序，快速定位可执行的研究问题。',
      searchPlaceholder: '搜索标题、方法、模型、数据集或关键词…',
      noResult: '当前筛选条件下没有匹配结果。',
      clearFilter: '清除筛选',
      resultCount: '个结果',
      random: '随机一个',
    },
    filters: {
      area: '研究方向',
      difficulty: '难度',
      status: '状态',
      compute: '算力需求',
      source: '来源',
      sort: '排序',
      all: '全部',
    },
    sorts: {
      trending: '趋势',
      upvotes: '最多赞同',
      downvotes: '最多反对',
      score: '最高分',
      newest: '最新',
      oldest: '最早',
      random: '随机',
    },
    idea: {
      backToExplore: '返回探索页',
      challenge: '研究挑战',
      method: '建议方法',
      expectedOutcome: '预期结果',
      whyNow: '为什么现在做',
      metadata: 'Idea 元信息',
      model: '建议模型',
      dataset: '建议数据集',
      keywords: '关键词',
      voting: '社区投票',
      upvotes: '赞同数',
      downvotes: '反对数',
      comments: '评论数',
      discussOnGitHub: '去 GitHub 讨论',
      upvote: '赞同',
      downvote: '反对',
      voteHint: '请直接点击上方“赞同数/反对数”卡片进行投票。当前版本每个本地用户对每条 Idea 只能保留一票（赞同/反对互斥但可切换）。在本地 mock 模式下，若未配置真实讨论映射，讨论跳转会禁用。',
      aiGenerated: 'AI 生成',
      humanReviewed: '人工审核',
    },
    about: {
      title: '关于 Idea Zoo',
      subtitle: 'Premium AI Research Lab × Open Source Community × Editorial Research Platform',
      founder: '发起人：Yan Li',
      body: [
        'Idea Zoo 的核心目标不是堆功能，而是帮助研究者更快找到真正值得实验的问题。',
        'V0.1 保持轻量与开放，让社区从第一天开始共同塑造排序机制、贡献流程与讨论质量。',
      ],
    },
    contribute: {
      title: '贡献你的 Idea',
      subtitle: 'Idea Zoo 通过开放评审、可复现思路与社区 PR 持续成长。',
      stepsTitle: '贡献流程',
      steps: [
        'Fork 仓库并基于模板创建你的 Idea 文件。',
        '清晰描述挑战、方法、预期结果与算力可行性。',
        '提交 Pull Request，并与社区讨论打磨。',
      ],
      cta: '打开 GitHub 仓库',
    },
    footer: {
      note: 'Discover. Debate. Build. Share.',
    },
  },
}
