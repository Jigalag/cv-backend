import { Request, Response } from 'express';
import {File} from "./file.model";
import {DefaultAPIClass} from "../api";

export class FileController extends DefaultAPIClass{
    /**
     * Save file
     * @param req
     * @param res
     */
    saveFile = (req: Request, res: Response) => {
        if (Object.keys(req['files']).length == 0) {
            res.status(400).send(this.errorObject('No files were uploaded', 400));
            return false;
        }
        let reqFile = req['files'].file;
        let filePlace = 'app/uploads/' + new Date().getFullYear() + '/image-' + new Date().getTime() + '-' + req['files'].file.name;

        reqFile.mv(filePlace, (err) => {
            if (err) {
                res.status(500).send(this.errorObject(err, 500));
                return false;
            }
            let createFile = new File({
                path: req.protocol + '://' + req.get('host') + '/' + filePlace
            });
            createFile.save((err, file) => {
                if (err) {
                    res.status(500).send(this.errorObject(err, 500));
                    return false;
                }
                res.status(200).send(this.successObject({
                    url: file['path']
                }));
            });
        });
    };

    /**
     * Get file by id
     * @param req
     * @param res
     */
    getFileById = (req: Request, res: Response) => {
        File.findById(req.params.id, (err, file) => {
            if (err || !file) {
                res.status(404).send(this.errorObject(err, 404));
                return false;
            }
            res.send(this.successObject(file));
        });
    };

    /**
     * Remove file by id
     * @param req
     * @param res
     */
    removeFileById = (req: Request, res: Response) => {
        File.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
            if (err || !user) {
                res.status(404).send(this.errorObject(err, 404));
                return false;
            }
            res.status(204).send();
        });
    };

}