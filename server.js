const express = require('express');
const mongoose = require('mongoose');
const app =express();
const Product = require('./models/productModels');

//This is middleware for our app to listern to json middleware
app.use(express.json());
app.use(express.urlencoded({
    extended:false,
}))

app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

//Remove or delete a product from Database 
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id,req.body);
        if (!product) {
            return res.status(404).json({message:`cannot find product with the given ide : ${id}`})
            
        }

        
    } catch (error) {
        res.status(505).json({message:`cannot find the given ide ${id}`})
        
    }
})

//Get Data from Database
app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})

//Update and Edit In database
app.put('/products/:id',async(req,res)=>{
    try {
    const {id}=req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);
    if (!product) {
        return res.status(404).json({message : `cannot find Product with given id ${id}`})
        
    }
    const updatedProduct=await Product.findById(id);
    res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }

})


//Get single Product from Database
app.get('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})


app.get('/blog',(req,res)=>{
    res.send('Hello Node API blog, My name is Sarvesh')
})

// With this we can access the data sent to the database
app.post('/products',async(req,res)=>{
    

    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status((500).json({message: error.message}))
        
    }
})



// https://youtu.be/9OfL9H6AmhQ

mongoose.set("strictQuery",false);

mongoose.connect('mongodb+srv://admin:v2bEixfFQ17KM3zM@devapi.bbjmnx2.mongodb.net/Node-API?retryWrites=true&w=majority').then(()=>{
    app.listen(3000,()=> {
        console.log('Connected to Database');
        console.log('Node Api running on port 3000');
        
    });
    
}).catch(()=>{
    console.log(error);
})

// 42:27