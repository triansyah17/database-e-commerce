const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT
})

const getProducts = (request, response) => {
  let searchName = request.query.searchName;
  if (searchName == undefined) {
    searchName = ''
  }
  let sort = request.query.sort;
  let sortby = request.query.sortby;

  // console.log(sort + sortby)
    if(sortby == undefined) {
      sortby = 'id'
    }
    if(sort == undefined) {
      sort = 'asc'
    }
    
  let sql = `SELECT * FROM products WHERE name LIKE $1 ORDER BY ${sortby} ${sort}`;
  console.log(sql);
  // SELECT * FROM products ORDER BY id as
    pool.query(sql, [`%${searchName}%`], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createProduct = (request, response) => {
    const { name, stock, price, category_id } = request.body
    // INSERT INTO products (name, stock, price, category_id) VALUES ('biskuat', 10, 20000, 2)
    let sql = 'INSERT INTO products (name, stock, price, category_id) VALUES ($1, $2, $3, $4)'
    pool.query(sql, [name, stock, price, category_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send('Product added')
    })
  }

  const getProductById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
        response.status(200).send(results.rows);
    })
}

  const updateProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, stock, price, category_id } = request.body

    pool.query('UPDATE products SET name = $1, stock = $2, price = $3, category_id = $4 WHERE id = $5', [name, stock, price, category_id, id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(201).send('Product updated')
    })
  }
  const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id);
    // const { name, stock, price, category_id } = request.body
    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
        response.status(200).send('product deleted');
    })
}


//Category
const getCategory = (request, response) => {
  pool.query('SELECT * FROM category ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getCategoryById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM category WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
      response.status(200).send(results.rows);
  })
}

const createCategory = (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO category (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('Category added')
  })
}

const updateCategory = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, category_id  } = request.body

  pool.query('UPDATE category SET name = $1 WHERE id =$2', [name, id], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send('Category updated')
  })
}
const deleteCategory = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM category WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
      response.status(200).send('category deleted');
  })
}

//Transaction (trans)
const getTrans= (request, response) => {
  pool.query('SELECT * FROM transaction ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTransById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM transaction WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
      response.status(200).send(results.rows);
  })
}

const createTrans = (request, response) => {
  const { quantity, total, products_id } = request.body

  pool.query('INSERT INTO transaction (quantity, total, products_id) VALUES ($1, $2, $3)', [quantity, total, products_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('New Transaction added')
  })
}

const updateTrans = (request, response) => {
  const id = parseInt(request.params.id);
  const { quantity, total, products_id } = request.body

  pool.query('UPDATE transaction SET quantity = $1, total = $2, products_id = $3 WHERE id = $4', [quantity, total, products_id, id], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send('Transaction updated')
  })
}
const deleteTrans = (request, response) => {
  const id = parseInt(request.params.id);
  // const { name, stock, price, category_id } = request.body
  pool.query('DELETE FROM transaction WHERE id = $1', [id], (error, results) => {
    if (error) {
        throw error
    }
      response.status(200).send('transaction deleted');
  })
}

  module.exports = {
    // products
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,

    // category
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,

    // transaction
    getTrans,
    getTransById,
    createTrans,
    updateTrans,
    deleteTrans
  }