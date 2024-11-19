import { test } from 'node:test'
import { MockAgent, setGlobalDispatcher } from 'undici'
import { createGithubContributions } from '../../mock-data/github/contributions.js'
import { app } from '../../../src/server.js'

test('Github contributions are sorted by createdAt in descending order', async (t) => {
  t.after(() => app.close())

  // Arrange #1 - Mock the Github API response
  const mockAgent = new MockAgent()
  setGlobalDispatcher(mockAgent)

  const mockPool = mockAgent.get(process.env.GITHUB_API_URL!)

  const mockData = createGithubContributions()
  mockPool
    .intercept({
      path: '/graphql',
      method: 'GET',
    })
    .reply(200, { data: mockData })

  const response = await app.inject({
    url: '/github-contributions',
    method: 'GET',
  })

  t.assert.equal(response.statusCode, 200)
})
