import { autoConfig } from '../../../plugins/external/_env.js'

const CONTRIBUTIONS_FIRST = 10
const CONTRIBUTIONS_TO = new Date()
const CONTRIBUTIONS_FROM = new Date(new Date(CONTRIBUTIONS_TO).setFullYear(CONTRIBUTIONS_TO.getFullYear() - 1))
const ORDER_BY = {
  direction: 'DESC',
}

export type GithubGraphContributions = {
  first: number
  to: Date
  from: Date
  login: string
}

export function getGithubContributionsGraphqlValues(): { query: string; variables: GithubGraphContributions } {
  const contributions = {
    query: `
query GetContributions ($login: String!, $first: Int!, $from: DateTime!, $to: DateTime!, $orderBy: ContributionOrder!) {
    user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
            pullRequestReviewContributions(first: $first, orderBy: $orderBy) {
                edges {
                    cursor
                    node {
                        pullRequest {
                            createdAt
                            repository {
                                name
                                url
                            }
                            state
                            title
                            url
                        }
                    }
                }
            }
            pullRequestContributions(first: $first, orderBy: $orderBy) {
                edges {
                    cursor
                    node {
                        pullRequest {
                            createdAt
                            repository {
                                name
                                url
                            }
                            state
                            title
                            url

                        }
                    }
                }
            }
            issueContributions(first: $first, orderBy: $orderBy) {
                edges {
                    cursor
                    node {
                        issue {
                            title
                            url
                            createdAt
                            repository {
                                name
                                url
                            }
                        }
                    }
                }
            }
        }
    }
}
`,
    variables: {
      first: CONTRIBUTIONS_FIRST,
      to: CONTRIBUTIONS_TO,
      from: CONTRIBUTIONS_FROM,
      login: autoConfig.data.GITHUB_USERNAME,
      orderBy: ORDER_BY,
    },
  }

  return contributions
}
