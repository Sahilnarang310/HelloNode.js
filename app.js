
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const AdminRoutes=require('./routes/admin.js')
const shopRoutes=require('./routes/shop.js')

app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin', AdminRoutes);
app.use(shopRoutes)


// app.use('/add-product',(req, res, next)=>{
//     // console.log('in the another middleware');
//    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit"> Add Product</button></form>');
// });
// app.post/*post/get*/('/product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// })


// app.use('/',(req, res, next)=>{
//     console.log('in the another middleware');
//    res.send('<h1> Hello from Express </h1>');
// });


app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>');
})

app.listen(3000);
 