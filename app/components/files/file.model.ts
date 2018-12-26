import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FileSchema = new Schema({
    path: {
        type: String
    }
});

export const File = mongoose.model('File', FileSchema, 'File');
