
const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 8090

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// STATIC FILES
app.use(express.static(__dirname))

// LOGIN PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// TEMPORARY DEMO LOGIN
app.post('/login', (req, res) => {
    res.redirect('/home')
})

// HOME PAGE
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'))
})

// WORD BANK
app.get('/bank', (req, res) => {
    res.sendFile(path.join(__dirname, 'bank.html'))
})

// MY ACCOUNT
app.get('/myAccount', (req, res) => {
    res.sendFile(path.join(__dirname, 'myAccount.html'))
})

// SIGN UP
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'))
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
app.listen(PORT, () => {
    console.log(`Words2Voice running on port ${PORT}`)
})

