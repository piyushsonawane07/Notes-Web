const mongoose = require('mongoose');

//create connection with db
const connect = () => {
    mongoose.connect("mongodb://localhost:27017/notebookDB",()=>{
        console.log("Connected to mongo Successfully !");
    });
}

module.exports = connect

