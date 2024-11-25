import { request } from 'undici'
import { getGithubContributionsGraphqlValues } from './github.data.query.js'
import { Envs } from '../../../plugins/external/_env.js'
import { mapGithubContributionData } from './github.data.mapper.js'
import { ACCEPT_HEADER, HTTP_METHOD, USER_AGENT_HEADER } from '../../../common/http.js'
import { GithubContribution, GithubContributionData } from './github.data.types.js'

export async function requestGithubContributions(envs: Envs): Promise<GithubContribution[]> {
  const { GITHUB_API_TOKEN, GITHUB_API_URL, GITHUB_USERNAME } = envs
  const { query, variables } = getGithubContributionsGraphqlValues(GITHUB_USERNAME)

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
}
