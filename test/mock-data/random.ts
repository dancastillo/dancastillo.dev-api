import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function createRandomUrl(): string {
  return faker.internet.url()
}

export function createRandomCompanyName(): string {
  return faker.company.name()
}

export function createRandomString(length?: number): string {
  if (length === undefined) {
    return faker.string.alpha()
  }
  return faker.string.alpha(length)
}

export function createRandomPullRequestState(): 'OPEN' | 'CLOSED' | 'MERGED' {
  return faker.helpers.arrayElement(['OPEN', 'CLOSED', 'MERGED'])
}

export function createRandomSentence(): string {
  return faker.lorem.sentence()
}

export function createRandomParagraph(): string {
  return faker.lorem.paragraph()
}

export function createRandomDate(): Date {
  return faker.date.past()
}

export function createRandomUuid(): string {
  return randomUUID()
}
