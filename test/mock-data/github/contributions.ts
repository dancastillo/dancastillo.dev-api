import {
  createRandomCompanyName,
  createRandomPullRequestState,
  createRandomString,
  createRandomUrl,
} from '../random.js'

function createPullRequestReviewContributions() {
  return {
    cursor: createRandomString(2),
    node: {
      issue: {
        createdAt: '2021-01-01T00:00:00Z',
        title: createRandomCompanyName(),
        url: createRandomUrl(),
        state: createRandomPullRequestState() as string,
        repository: {
          name: createRandomCompanyName(),
          url: createRandomUrl(),
        },
      },
    },
  }
}

function createPullRequestContributions() {
  return {
    cursor: createRandomString(2),
    node: {
      issue: {
        createdAt: '2021-01-01T00:00:00Z',
        title: createRandomCompanyName(),
        url: createRandomUrl(),
        state: createRandomPullRequestState() as string,
        repository: {
          name: createRandomCompanyName(),
          url: createRandomUrl(),
        },
      },
    },
  }
}

export function createIssueContributions() {
  return {
    cursor: createRandomString(2),
    node: {
      issue: {
        createdAt: '2021-01-01T00:00:00Z',
        title: createRandomCompanyName(),
        url: createRandomUrl(),
        repository: {
          name: createRandomCompanyName(),
          url: createRandomUrl(),
        },
      },
    },
  }
}

export function createGithubContributions() {
  return {
    data: {
      user: {
        contributionsCollection: {
          pullRequestReviewContributions: {
            edges: [createPullRequestReviewContributions()],
          },
          pullRequestContributions: {
            edges: [createPullRequestContributions()],
          },
          issueContributions: {
            edges: [createIssueContributions()],
          },
        },
      },
    },
  }
}
