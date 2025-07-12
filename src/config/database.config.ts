import mongoose from 'mongoose';
import serverConfig from '@config/server.config';
const { MONGODB_URL, DB_NAME } = serverConfig;

// Connect to MongoDB
const connectDB = async (): Promise<typeof mongoose> => {
    try {
        const mongoUrl = `${MONGODB_URL}${DB_NAME}`;
        const connection = await mongoose.connect(mongoUrl);
        console.log(`MongoDB Connected on URL: ${mongoUrl} `);
        return connection;
    } catch (error: any) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default {
    connectDB,
};
