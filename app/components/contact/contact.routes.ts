import {Router} from 'express';
import {ContactController} from './contact.component';

export class ContactRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public contactController: ContactController = new ContactController();

    init() {
        this.router.post('/:id', this.contactController.createUserContact);
        this.router.get('/user/:id', this.contactController.getUserContacts);
        this.router.get('/my', this.contactController.getMyContacts);
        this.router.put('/:id', this.contactController.updateContact);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
*/
const contactRouter = new ContactRouters();
contactRouter.init();

export default contactRouter.router;