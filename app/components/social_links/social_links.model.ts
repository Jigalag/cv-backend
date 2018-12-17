import * as mongoose from 'mongoose';

import { Users } from '../user/user.model';

const Schema = mongoose.Schema;

const SocialSchema = new Schema({
    ico: {
        type: String,
        required: 'Enter an ico url'
    },
    url: {
        type: String,
        required: 'Enter a type'
    },
    show:{
        type: Boolean,
        default: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: 'Enter a user id',
        ref: 'Users'
    }
});
export const Socials = mongoose.model('Socials', SocialSchema, 'Socials');