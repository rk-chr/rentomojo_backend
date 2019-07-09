import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import signupController from './src/controllers/Signup';
import loginController from './src/controllers/Login';
import redis from './src/redis/config';


const app = express();

app.use(cors());

app.set('redis', redis);

// parsing the request bodys
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/signup', signupController);
app.post('/login', loginController);


const port = 3002;

app.listen(
    port,
    () => console.log(`Comment-pro listening on port ${port}!`),
);


export default app;
