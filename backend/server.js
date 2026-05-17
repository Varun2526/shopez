import exp from 'express';
import {config} from 'dotenv';
import {connect} from 'mongoose';

config();
// intialize express
const app = exp();

//parse json is a built in middleware function in express. 
// It parses incoming requests with JSON payloads and is based on body-parser. 
// It is available in express v4.16.0 and higher.
app.use(exp.json());

const connectDB = async () => {
    try {
        await connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');

        // Start the server after successful database connection
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

}
catch (error){
        console.log('Error connecting to MongoDB:', error);
}
};

connectDB();
