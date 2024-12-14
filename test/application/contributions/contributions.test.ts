import { test } from 'node:test'
import { MockAgent, setGlobalDispatcher } from 'undici'
import { createGithubContributions } from '../../mock-data/contributions/contributions.js'
import { app } from '../../../src/server.js'
import { mapGithubContributionData } from '../../../src/application/github/data/github.data.mapper.js'
import { mapGithubContributionReply } from '../../../src/routes/model/mapper/github-reply.mapper.js'

test('Contributions are sorted by createdAt in descending order', async (t) => {
  t.after(() => app.close())
  // Arrange #1 - Create mock data
  const mockData = createGithubContributions()

  // Arrange #2 - Mock the Github API response
  const mockAgent = new MockAgent()
  setGlobalDispatcher(mockAgent)
  const mockPool = mockAgent.get(process.env.GITHUB_API_URL!)
  mockPool
    .intercept({
      path: '/graphql',
      method: 'POST',
    })
    .reply(200, { data: mockData })

  // Arange #3 - Expected Entities
  const expectedBusiness = mapGithubContributionData({ data: mockData })
  const expected = expectedBusiness.map((business) => mapGithubContributionReply(business))

  // Act - Make a request to the contributions endpoint
  const response = await app.inject({
    url: '/api/contributions',
    method: 'GET',
  })

  const result = response.json()

  // Asserts
  t.assert.equal(response.statusCode, 200)
  t.assert.deepEqual(result.data, expected)
  t.assert.deepEqual(result.errors, [])
})
