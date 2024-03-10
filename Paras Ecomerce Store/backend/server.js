const app = require("./app");

const dotenv = require("dotenv")

const connectDatabase = require("./config/database")

dotenv.config({path:"backend/config/config.env"});

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})


