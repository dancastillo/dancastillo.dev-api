import { GithubContribution } from '../../../application/github/data/github.data.types.js'
import { GithubContributionReply } from '../types/github.js'

export function mapGithubContributionReply(contribution: GithubContribution): GithubContributionReply {
  return {
    createdAt: contribution.createdAt,
    url: contribution.url,
    type: contribution.type,
    title: contribution.title,
    repositoryName: contribution.repositoryName,
    repositoryUrl: contribution.repositoryUrl,
  }
}
