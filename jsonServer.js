import http from 'http';
const students=[];
const server=http.createServer((req,res)=>{
    const{method,url}=req;
    if(method==='POST' && url==='/students'){
        let body="";
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            const newStudent=JSON.parse(body);
            students.push(newStudent);
            res.writeHead(201,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Student added successfully", data:newStudent}));
        });
    }
    else if(method==="GET" && url==='/students'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"Students retrieved successfully", data:students}));
    }
    else if(method==="GET" && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        const student=students.find(s=>s.id===studentId);
        if(student){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Student retrieved successfully", data:student}));
        } else {
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({error:'Student not found'}));
        }
    }
    else if(method==="PUT" && url.startsWith('/students/')){
        const studentId=parseInt(url.split('/')[2]);
        let body="";
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            let updatedStudent;
            try {
                updatedStudent=JSON.parse(body);
            } catch {
                res.writeHead(400,{'Content-Type':'application/json'});
                res.end(JSON.stringify({error:'Request body must contain valid JSON'}));
                return;
            }
            const studentIndex=students.findIndex(s=>s.id===studentId);
            if(studentIndex!==-1){
                students[studentIndex]=updatedStudent;
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"Student updated successfully", data:updatedStudent}));
            } else {
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({error:'Student not found'}));
            }
        });
    }
    else if(method==="DELETE" && url.startsWith('/students/')){
        const studentID=parseInt(url.split('/')[2]);
        const  studentIndex=students.findIndex((s)=>s.id===studentID);
        if(studentIndex!==-1){
            const deletedStudent=students.splice(studentIndex,1);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Student deleted successfully", data:deletedStudent[0]}));
        }
        else{
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({error:'Student not found'}));
        }
    }
    else{
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Route not found"}));
    }
});
server.listen(4000,()=>{
    console.log("Server is running on http://localhost:4000/");
});