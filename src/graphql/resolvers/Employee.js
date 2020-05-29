import Employee from "../../models/Employee";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export default {
    Query: {
        employee: (root, args) => {
            return new Promise((resolve, reject) => {
                Employee.findOne(args).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },
        employees: () => {
            return new Promise((resolve, reject) => {
                Employee.find({}).populate().exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        }
    },
    Mutation: {
        addEmployee: async (root, {first_name, last_name, email, password}) => {
            const newEmployee = await new Employee({
                first_name,
                last_name,
                email,
                password: await bcrypt.hash(password, 10)
            });

            if(!newEmployee){
                throw new Error(`Cannot create user ${email}`)
            }
            let savedUser = null;
            try {
                savedUser = await newEmployee.save();
            } catch (e) {
                throw new Error(`Cannot save user ${email}`)
            }

            return jsonwebtoken.sign(
                {
                    _id: savedUser._id,
                    email: savedUser.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        },
        deleteEmployee: (root, {_id}) => {
            return new Promise((resolve, reject) => {
                Employee.findByIdAndRemove({_id}).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },
        editEmployee: (root, {_id, first_name, last_name, email, password}) => {
            return new Promise((resolve, reject) => {
                Employee.findByIdAndUpdate(
                    {_id},
                    {$set: {first_name, last_name, email, password}},
                    {new: true}).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },
        login: async(root, {email, password}) => {
            const employee = await Employee.findOne({email});
            if(!employee){
                throw new Error(`Cannot find user with email: ${email}`)
            }

            const valid = await bcrypt.compare(password, employee.password);

            if(!valid){
                throw new Error(`Cannot match password for email: ${email}`)
            }

            return jsonwebtoken.sign(
                {
                    _id: employee._id,
                    email: employee.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        },
    }
}