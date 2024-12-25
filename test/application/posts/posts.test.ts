import Fastify from 'fastify'
import fp from 'fastify-plugin'
import { describe, test } from 'node:test'
import serviceApp from '../../../src/app.js'

describe('Posts', async () => {
  await test('get all posts are sorted by createdAt in descending order', async (t) => {
    const app = Fastify()

    await app.register(fp(serviceApp))
    await app.ready()

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

  await test('get post by id', async (t) => {
    const app = Fastify()

    await app.register(fp(serviceApp))
    await app.ready()

    // Act
    const response = await app.inject({
      url: '/api/posts/pos_38b026ac-90e4-4f66-b3c9-a3581504550e',
      method: 'GET',
    })

    t.after(() => app.close())

    // Extract the response body
    const result = response.json()

    // Assert
    t.assert.equal(response.statusCode, 200)
    console.log(result.data.content)
    t.assert.deepEqual(result.data.id, 'pos_38b026ac-90e4-4f66-b3c9-a3581504550e')
    t.assert.deepEqual(result.data.title, 'About Me')
    t.assert.deepEqual(result.data.updatedAt, '2024-11-29T14:00:36.435Z')
    // TOOD: Add more assertions for content
    t.assert.deepEqual(result.errors, [])
  })
})
