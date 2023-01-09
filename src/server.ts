import { app } from './app';
import { mongodbConnect } from './config/mongodb-connect';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async() => {
    mongodbConnect().then(()=>{
        console.clear();
        app.listen(port, () => console.log(`***Connected and listen port ${3000}***`));
    }).catch((err) => {
        console.log(err);
    });
}

startServer();



