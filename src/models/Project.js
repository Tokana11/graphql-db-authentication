import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    in_date:{
        type: String,
        required: true
    },
    fee:{
        type: Number,
        required: true
    },
    is_ready: {
        type: Boolean,
    }
})
const Project = mongoose.model("Project", ProjectSchema);

export default Project;