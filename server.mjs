import express from "express"

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
// routes

// errMiddleware

// listener 
app.listen(PORT, ()=>{
    console.log(`Server Run on Port: ${PORT}`);
    
})