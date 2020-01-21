import { Schema, model, Document } from 'mongoose';

export interface IWorkStation extends Document {
    name: string;
    slug: string;
    workStationType: string;
    inUse: boolean;
    locked: boolean;
}

const workStationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 4,
        },
        slug: {
            type: String,
            required: true,
        },
        workStationType: {
            type: String,
            enum: ['TF', 'HT'],
            default: 'TF',
        },
        inUse: {
            type: Boolean,
            required: true,
            default: false,
        },
        locked: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// TODO create pre hook function to save slug before saving on DB

export default model<IWorkStation>('WorkStation', workStationSchema);
