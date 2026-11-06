const client = new MongoClient(process.env.MONGODB_URI)
const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
require('dotenv').config()

const app = express()

// MIDDLEWARE
app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MONGODB CONNECTION
const client = new MongoClient(process.env.MONGODB_URI)

async function connectDB() {
    try {
        await client.connect()

        const db = client.db('words2voice')

        // VERIFY DATABASE CONNECTION
        await db.command({ ping: 1 })

        console.log('MongoDB connected!')
        console.log('Database:', db.databaseName)

        // LOAD ROUTES AFTER DATABASE CONNECTS
        require('./routes.js')(app, db)

    } catch (err) {
        console.log('MongoDB connection failed:', err.message)
    }
}

// LOGIN PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// CONNECT TO DATABASE
connectDB()

// START SERVER
const PORT = process.env.PORT || 8080

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Words2Voice running on port ${PORT}`)
})

