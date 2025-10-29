import { describe, expect, test } from 'vitest'
import { buildSearchParams } from '../src/utils'
import { hc } from '../src'

describe('buildSearchParams', () => {
  test('serializes strings and arrays into query string', () => {
    const query = buildSearchParams({
      q: 'foo bar',
      tags: ['api', 'client'],
      empty: undefined,
    })
    expect(query).toBe('q=foo%20bar&tags=api&tags=client')
  })
})

describe('hc $url', () => {
  test('includes encoded query string', () => {
    const client = hc('https://example.com')
    const url = client.posts.$url({
      query: {
        search: 'foo bar',
        tags: ['api', 'client'],
      },
    })
    expect(url.toString()).toBe('https://example.com/posts?search=foo%20bar&tags=api&tags=client')
  })
})
