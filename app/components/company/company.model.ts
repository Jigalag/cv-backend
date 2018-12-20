import * as mongoose from 'mongoose';
import { Users } from '../user/user.model';

const Schema = mongoose.Schema;

export const CompanySchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    location: {
        type: String
    },
    position: {
        type: String,
        required: 'Enter a position'
    },
    about:{
        type: String
    },
    responsibilities:{
        type: String
    },
    technologies: {
        type: Array
    },
    startDate: {
        type: String,
        default: null,
        required: 'Enter an start date'
    },
    endDate: {
        type: String,
        default: null
    },
    webSite: {
        type: String,
        default: null
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export const Company = mongoose.model('Companies', CompanySchema, 'Companies');