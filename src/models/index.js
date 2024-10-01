const Movie = require('./Movie')
const Actor = require('./Actor')
const Genre = require('./Genre')
const Director = require('./Director')

Movie.belongsToMany(Genre, { through: 'genreMovie' })
Genre.belongsToMany(Movie, { through: 'genreMovie' })

Movie.belongsToMany(Actor, { through: 'actorMovie' })
Actor.belongsToMany(Movie, { through: 'actorMovie' })

Movie.belongsToMany(Director, { through: 'directorMovie' })
Director.belongsToMany(Movie, { through: 'directorMovie' })