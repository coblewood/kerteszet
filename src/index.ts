import { MainClass } from './main-class';
import express, { Request, Response } from 'express';
import { configureRoutes } from './routes/routes';



const app = express();
const port =  5000;

app.use('/app', configureRoutes(express.Router()))

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
});