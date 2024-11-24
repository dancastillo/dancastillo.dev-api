import { request } from 'undici'
import { getGithubContributionsGraphqlValues } from './github.data.query.js'
import { autoConfig } from '../../../plugins/external/_env.js'
import { mapGithubContributionData } from './github.data.mapper.js'
import { ACCEPT_HEADER, HTTP_METHOD, USER_AGENT_HEADER } from '../../../common/http.js'
import { GithubContribution, GithubContributionData } from './github.data.types.js'

export async function requestGithubContributions(): Promise<GithubContribution[]> {
  try {
    const { query, variables } = getGithubContributionsGraphqlValues()

    const { GITHUB_API_TOKEN, GITHUB_API_URL } = autoConfig.data

    const response = await request(`${GITHUB_API_URL}/graphql`, {
      method: HTTP_METHOD.POST,
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: ACCEPT_HEADER,
        'User-Agent': USER_AGENT_HEADER,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = (await response.body.json()) as GithubContributionData

    const githubContributions = mapGithubContributionData(json)

    return githubContributions
  } catch (error: unknown) {
    throw error
  }
}
