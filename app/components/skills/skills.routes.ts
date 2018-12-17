import {Router} from 'express';
import {SkillsController} from './skills.component';

export class SkillsRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public skillsController: SkillsController = new SkillsController();

    init() {
        this.router.get('/:id', this.skillsController.getSkills);
        this.router.post('/', this.skillsController.addSkillToUser);
    }

}

/**
 *  Create the UserRouter, and export its configured Express.Router
*/
const skillsRouters = new SkillsRouters();
skillsRouters.init();

export default skillsRouters.router;