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

    public companyController: CompanyController = new CompanyController();

    init() {
        this.router.post('/:id', this.companyController.createUserCompany);
        this.router.get('/user/:id', this.companyController.getUserCompanies);
        this.router.get('/my', this.companyController.getMyCompanies);
        this.router.get('/:id', this.companyController.getCompany);
        this.router.put('/:id', this.companyController.updateCompany);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
*/
const companyRouter = new CompanyRouters();
companyRouter.init();

export default companyRouter.router;