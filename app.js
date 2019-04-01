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

app.get('/cipher',(req,res)=>{
    const{text,shift}=req.query;
    if(!text){
        return res.status(400).send('text= is required');
    }
    if(!shift){
        return res.status(400).send('shift= is required');
    }

    const caesarshift=parseFloat(shift);

    if(Number.isNaN(caesarshift)){
        return res.status(400).send('shift= needs to be an integer');
    }

    const code = text.split('').map(letter =>{
        let temp = letter.charCodeAt(0);
        if(!((temp>=65 && temp<=90) ||(temp>=97 && temp<=122))){
            return letter;
        }
        let value=0;
        if(temp>=97){
            value = temp-97;
        }
        else{
            value = temp-65;
        }
        value =value +Number(shift);
        if(value>=26){
            value =value%26;
        }
        if(temp>=97){
            temp=97;
        }
        else{
            temp=65;
        }
        const ans = String.fromCharCode(temp+Number(value));
        return ans;
        

    }).join('');
    res.status(200).send(code);
});

app.get('/lotto',(req,res)=>{
    const {number}=req.query;

    if(!number){
        return res.status(200).send("please give lotto numbers");
    }

    if(!Array.isArray(number)){
        return res.status(200).send("numbers must be an array");
    }

    const list = number.map(i =>parseInt(i))
                    .filter(i=>!Number.isNaN(i) && (i>=1 && i<=20));
    
    if(list.length!=6){
        return res.status(400).send("numbers have to contain 6 integers between 1 and 20");
    }

     // here are the 20 numbers to choose from
  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !list.includes(n));

  let ans;

  switch(diff.length){
    case 0: 
      ans = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      ans = 'Congratulations! You win $100!';
      break;
    case 2:
      ans = 'Congratulations, you win a free ticket!';
      break;
    default:
      ans = 'Sorry, you lose';  
  }

  res.status(200).send(ans);


});

app.listen(8000, () => {
    console.log('This is the server we want to use');
});