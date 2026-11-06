
const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db

async function connectDB() {
    try {
        await client.connect()
        db = client.db('words2voice')
        console.log('MongoDB connected!')
    } catch (err) {
        console.log('MongoDB connection failed:', err.message)
    }
}

connectDB()

// PAGES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})

app.get('/bank', (req, res) => {
    res.sendFile(__dirname + '/bank.html')
})

app.get('/myAccount', (req, res) => {
    res.sendFile(__dirname + '/myAccount.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

// GET CATEGORIES
app.get('/api/categories', async (req, res) => {
    if (!db) return res.status(503).send('Database unavailable')

    try {
        const categories = await db.collection('categories').find().toArray()
        res.json(categories)
    } catch (err) {
        res.status(500).send('Could not load categories')
    }
})

// SAVE CATEGORY
app.post('/api/categories', async (req, res) => {
    if (!db) return res.status(503).send('Database unavailable')

    try {
        const categoryName = req.body.categoryName?.trim()

        if (!categoryName) {
            return res.status(400).send('Category name required')
        }

        await db.collection('categories').insertOne({
            categoryName: categoryName
        })

        res.redirect('/bank')
    } catch (err) {
        res.status(500).send('Could not save category')
    }
})

// GET WORDS
app.get('/api/words', async (req, res) => {
    if (!db) return res.status(503).send('Database unavailable')

    try {
        const words = await db.collection('words').find().toArray()
        res.json(words)
    } catch (err) {
        res.status(500).send('Could not load words')
    }
})

// SAVE WORD
app.post('/api/words', async (req, res) => {
    if (!db) return res.status(503).send('Database unavailable')

    try {
        const word = req.body.wordOrPhrase?.trim()
        const category = req.body.Categories

        if (!word || !category) {
            return res.status(400).send('Word and category required')
        }

        await db.collection('words').insertOne({
            word: word,
            category: category
        })

        res.redirect('/bank')
    } catch (err) {
        res.status(500).send('Could not save word')
    }
})

// START SERVER
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Words2Voice running on port ${PORT}`)
})

