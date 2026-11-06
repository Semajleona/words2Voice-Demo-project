/*config/database.js
module.exports = {

    'url': 'mongodb+srv://semajjohnson_db_user:B6uEroRjhTZmMdPW@cluster0.ly7uzpe.mongodb.net/',
    'dbName': 'demo'
};*/
// config/database.js
module.exports = {
    url: process.env.MONGODB_URI,
    dbName: 'words2voice'
}
