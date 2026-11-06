
const path = require('path')
const { ObjectId } = require('mongodb')

module.exports = function (app, db) {

    // LOGIN - DEMO REDIRECT ONLY
    app.post('/login', (req, res) => {
        res.redirect('/home')
    })

    // HOME DASHBOARD
    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, 'maindashboard.html'))
    })

    // WORD BANK PAGE
    app.get('/bank', (req, res) => {
        res.sendFile(path.join(__dirname, 'bank.html'))
    })

    // MY ACCOUNT PAGE
    app.get('/myAccount', (req, res) => {
        res.sendFile(path.join(__dirname, 'myAccount.html'))
    })

    // SIGN UP PAGE
    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, 'signup.html'))
    })

    // GET ALL WORDS
    app.get('/api/words', async (req, res) => {
        try {
            const words = await db.collection('words').find().toArray()
            res.json(words)
        } catch (err) {
            console.log(err)
            res.status(500).send('Error loading words')
        }
    })

    // GET ALL CATEGORIES
    app.get('/api/categories', async (req, res) => {
        try {
            const categories = await db.collection('categories').find().toArray()
            res.json(categories)
        } catch (err) {
            console.log(err)
            res.status(500).send('Error loading categories')
        }
    })

    // CREATE WORD OR PHRASE
    app.post('/api/words', async (req, res) => {
        try {
            const wordOrPhrase = req.body.wordOrPhrase?.trim()
            const category = req.body.category || req.body.Categories

            if (!wordOrPhrase || !category) {
                return res.status(400).send('Word and category required')
            }

            await db.collection('words').insertOne({
                wordOrPhrase: wordOrPhrase,
                category: category
            })

            res.redirect('/bank')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error saving word')
        }
    })

    // UPDATE WORD OR PHRASE
    app.post('/api/words/edit', async (req, res) => {
        try {
            const wordOrPhrase = req.body.wordOrPhrase?.trim()
            const category = req.body.category || req.body.Categories

            if (!ObjectId.isValid(req.body.id)) {
                return res.status(400).send('Invalid word ID')
            }

            if (!wordOrPhrase || !category) {
                return res.status(400).send('Word and category required')
            }

            await db.collection('words').updateOne(
                { _id: new ObjectId(req.body.id) },
                {
                    $set: {
                        wordOrPhrase: wordOrPhrase,
                        category: category
                    }
                }
            )

            res.redirect('/bank')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error editing word')
        }
    })

    // DELETE WORD OR PHRASE
    app.post('/api/words/delete', async (req, res) => {
        try {
            if (!ObjectId.isValid(req.body.id)) {
                return res.status(400).send('Invalid word ID')
            }

            await db.collection('words').deleteOne({
                _id: new ObjectId(req.body.id)
            })

            res.redirect('/bank')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error deleting word')
        }
    })

    // CREATE CATEGORY
    app.post('/api/categories', async (req, res) => {
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
            console.log(err)
            res.status(500).send('Error saving category')
        }
    })

    // VIEW CATEGORY
    app.get('/bank/category/:category', (req, res) => {
        const category = req.params.category

        res.send(`Category: ${category}`)
    })

    // SAVE ACCOUNT PROFILE
    app.post('/api/profile', async (req, res) => {
        try {
            await db.collection('profiles').insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                childName: req.body.childName,
                birthdate: req.body.birthdate,
                communication: req.body.communication
            })

            res.redirect('/myAccount')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error saving profile')
        }
    })

}


