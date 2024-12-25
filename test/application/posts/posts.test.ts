import { after, describe, test } from 'node:test'
import { app } from '../../../src/server.js'

describe('Posts', () => {
  after(() => app.close())

  test('get all posts are sorted by createdAt in descending order', async (t) => {
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

  test('get post by id', async (t) => {
    // Act
    const response = await app.inject({
      url: '/api/posts/pos_38b026ac-90e4-4f66-b3c9-a3581504550e',
      method: 'GET',
    })

    // Extract the response body
    const result = response.json()

    // Assert
    t.assert.equal(response.statusCode, 200)
    t.assert.deepEqual(result.data, {
      id: 'pos_38b026ac-90e4-4f66-b3c9-a3581504550e',
      title: 'About Me',
      content:
        '# About Me\n\nHi, I’m Dan Castillo, a software engineer with over a decade of experience navigating the ever-changing landscape of technology. My journey started like many others—curiosity led me to code, and persistence kept me coming back. Over the years, I’ve built a solid foundation in technologies like Node.js, TypeScript, JavaScript, and databases, both SQL and NoSQL. Working with frameworks like React.js, Next.js, and Nest.js has allowed me to create scalable, efficient, and user-friendly applications. Along the way, I’ve embraced the challenges of debugging complex systems, mentoring others, and contributing to open-source projects that push the boundaries of what’s possible.\n\nAs a product-focused engineer, my passion lies in bridging the gap between technical solutions and business needs. I thrive on solving real-world problems and crafting software that empowers both users and teams. Whether it’s refining workflows for enterprise customers or building tools that streamline development, I believe in creating solutions that are as impactful as they are innovative. For me, engineering isn’t just about writing code—it’s about delivering value and driving progress in everything I touch.',
      updatedAt: '2024-11-29T14:00:36.435Z',
    })
    t.assert.deepEqual(result.errors, [])
  })
})
