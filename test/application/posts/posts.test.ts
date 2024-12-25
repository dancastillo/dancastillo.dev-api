import { test } from 'node:test'
import { app } from '../../../src/server.js'

test('posts are sorted by createdAt in descending order', async (t) => {
  t.after(() => app.close())

  // Act
  const response = await app.inject({
    url: '/api/posts',
    method: 'GET',
  })

  // Extract the response body
  const result = response.json()

  // Assert
  t.assert.equal(response.statusCode, 200)
  t.assert.deepEqual(result.data, [
    {
      id: 'pos_38b026ac-90e4-4f66-b3c9-a3581504550e',
      title: 'About Me',
      updatedAt: '2024-11-29T14:00:36.435Z',
    },
  ])
  t.assert.deepEqual(result.errors, [])
})
