import {Router} from 'express';
import {UserController} from './user.component';

export class UserRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public userController: UserController = new UserController();

    init() {
        this.router.post('/', this.userController.addUser);
        this.router.get('/:id', this.userController.getUser);
        this.router.get('/', this.userController.getMyUser);
        this.router.put('/:id', this.userController.updateUser);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
*/
const userRouter = new UserRouters();
userRouter.init();

export default userRouter.router;