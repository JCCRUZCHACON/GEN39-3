require('../models')
const app = require('../app')
const request = require('supertest')


//genreMovie
let genreId
beforeAll(async () => {
  const genres = {
    name: 'action',
  }
const res = await request(app)
    .post('/api/v1/genres')
    .send(genres)
genreId = res.body.id
})
afterAll(async () => {
  await request(app)
    .delete(`/api/v1/genres/${genreId}`)
})

// actorMovie
let actorId
beforeAll(async () => {
  const actors = {
    firstName: "Josue",
    lastName: "Cammpell",
    nationality: "Australia",
    image: "https://www.lavanguardia.com/peliculas-series/images/all/profile/1980/11/30614/w1280/lyUyVARQKhGxaxy0FbPJCQRpiaW.jpg",
    birthday: "1982-07-10"
  }
const res = await request(app)
    .post('/api/v1/actors')
    .send(actors)
actorId = res.body.id
})
afterAll(async () => {
  await request(app)
    .delete(`/api/v1/actors/${actorId}`)
})

//directorMovie
let directorId
beforeAll(async () => {
  const directors = {
    firstName: "William",
    lastName: "Eubank",
    nationality: "American",
    image: "https://www.lavanguardia.com/peliculas-series/images/all/profile/1982/11/125324/w1280/u2px8MjeVsqk4WMqH6MSzSMqrZa.jpg",
    birthday: "1982-11-15"
  }
const res = await request(app)
    .post('/api/v1/directors')
    .send(directors)
directorId = res.body.id
})
afterAll(async () => {
  await request(app)
    .delete(`/api/v1/directors/${directorId}`)
})

//--------------------------------------------------------------

const BASE_URL = '/api/v1/movies'


const movies = {
  name: "Code 8 Part II",
  image: "https://www.lascosasquenoshacenfelices.com/wp-content/uploads/2024/03/codigo-8-parte-2-las-cosas-felices.01-e1709350866821.jpg",
  synopsis: "A girl who fights to seek justice for her brother who was killed by corrupt police officers. She enlists the help of an ex-convict and his ex-boyfriend, but they must face a well-respected and well-protected police sergeant.",
  releaseYear: 2024
}

let movieId

const movieUpdate = {
  name: 'The Fall Guy',
}

//! test del post
test("POST -> 'BASE_URL',should return status code 201, and res.body to be defined, res.body.name === movies.name", async () => {

  const res = await request(app).post(BASE_URL).send(movies)

  movieId = res.body.id
    
  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movies.name)
})

//! test del getAll
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async () => {

    const res = await request(app).get(BASE_URL)

    //console.log(res.body);
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body.length).toBe(1)

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)

    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)

    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)

  })
  
  //! test getOne
  test("GET -> 'BASE_URL/:id' should return status code 200, and res.body.name === movies.name", async () => {
    const res = await request(app).get(`${BASE_URL}/${movieId}`);

    //console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movies.name);
    expect(res.body.id).toBe(movieId);

    expect(res.body.genres).toBeDefined()
    expect(res.body.genres).toHaveLength(0)

    expect(res.body.actors).toBeDefined()
    expect(res.body.actors).toHaveLength(0)

    expect(res.body.directors).toBeDefined()
    expect(res.body.directors).toHaveLength(0)

  });
  
  
  //! test del update
  test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.name to be movieUpdate.name ", async () => {
    const res = await request(app).put(`${BASE_URL}/${movieId}`).send(movieUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
    expect(res.body.id).toBe(movieId)
  })


  //! test del setGenres
  test("POST -> '/movies/:id/genres', should return status code 200, and res.body to be defined", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/genres`)
      .send([genreId])
  
    expect(res.status).toBe(200) 
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(genreId)
  
    expect(res.body[0].genreMovie.genreId).toBeDefined()
    expect(res.body[0].genreMovie.genreId).toBe(genreId)
  })

  //! test del setActors
  test("POST -> '/movies/:id/actors', should return status code 200, and res.body to be defined", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/actors`)
      .send([actorId])
  
    expect(res.status).toBe(200) 
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(actorId)
  
    expect(res.body[0].actorMovie.actorId).toBeDefined()
    expect(res.body[0].actorMovie.actorId).toBe(actorId)
  })

  //! test del setDirectors
  test("POST -> '/movies/:id/directors', should return status code 200, and res.body to be defined", async () => {

    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/directors`)
      .send([directorId])
      
    expect(res.status).toBe(200) 
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(directorId)
  
    expect(res.body[0].directorMovie.directorId).toBeDefined()
    expect(res.body[0].directorMovie.directorId).toBe(directorId)
  })
  
  
  //! test del remove
  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app).delete(`${BASE_URL}/${movieId}`)
  
    expect(res.statusCode).toBe(204)
  })