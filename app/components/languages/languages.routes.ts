import {Router} from 'express';
import {LanguagesController} from './languages.component';

export class LanguagesRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public languagesController: LanguagesController = new LanguagesController();

    init() {
        this.router.get('/:id', this.languagesController.getLanguages);
        this.router.post('/', this.languagesController.addLanguageToUser);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
*/
const languagesRouters = new LanguagesRouters();
languagesRouters.init();

export default languagesRouters.router;