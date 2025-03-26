import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    short_title: { type: String },
    image_url: { type: String, required: true },
    box_type_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'box_type' }
}, { timestamps: true })

export const Box = mongoose.model('box', BoxSchema, 'box')

