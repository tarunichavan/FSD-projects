import express from "express";
import fs from 'fs';
import cors from "cors";
import morgan from "morgan";


const patients = [];
const app = express();
const port=5000;
//1.Apllication-level middleware
//4.Third party
app.use(cors());
app.use(morgan("dev"));
//3. built-in middleware for parsing JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Application-level middleware for logging request details
const logger=(req,res,next)=>{
    const start=Date.now();
    res.on("finish",()=>{
        const period=Date.now()-start;
        const log=`${req.method} ${req.originalUrl} ${res.statusCode} - ${period}ms`;
        fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log(err);
        }
});    
    });
    next();
};
//2.Route Specific
const validatePatient=(req,res,next)=>{
    const{name,age,word }=req.body;
    if(!name || !age || !word){
        return res.status(400).json({message:"Invalid patient data"});
    }
    next();
};
app.use(logger);
//CRUD
//POST - Create a new patients URL: http://localhost:6000/api/v1/patients
//payload {name:taruni,age:20,word:ICU}
app.post("/api/v1/patients",validatePatient,(req,res)=>{
    const newPatient=req.body;
    patients.push(newPatient);
    res.status(201).json({message:"Patient created successfully"});  
});
//GET - Read all patients URL: http://localhost:6000/api/v1/patients
app.get("/api/v1/patients",(req,res)=>{
    res.status(200).json({message:"Patients fetched successfully"});
});
//GET - Read patient by ID URL: http://localhost:6000/api/v1/patients/:id
app.get("/api/v1/patients/:id",(req,res)=>{
   const {id}=req.params;
   if(id<1){
    res.statusCode=404;
    throw new Error("Patient not found");
   }res.status(200).json({message:"Patient details fetched successfully"});
});
//PUT - Update patient by ID URL: http://localhost:6000/api/v1/patients/:id
app.put("/api/v1/patients/:id",validatePatient,(req,res)=>{
    const {id}=req.params;
    const {name,age,word}=req.body;
    if(id<1){
        res.statusCode=404;
        throw new Error("Patient not found");
    }
    patients[id-1]={name,age,word};
    res.status(200).json({message:"Patient updated successfully"});
});
//DELETE - Delete patient by ID URL: http://localhost:6000/api/v1/patients/:id
app.delete("/api/v1/patients/:id",(req,res)=>{
    const {id}=req.params;
    if(id<1){
        res.statusCode=404;
        throw new Error("Patient not found");
    }
    patients.splice(id-1,1);
    res.status(200).json({message:"Patient deleted successfully"});
});
//5.Error handling middleware
app.use((err,req,res,next)=>{
    console.error(err.stack);
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({message});
});
//6.Handle 404 errors
app.use((req,res,next)=>{
    res.status(404).json({message:"Resource not found"});
});
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});