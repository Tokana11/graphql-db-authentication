import Project from "../../models/Project";

export default {
    Query: {
        project: (root, args) => {
            return new Promise((resolve, reject) => {
                Project.findOne(args).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },
        projects: () => {
            return new Promise((resolve, reject) => {
                Project.find({}).populate().exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        }
    },

    Mutation:{
        addProject: (root, {name, in_date, fee}) => {
            const newProject = new Project ({name,in_date,fee});
            return new Promise((resolve, reject) => {
                newProject.save((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },

        deleteProject: (root, {id}) =>{
            return new Promise((resolve, reject) => {
                Project.findByIdAndRemove({_id}).exec((error, response) => {
                    error ? reject(error): resolve(response);
                })
            })
        },

        editProject: (root, {_id, name, in_date, fee, is_ready}) => {
            return new Promise((resolve, reject) => {
                Project.findByIdAndUpdate({_id}, {$set: {name, in_date, fee, is_ready}}, {new: true}).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        }
    }

}