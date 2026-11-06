
const path = require('path')
const { ObjectId } = require('mongodb')

module.exports = function (app, db) {

    // TEMPORARY DEMO LOGIN
    app.post('/login', (req, res) => {
        res.redirect('/home')
    })

    // HOME DASHBOARD
    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, 'maindashboard.html')
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

    // GET CATEGORIES
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
            await db.collection('words').insertOne({
                wordOrPhrase: req.body.wordOrPhrase,
                category: req.body.category
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
            await db.collection('words').updateOne(
                { _id: new ObjectId(req.body.id) },
                {
                    $set: {
                        wordOrPhrase: req.body.wordOrPhrase,
                        category: req.body.category
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
            await db.collection('categories').insertOne({
                categoryName: req.body.categoryName
            })

            res.redirect('/bank')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error saving category')
        }
    })



app.get('/bank/category/:category', (req, res) => {
    const category = req.params.category

    // Later, we'll retrieve the words saved
    // under this category from MongoDB.

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

