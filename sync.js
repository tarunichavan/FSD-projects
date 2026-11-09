import fs from "fs";

const readData = fs.readFileSync("hello.txt",'UTF-8');
console.log(readData);
fs.appendFileSync("hello.txt","\nThis is append",'UTF-8');
const updatedData=fs.readFileSync("hello.txt",'UTF-8');
console.log(updatedData);
fs.unlinkSync("hello.txt");
console.log(1);
fs.readFile("hello.txt",'UTF-8',(error,readData)=>{
    if(error){
        return console.log(error);
    }
    console.log(readData);
});
console.log(2);
console.log("The end of file ops");