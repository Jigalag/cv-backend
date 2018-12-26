import {Router} from 'express';
import {FileController} from "./file.component";

export class FileRouters {
    router: Router;

    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public fileController: FileController = new FileController();


    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/upload', this.fileController.saveFile);
        this.router.get('/:id', this.fileController.getFileById);
        this.router.delete('/:id', this.fileController.removeFileById);
    }

}

// Create the UserRouter, and export its configured Express.Router
const fileRouter = new FileRouters();
fileRouter.init();

export default fileRouter.router;