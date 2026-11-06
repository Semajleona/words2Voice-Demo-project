const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client = new MongoClient(process.env.MONGODB_URI)

async function connectDB() {
    try {
        await client.connect()

        const db = client.db('words2voice')

        console.log('MongoDB connected!')
    } catch (err) {
        console.log('MongoDB connection failed:', err.message)
    }
}

connectDB()

connectDB()

// LOGIN PAGE
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// HOME PAGE
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})

// WORD BANK
app.get('/bank', (req, res) => {
    res.sendFile(__dirname + '/bank.html')
})

// MY ACCOUNT
app.get('/myAccount', (req, res) => {
    res.sendFile(__dirname + '/myAccount.html')
})

// SIGN UP
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

// API - GET CATEGORIES
app.get('/api/categories', (req, res) => {
    res.json([
        'Colors',
        'Numbers',
        'Feelings',
        'People',
        'Common Phrases'
    ])
})

// API - GET WORDS
app.get('/api/words', (req, res) => {
    res.json([
        { word: 'Water', category: 'Food & Drinks' },
        { word: 'Happy', category: 'Feelings' },
        { word: 'Play', category: 'Activities' }
    ])
})

// START SERVER
app.listen(8090, () => {
    console.log('Words2Voice running on port 8080')
})


