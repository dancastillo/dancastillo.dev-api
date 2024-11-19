import { faker } from '@faker-js/faker'

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
