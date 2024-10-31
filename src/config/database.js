const mongoose = require('mongoose');


const connectDB = async ()=> {
    await mongoose.connect(
        "mongodb+srv://vaisakhrajeevv:r4wG9Xi7Ayd34WvS@namastenode.27pxc.mongodb.net/devTinder"
    );
};
module.exports = connectDB;



