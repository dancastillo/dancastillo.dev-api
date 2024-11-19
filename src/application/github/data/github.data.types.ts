//--------------------------------------------
// Data Types
//--------------------------------------------
type GithubIssue = {
  createdAt: string
  title: string
  url: string
  repository: GithubRepository
}

type GithubPullRequest = {
  createdAt: string
  repository: GithubRepository
  state: string
  title: string
  url: string
}

type GithubRepository = {
  name: string
  url: string
}

export type GithubPullRequestReviewContributionData = {
  edges: {
    cursor: string
    node: {
      pullRequest: GithubPullRequest
    }
  }[]
}

export type GithubPullRequestContributionData = {
  edges: {
    cursor: string
    node: {
      pullRequest: GithubPullRequest
    }
  }[]
}

export type GithubIssueContributionData = {
  edges: {
    cursor: string
    node: {
      issue: GithubIssue
    }
  }[]
}

export type GithubContributionData = {
  data: {
    user: {
      contributionsCollection: {
        pullRequestReviewContributions: GithubPullRequestReviewContributionData
        pullRequestContributions: GithubPullRequestContributionData
        issueContributions: GithubIssueContributionData
      }
    }
  }
}

//--------------------------------------------
// Business Types
//--------------------------------------------
export type GithubContribution = {
  createdAt: Date
  url: string
  type: string
  title: string
  repositoryName: string
  repositoryUrl: string
}

export const GITHUB_CONTRIBUTION_TYPE = {
  ISSUE: 'ISSUE',
  COMMIT: 'COMMIT',
  PULL_REQUEST: 'PULL_REQUEST',
  PULL_REQUEST_REVIEW: 'PULL_REQUEST_REVIEW',
} as const
