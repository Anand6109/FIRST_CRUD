const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(res => {
        console.log('Mongo connection is succefull !')
        return Product.find()
    })

    .then(allproduts => {
        console.log('your dadda::', allproduts)
    })
    .catch(err => {
        console.log('you got error:', err)
    })


const insertProducts = [
    {
        name: 'hat',
        price: 7.35,
        category: 'dairy'
    },
    {
        name: 'balls',
        price: 9.98,
        category: 'fruit'
    },
    {
        name: 'veg',
        price: 9.65,
        category: 'vegetable'
    },
]

Product.insertMany(insertProducts)
    .then(res => {
        console.log("your data:", allproducts);
    })
    .catch(err => {
        console.log("you got error", err)
    })

