import mongoose from 'mongoose';

const connectDB = async () => {
     try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMONGODB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error : ",error);
        process.exit(1);
    }
}

export default connectDB;