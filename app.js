
const express=require('express');
const app=express();
// console.log(routes.SomeText);
app.use((req, res, next)=>{
    console.log('in the middleware');
    next();  // This allows the request to continue to the next middleware in line.
});
app.use((req, res, next)=>{
    console.log('in the another middleware');
   res.send('<h1> Hello from EXpress </h1>');
});

app.listen(3000);
 