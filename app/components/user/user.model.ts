import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Skills } from '../skills/skills.model';
import { Socials } from '../social_links/social_links.model';

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    avatar: {
        type: String,
        required: 'Enter a last name'
    },
    position:{
        type: String,
        required: 'Enter a position'
    },
    company:{
        type: String,
        required: 'Enter a company'
    },
    address:{
        type: String,
        required: 'Enter an address'
    },
    aboutPage: {
        type: String,
        default: null,
        required: 'Enter an about page description'
    },
    aboutTitle: {
        type: String,
        default: null,
        required: 'Enter an about page description'
    },
    education: {
        type: String,
        default: null,
        required: 'Enter an education'
    },
    aboutText: {
        type: String,
        default: null,
        required: 'Enter an about text'
    },
    isMy: {
        type: Boolean
    },
    skills: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Skills'
        }
    ],
    languages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Languages'
        }
    ],
    socialLinks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Socials'
        }
    ]
});

export const Users = mongoose.model('Users', UserSchema, 'Users');