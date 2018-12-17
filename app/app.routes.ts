import {Router, Request, Response, NextFunction} from 'express';

export class AppRouters {
    router: Router;

    /**
     * Initialize the AppRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {

    }

    init() {
        this.router.get('/', this.getAll);
    }

}

const appRouter = new AppRouters();
appRouter.init();

export default appRouter.router;