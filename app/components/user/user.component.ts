import { Request, Response } from 'express';
import {DefaultAPIClass} from "../api";
import { Users } from './user.model';
import { Skills } from '../skills/skills.model';
import { Socials } from '../social_links/social_links.model';
import { Languages } from '../languages/languages.model';

export class UserController extends DefaultAPIClass{
    addUser = (req: Request, res: Response) => {
        let createUser = new Users(req.body);
        createUser.save((err, user) => {
            if (err) {
                res.status(500).send(this.errorObject(err, 500));
                return false;
            }
            res.status(201).send();
        });
    };
    getUser = (req: Request, res: Response) => {
        Users.findById(req.params.id)
            .populate({path: 'skills', model: Skills, select: 'title level'})
            .populate({path: 'languages', model: Languages, select: 'title level'})
            .populate({path: 'socialLinks', model: Socials, select: 'ico url show'})
            .exec((err, user) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!user){
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.json(this.successObject(user));
            }
        });
    };
    getMyUser = (req: Request, res: Response) => {
        Users.findOne({'isMy': true})
            .populate({path: 'skills', model: Skills, select: 'title level'})
            .populate({path: 'languages', model: Languages, select: 'title level'})
            .populate({path: 'socialLinks', model: Socials, select: 'ico url show'})
            .exec((err, user) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!user){
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.json(this.successObject(user));
            }
        });
    };

    updateUser = (req: Request, res: Response) => {
        Users.findById(req.params.id)
            .exec((err, user) => {
                if (err) {
                    res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                    return false;
                } else {
                    if (!user){
                        res.status(404).send(this.errorObject("User not found", 404));
                        return false;
                    }
                    user = Object.assign(user, req.body);
                    user.save((err, user) => {
                        if (err) {
                            res.status(500).send(this.errorObject(err, 500));
                            return false;
                        }
                        res.status(201).send();
                    });
                }
            });
    };
}