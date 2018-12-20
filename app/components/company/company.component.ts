import { Request, Response } from 'express';
import {DefaultAPIClass} from "../api";
import { Company } from './company.model';
import { Languages } from '../languages/languages.model';
import { myUserId } from '../../config/userId';
import {Users} from "../user/user.model";

export class CompanyController extends DefaultAPIClass{
    createUserCompany = (req: Request, res: Response) => {
        Users.findById(req.params['id'], (err, user) => {
            if (err || !user) {
                res.status(404).send(this.errorObject('User not found.', 404));
                return false;
            }
            if(user){
                let companyData = req.body;
                companyData['userId'] = req.params['id'];
                let createCompany = new Company(companyData);
                createCompany.save((err, company) => {
                    if (err) {
                        res.status(500).send(this.errorObject(err, 500));
                        return false;
                    }
                    res.status(201).send();
                });
            }
        });
    };
    getUserCompanies = (req: Request, res: Response) => {
        Company.find({userId: req.params.userId}, (err, company) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!company) {
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.json(this.successObject(company));
            }
        });
    };
    getMyCompanies = (req: Request, res: Response) => {
        Company.find({userId: myUserId}, (err, company) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!company) {
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.json(this.successObject(company));
            }
        });
    };
    getCompany = (req: Request, res: Response) => {
        Company.findOne({'isMy': true})
            .populate({path: 'languages', model: Languages, select: 'title level'})
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

    updateCompany = (req: Request, res: Response) => {
        Company.findById(req.params.id)
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