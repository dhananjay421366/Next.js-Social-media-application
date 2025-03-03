import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number
}
const connection: connectionObject = {};

const MONGODB_URL = "mongodb+srv://dhanu:dhanu1232@cluster0.zezyv.mongodb.net"
async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log(`Already connected to database`);
        return
    }
    try {
        const db = await mongoose.connect(MONGODB_URL || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully");

    } catch (error) {
        console.log("Error to connection database", error);
        process.exit(1);

    }

}
export default dbConnect