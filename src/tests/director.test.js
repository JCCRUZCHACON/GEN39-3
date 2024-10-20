require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL = '/api/v1/directors'

const directors = {
  firstName: "Jeff ",
  lastName: "Chan",
  nationality: "American",
  image: "https://image.tmdb.org/t/p/w500/vvzStAxbSgoadZ361SnYxx8RDdf.jpg",
  birthday: "1954-04-07"
}

let directorId

const directorUpdate = {
  firstName: 'Samuel',
}

//! test del post
test("POST -> 'BASE_URL',should return status code 201, and res.body to be defined, res.body.firstName === directors.firstName", async () => {

  const res = await request(app).post(BASE_URL).send(directors)

  directorId = res.body.id
    
  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directors.firstName)
})

//! test del getAll
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async () => {

    const res = await request(app).get(BASE_URL)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)
  })
  
  //! test getOne
  test("GET -> 'BASE_URL/:id' should return status code 200, and res.body.firstName === directors.firstName", async () => {
    const res = await request(app).get(`${BASE_URL}/${directorId}`);
  
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(directors.firstName);
    expect(res.body.id).toBe(directorId);
  });
  
  
  //! test del update
  test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.firstName to be directorUpdate.firstName ", async () => {
    const res = await request(app).put(`${BASE_URL}/${directorId}`).send(directorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
    expect(res.body.id).toBe(directorId)
  })
  
  
  //! test del remove
  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${BASE_URL}/${directorId}`)
  
    expect(res.statusCode).toBe(204)
  })