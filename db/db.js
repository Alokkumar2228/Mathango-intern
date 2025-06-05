// mongodb+srv://alokkumarsingh8002583766:<db_password>@cluster0.fnyihjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//password =cLCmsJgwhZtoJPnA

import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log("db not connect",error);
        
    }
}

export default connectDB