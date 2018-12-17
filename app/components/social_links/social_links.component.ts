import { Request, Response } from 'express';
import {DefaultAPIClass} from "../api";
import { Socials } from './social_links.model';
import { Users } from '../user/user.model';

export class SocialController extends DefaultAPIClass{
    getSocials = (req: Request, res: Response) => {
        Socials.find({'userId': req.params.id}, (err, item) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!item){
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.status(200).send(this.successObject(item));
            }
        });
    };
    addSocialToUser = (req: Request, res: Response) => {
        Users.findById(req.body['userId'], (err, user) => {
            if (err || !user) {
                res.status(404).send(this.errorObject('User not found.', 404));
                return false;
            }
            if(user){
                let createSocial = new Socials({
                    ico: req.body.ico,
                    url: req.body.url,
                    show: true,
                    userId: user._id
                });
                createSocial.save((err, social) => {
                    if (err) {
                        res.status(500).send(this.errorObject(err, 500));
                        return false;
                    }
                    if (user.socialLinks.indexOf(social._id) === -1) {
                        user.socialLinks.push(social._id);
                    }
                    user.save((err, user) => {
                        if (err) {
                            res.status(500).send(this.errorObject(err, 500));
                            return false;
                        }
                        res.status(200).send(this.successObject('Social link successfully added'));
                    });
                });
            }
        });
    };
}