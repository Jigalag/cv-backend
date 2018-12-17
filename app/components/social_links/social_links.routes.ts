import {Router} from 'express';
import {SocialController} from './social_links.component';

export class SocialRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public socialController: SocialController = new SocialController();

    init() {
        this.router.get('/:id', this.socialController.getSocials);
        this.router.post('/', this.socialController.addSocialToUser);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
 */
const socialRouters = new SocialRouters();
socialRouters.init();

export default socialRouters.router;