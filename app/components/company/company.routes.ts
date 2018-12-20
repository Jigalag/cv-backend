import {Router} from 'express';
import {CompanyController} from './company.component';

export class CompanyRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public userController: CompanyController = new CompanyController();

    init() {
        this.router.post('/:id', this.userController.createUserCompany);
        this.router.get('/user/:id', this.userController.getUserCompanies);
        this.router.get('/my', this.userController.getMyCompanies);
        this.router.get('/:id', this.userController.getCompany);
        this.router.put('/:id', this.userController.updateCompany);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
*/
const companyRouter = new CompanyRouters();
companyRouter.init();

export default companyRouter.router;