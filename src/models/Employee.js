import mongoose from "mongoose";
import Project from "./Project"

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    projects:{
        type:[Project.Schema]
    }
})
const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;