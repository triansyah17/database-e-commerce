require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
// const createError = require('http-errors')
const db = require('./queries')
const port = 3000

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// app.all('*', (req, res, next) => {
//   next(new createError.NotFound())
// })
// app.use((err,req,res)=>{
//   const messageError = err.message || "internal server error"
//   const statusCode = err.status || 500

//   res.status(statusCode).json({
//     message : messageError
//   })

// })

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

//products
app.get('/products', db.getProducts)
app.get('/products/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/products/:id', db.updateProduct)
app.delete('/products/:id', db.deleteProduct)

//category
app.get('/category', db.getCategory)
app.get('/category/:id', db.getCategoryById)
app.post('/category', db.createCategory)
app.put('/category/:id', db.updateCategory)
app.delete('/category/:id', db.deleteCategory)

//Transaction (trans)
app.get('/transaction', db.getTrans)
app.get('/transaction/:id', db.getTransById)
app.post('/transaction', db.createTrans)
app.put('/transaction/:id', db.updateTrans)
app.delete('/transaction/:id', db.deleteTrans)

app.listen(port, () => {
    console.log(`http://localhost:${port}/products`)
})