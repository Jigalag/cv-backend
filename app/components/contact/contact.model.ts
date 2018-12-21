import * as mongoose from 'mongoose';
import { Users } from '../user/user.model';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    contactText: {
        type: String,
        required: 'Enter a text'
    },
    socialLinks: {
        type: Array
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export const Contact = mongoose.model('Contact', ContactSchema, 'Contact');