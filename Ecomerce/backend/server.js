const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to UNCAUGHT EXCEPTION`);

    process.exit(1);
})

//config
dotenv.config({path:"backend/config/config.env"});

//Connecting the database
connectDatabase()

const server = app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});


//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to UNHANDED PROMISE REJECTION`);

    server.close(()=>{
        process.exit(1);
    });
});