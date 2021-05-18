const express = require('express');
const bodyParser = require('body-Parser')
const MongoClient = require('mongodb').MongoClient;

const app = express();
// const mongoDB = MongoClient();

MongoClient.connect('mongodb+srv://myClusterDB:YEP@myClusterDB1@cluster0.rpp4n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {

    console.log('Connected to Database')
    const db = client.db('blogs');
    const blogCollection = db.collection('blog1');


    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'))


    // app.get('/', (req, res) => {
    //     return res.sendFile(__dirname + '/index.html')
    // })

    app.post('/blog', (req,res) => {
        blogCollection.insertOne(req.body)
            .then(result => {
                // console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    });

    app.get('/', (req, res) => {
        db.collection('blog1').find().toArray()
            .then(results => {
                // console.log(results)
                res.render('index.ejs', {blog1 : results})
            })
            .catch(error => console.error(error))
        // res.render('index.ejs', {})
    });

    app.put('/blog1', (req, res) => {
        blogCollection.findOneAndUpdate(
            {name : 'Divyansh Singh'},
            {
                $set: {
                    name : req.body.name,
                    blog : req.body.blog
                }
            },
            {
                upsert : true
            }
        )
            .then(result => {
                // return console.log(result)
                res.json('Success')
            })
            .catch(error => console.error(error))
    });

    app.delete('/blog1', (req, res) => {
        blogCollection.deleteOne(
            { name: req.body.name }
        )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No blogs to delete')
                }
                res.json('Deleted Div\'s quote')
            })
            .catch(error => console.error(error))
    })

    app.listen(5000, () => {
        console.log('listening on 5000')
    })
}).catch(error => console.error(error))
