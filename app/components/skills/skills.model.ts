import * as mongoose from 'mongoose';

import { Users } from '../user/user.model';

const Schema = mongoose.Schema;

export const SkillsSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    level: {
        type: String,
        required: 'Enter a level'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export const Skills = mongoose.model('Skills', SkillsSchema, 'Skills');