import { Request, Response } from 'express';
import {DefaultAPIClass} from "../api";
import { Skills } from './skills.model';
import { Users } from '../user/user.model';

export class SkillsController extends DefaultAPIClass{
    getSkills = (req: Request, res: Response) => {
        Skills.find({'userId': req.params.id}, (err, item) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!item){
                    res.status(404).send(this.errorObject("Skills of user not found", 404));
                    return false;
                }
                res.status(200).send(this.successObject(item));
            }
        });
    };
    addSkillToUser = (req: Request, res: Response) => {
        Users.findById(req.body['userId'], (err, user) => {
            if (err || !user) {
                res.status(404).send(this.errorObject('User not found.', 404));
                return false;
            }
            if(user){
                let createSkill = new Skills({
                    title: req.body.title,
                    level: req.body.level,
                    userId: user._id
                });
                createSkill.save((err, skill) => {
                    if (err) {
                        res.status(500).send(this.errorObject(err, 500));
                        return false;
                    }
                    if (user.skills.indexOf(skill._id) === -1) {
                        user.skills.push(skill._id);
                    }
                    user.save((err, user) => {
                        if (err) {
                            res.status(500).send(this.errorObject(err, 500));
                            return false;
                        }
                        res.status(200).send(this.successObject('Skill successfully added'));
                    });
                });
            }
        });
    };
}