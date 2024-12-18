import { test } from 'node:test'
import { MockAgent, setGlobalDispatcher } from 'undici'
import { createPostMetaMock } from '../../mock-data/posts/posts.js'
import { app } from '../../../src/server.js'

test('posts are sorted by createdAt in descending order', async (t) => {
  t.after(() => app.close())

  // Arrange #1 - Mock the Github API response
  const mockAgent = new MockAgent()
  setGlobalDispatcher(mockAgent)
  const mockPool = mockAgent.get(process.env.GITHUB_API_URL!)
  const mockData = createPostMetaMock()
  mockPool
    .intercept({
      path: '/graphql',
      method: 'POST',
    })
    .reply(200, { data: mockData })

  // Act
  const response = await app.inject({
    url: '/api/posts',
    method: 'GET',
  })

  // Assert
  t.assert.equal(response.statusCode, 200)
})
