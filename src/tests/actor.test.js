require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL = '/api/v1/actors'

const actors = {
  firstName: "Stephen",
  lastName: "Amell",
  nationality: "Canada",
  image: "https://www.lavanguardia.com/peliculas-series/personas/stephen-amell-76110#lg=imagenes&slide=0",
  birthday: "1981-05-08"
}

let actorId

const actorUpdate = {
  firstName: 'Chris',
}

//! test del post
test("POST -> 'BASE_URL',should return status code 201, and res.body to be defined, res.body.firstName === actors.firstName", async () => {

  const res = await request(app).post(BASE_URL).send(actors)

  actorId = res.body.id
    
  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actors.firstName)
})

//! test del getAll
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async () => {

    const res = await request(app).get(BASE_URL)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)

    expect(res.body[0].movies).toBeDefined()
    expect(res.body[0].movies).toHaveLength(0)
  })
  
  //! test getOne
  test("GET -> 'BASE_URL/:id' should return status code 200, and res.body.firstName === actors.firstName", async () => {
    const res = await request(app).get(`${BASE_URL}/${actorId}`);
  
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(actors.firstName);
    expect(res.body.id).toBe(actorId);

    expect(res.body.movies).toBeDefined()
    expect(res.body.movies).toHaveLength(0)
  });
  
  
  //! test del update
  test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.firstName to be actorUpdate.firstName ", async () => {
    const res = await request(app).put(`${BASE_URL}/${actorId}`).send(actorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
    expect(res.body.id).toBe(actorId)
  })
  
  
  //! test del remove
  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${BASE_URL}/${actorId}`)
  
    expect(res.statusCode).toBe(204)
  })