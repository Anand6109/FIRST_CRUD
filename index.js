const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(res => {
        console.log('Mongo connection is succefull !')
    })
    .catch(err => {
        console.log('Mongo database you got error:', err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const cats = ['fruit', 'vegetable', 'dairy', 'fungi'];

app.get('/products/new', async (req, res) => {
    res.render('products/new.ejs', { cats });
})

app.post('/products', async (req, res) => {

    const newProduct = new Product(req.body);
    newProduct.save();
    console.log(req.body)
    console.log("data saved succesully")
    res.redirect(`/products/${newProduct._id}`);
    console.log(newProduct._id);

    
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            // If the product with the given ID is not found, handle accordingly
            return res.status(404).send('Product not found');
        }

        console.log(product);
        res.render('products/show.ejs', { product });
    } catch (error) {
        // Handle other errors (e.g., database connection issues)
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index.ejs', { products });
})




// app.get('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);

//         if (!product) {
//             // If the product with the given ID is not found, handle accordingly
//             return res.status(404).send('Product not found');
//         }

//         console.log(product);
//         res.render('products/show.ejs', { product });
//     } catch (error) {
//         // Handle other errors (e.g., database connection issues)
//         console.error('Error fetching product:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs', { product, cats });
    console.log('data edit successfully');
})



app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!!")
})


