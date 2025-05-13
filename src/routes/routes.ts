import { Router, Request, Response } from "express";
import { MainClass } from "../main-class";

export const configureRoutes = (router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
    let mainClass = new MainClass();
    res.status(200).send('Hello World!')
    });

    return router;
}

