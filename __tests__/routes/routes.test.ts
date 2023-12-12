import { describe, it } from 'node:test'
import app from '../../src/server'
import supertest from 'supertest'
import { assert } from 'node:console'
import { equal } from 'node:assert'

describe('GET /', () => {
  it('should send back some data', async () => {
    const res = await supertest(app).get('/')
    equal(res.status, 200, 'status should be 200')
  })
})
