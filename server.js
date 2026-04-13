require('dotenv').config();
console.log('✅ Dotenv configured');
const app = require('./src/app');
console.log('✅ App loaded');
const connectDB = require('./src/config/db');
console.log('✅ Database config loaded');

const PORT = process.env.PORT || 3000;

// Connect to Database and Start Server
connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Error: Port ${PORT} is already in use.`);
            } else {
                console.error(`❌ Server Error: ${error.message}`);
            }
            process.exit(1);
        });
    })
    .catch((error) => {
        console.error(`❌ Startup Error: ${error.message}`);
        process.exit(1);
    });

