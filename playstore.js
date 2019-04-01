const express = require('express');
const store = require('./store.js');

const app = express();

app.get('/apps',(req,res)=>{
    const{sort,genres}=req.query;

    if(genres!==null && ! (genres==='Action'||genres==='Puzzle'||genres==='Strategy'||
    genres==='Casual'||genres==='Arcade'||genres==='Card')){
        res.status(400).send("Please input a valid genre");
    }

    let ans=store;

    if(genres==='Action'||genres==='Puzzle'||genres==='Strategy'||
    genres==='Casual'||genres==='Arcade'||genres==='Card'){
        ans = store.filter(i=>i.Genres.includes(genres));
    }

    if(sort==='rating'){
        ans = ans.sort((a,b)=>(a.Rating<b.Rating)?1:-1)
    }

    if(sort==='app'){
        ans = ans.sort((a,b)=>(a.App>b.App)?1:-1)
    }

    ans = ans.map(i=>{
        return i;
    });

    res.status(200).send(ans);

});

app.listen(8000, () => {
    console.log('This is the server we want to use');
});