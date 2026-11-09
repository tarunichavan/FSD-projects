import fs from 'fs'; 
const data='Hello,this is a sample text to demonstrate file operation in node.js';
console.log(1);
fs.writeFile("Sample.txt",data,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log("create asynchronous file");
    fs.readFile("Sample.txt","utf-8",(err,data)=>{
        if (err) throw err;
        console.log(data);
        const a="\nfile system created";
        fs.appendFile("Sample.txt",a,(err)=>{
            if (err) throw err;
            console.log("this is a append file in Asynchronous");
        });
    });
});
console.log(2);
console.log('The end of fileOps');