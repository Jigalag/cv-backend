import { Request, Response } from 'express';
import { DefaultAPIClass } from "../api";
import { Contact } from './contact.model';
import { MY_USER_ID } from '../../config/userId';
import { Users } from "../user/user.model";

export class ContactController extends DefaultAPIClass{
    createUserContact = (req: Request, res: Response) => {
        Users.findById(req.params['id'], (err, user) => {
            if (err || !user) {
                res.status(404).send(this.errorObject('User not found.', 404));
                return false;
            }
            if(user){
                let contactData = req.body;
                contactData['userId'] = req.params['id'];
                console.log(contactData);
                let createContact = new Contact(contactData);
                createContact.save((err, contact) => {
                    if (err) {
                        res.status(500).send(this.errorObject(err, 500));
                        return false;
                    }
                    res.status(201).send();
                });
            }
        });
    };
    getUserContacts = (req: Request, res: Response) => {
        Contact.findOne({userId: req.params.id}, (err, contact) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!contact) {
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.json(this.successObject(contact));
            }
        });
    };
    getMyContacts = (req: Request, res: Response) => {
        Contact.findOne({userId: MY_USER_ID}, (err, contact) => {
            if (err) {
                res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                return false;
            } else {
                if (!contact) {
                    res.status(404).send(this.errorObject("User not found", 404));
                    return false;
                }
                res.json(this.successObject(contact));
            }
        });
    };

    updateContact = (req: Request, res: Response) => {
        Contact.findById(req.params.id)
            .exec((err, contact) => {
                if (err) {
                    res.status(500).send(this.errorObject("Server error. Please contact to administrator", 500));
                    return false;
                } else {
                    if (!contact){
                        res.status(404).send(this.errorObject("User not found", 404));
                        return false;
                    }
                    contact = Object.assign(contact, req.body);
                    contact.save((err, contact) => {
                        if (err) {
                            res.status(500).send(this.errorObject(err, 500));
                            return false;
                        }
                        res.json(this.successObject(contact));
                    });
                }
            });
    };
}