const express = require('express');

const app = express();

app.get('/sum',(req,res)=>{
    const{a,b}=req.query;

    if(!a){
        return res.status(400).send('Please provide a value for a');
    }
    if(!b){
        return res.status(400).send('Please provide a value for b');
    }

    const x = parseFloat(a);
    const y = parseFloat(b);

    if(Number.isNaN(x)){
        return res.status(400).send('Please input a number for first argument');
    }

    if(Number.isNaN(y)){
        return res.status(400).send('Please input a number for the second argument');
    }

    const ans = x+y;
    const str = `${x}+${y}=${ans}`

    res.status(200).send(str);
});

app.listen(8000, () => {
    console.log('This is the server we want to use');
});