import cors from "cors";
import express from "express";

import apiRoutes from '@routes';
import { databaseConfig, serverConfig, corsConfig } from "@config";
const { PORT } = serverConfig;
const { connectDB } = databaseConfig;

const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",
        apiRoutes
);

const server = app.listen(PORT, () => {
    console.log(`\nServer is running on port ${PORT}`);
    connectDB();
});

// Handle server errors
server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try a different port.`);
    } else {
        console.error('Server error:', error);
    }
});
