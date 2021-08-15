const express = require('express')
const app = express()
const port = 7000
const cors = require('cors')

const productsJSON = require('./route/json/products.json');
const commentsJSON = require('./route/json/comments.json');

app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {
    console.log(productsJSON.products)
    res.send(productsJSON.products);
})

app.get('/comments', (req, res) => {
    res.status(200).send("Need ID comment")
})

app.post('/comments', (req, res) => {
    const result = [];

    console.clear()
    const id = req.body.id;
    console.log("id: ",id)

    commentsJSON.forEach(item => {
        if(item.productId == id){
            result.push(item)
        }
    })

    res.status(200).send(JSON.stringify(result))
})

app.post('/new/product', (req, res) => {
    console.clear()
    console.log("req.body: ",req.body)

    const max = Math.max.apply(null, productsJSON.products.map(item => item.id));

    const {img, name, count, height, width, weight, comment} = req.body.data

    const newProduct = {
        id: max + 1,
        imgUrl: img,
        name,
        count: +count,
        size: {
            height: +height,
            width: +weight
        },
        weight: +weight,
        comment
    }

    productsJSON.products.push(newProduct)

    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
