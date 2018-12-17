import { Request, Response } from 'express';
import {DefaultAPIClass} from "../api";
import { Languages } from './languages.model';
import { Users } from '../user/user.model';

export class LanguagesController extends DefaultAPIClass{
    getLanguages = (req: Request, res: Response) => {
        Languages.find({'userId': req.params.id}, (err, item) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!item){
                    res.status(404).send(this.errorObject("Languages of user not found", 404));
                    return false;
                }
                res.status(200).send(this.successObject(item));
            }
        });
    };
    addLanguageToUser = (req: Request, res: Response) => {
        Users.findById(req.body['userId'], (err, user) => {
            if (err || !user) {
                res.status(404).send(this.errorObject('User not found.', 404));
                return false;
            }
            if(user){
                let createLanguage = new Languages({
                    title: req.body.title,
                    level: req.body.level,
                    userId: user._id
                });
                createLanguage.save((err, language) => {
                    if (err) {
                        res.status(500).send(this.errorObject(err, 500));
                        return false;
                    }
                    if (user.languages.indexOf(language._id) === -1) {
                        user.languages.push(language._id);
                    }
                    user.save((err, user) => {
                        if (err) {
                            res.status(500).send(this.errorObject(err, 500));
                            return false;
                        }
                        res.status(200).send(this.successObject('Language successfully added'));
                    });
                });
            }
        });
    };
}