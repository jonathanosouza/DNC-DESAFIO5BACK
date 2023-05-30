import {expect, test, beforeAll, afterAll} from 'vitest'
import request from 'supertest'
import {app} from '../app'


beforeAll( async () => {
    await app.ready()
})

afterAll( async () => {
     await app.close()
})

test('User Can Add One Book', async () => {
  await request(app.server).post('/livros').send({
    title: "Ceu Azul",
    pagenumber: 10,
    cod_isbn: 1030,
    publishing_company: "Editora Azul"
  }).expect(201)
})

