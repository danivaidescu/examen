require('dotenv').config({})



const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sample.db',
    define: {
      timestamps: false
    }
  })
  
//  let sequelize

// if (process.env.NODE_ENV === 'development') {
// 	sequelize = new Sequelize({
// 		dialect: 'sqlite',
// 		storage: 'sample.db'
// 	})	
// } else {
// 	sequelize = new Sequelize(process.env.DATABASE_URL, {
// 		dialect: 'postgres',
// 		protocol: 'postgres',
// 		dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     }
// 	})
// }


const Movie = sequelize.define('movie', {
    //id: Sequelize.INTEGER, // primary key
    title: Sequelize.STRING,
    category : {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['horror', 'comedy', 'drama']
    },
    publicationDate: Sequelize.DATE

})

const Crewmember = sequelize.define('crewmember', {
    //id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['DIRECTOR', 'ACTOR', 'JANITOR']
    }  
})

Movie.hasMany(Crewmember)

const app = express()
app.use(cors())
//app.use(cors())
app.use(bodyParser.json())

app.get('/sync', async (req, res) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.findAll({include: Crewmember})
    res.status(200).json(movies)
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.post('/movies', async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk === 'on') {
      await Movie.bulkCreate(req.body)
      res.status(201).json({ message: 'created' })
    } else {
      await Movie.create(req.body)
      res.status(201).json({ message: 'created' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {include: Crewmember})
    if (movie) {
      res.status(200).json(movie)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.put('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id)
    if (movie) {
      await movie.update(req.body, { fields: ['title', 'category', 'publicationDate'] })
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, { include: Crewmember })
    if (movie) {
      await movie.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/movies/:mid/crewmembers', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      const crewmembers = await movie.getCrewmembers()

      res.status(200).json(crewmembers)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/movies/:mid/crewmembers/:cid', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.bid)
    if (movie) {
      const crewmembers = await book.getCrewmembers({ where: { id: req.params.cid } })
      res.status(200).json(chapters.shift())
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.post('/movies/:mid/crewmembers', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      const crewmember = req.body
      crewmember.movieId = movie.id
      console.warn(crewmember)
      await Crewmember.create(crewmember)
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.put('/movies/:mid/crewmembers/:cid', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.mid)
    if (movie) {
      const crewmembers = await book.getCrewmembers({ where: { id: req.params.cid } })
      const crewmember = crewmembers.shift()
      if (crewmember) {
        await Crewmember.update(req.body)
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.delete('/movies/:mid/crewmembers/:cid', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.bid)
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ where: { id: req.params.cid } })
      const crewmember = crewmembers.shift()
      if (crewmember) {
        await crewmember.destroy(req.body)
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

// app.listen(process.env.PORT, async ()=>{
//     await sequelize.sync({alter: true})
// })

 app.listen(8080)
