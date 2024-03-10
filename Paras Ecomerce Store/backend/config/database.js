const mongoose = require("mongoose");

const connectDatabase = ( )=>{
    mongoose.connect(process.env.DB_URL,{}).then((data)=>{
        console.log(`Mongodb connectd with server: ${data.connection.jost}`)
    });
};

module.exports = connectDatabase;