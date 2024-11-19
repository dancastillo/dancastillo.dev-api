import { GITHUB_CONTRIBUTION_TYPE, GithubContribution, GithubContributionData } from './github.data.types.js'

//--------------------------------------------
// Mapper
//--------------------------------------------

export function mapGithubContributionData(data: GithubContributionData): GithubContribution[] {
  const pullRequestReviewContributions =
    data.data.user.contributionsCollection.pullRequestReviewContributions.edges.map(
      (edge): GithubContribution => ({
        createdAt: new Date(edge.node.pullRequest.createdAt),
        url: edge.node.pullRequest.url,
        type: GITHUB_CONTRIBUTION_TYPE.PULL_REQUEST_REVIEW,
        title: edge.node.pullRequest.title,
        repositoryUrl: edge.node.pullRequest.repository.url,
        repositoryName: edge.node.pullRequest.repository.name,
      })
    )

  const pullRequestContributions = data.data.user.contributionsCollection.pullRequestContributions.edges.map(
    (edge): GithubContribution => ({
      createdAt: new Date(edge.node.pullRequest.createdAt),
      url: edge.node.pullRequest.url,
      type: GITHUB_CONTRIBUTION_TYPE.PULL_REQUEST,
      title: edge.node.pullRequest.title,
      repositoryUrl: edge.node.pullRequest.repository.url,
      repositoryName: edge.node.pullRequest.repository.name,
    })
  )

  const issueContributions = data.data.user.contributionsCollection.issueContributions.edges.map(
    (edge): GithubContribution => ({
      createdAt: new Date(edge.node.issue.createdAt),
      url: edge.node.issue.url,
      type: GITHUB_CONTRIBUTION_TYPE.ISSUE,
      title: edge.node.issue.title,
      repositoryUrl: edge.node.issue.repository.url,
      repositoryName: edge.node.issue.repository.name,
    })
  )

  return [...pullRequestReviewContributions, ...pullRequestContributions, ...issueContributions]
}
