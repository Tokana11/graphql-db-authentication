export default `
    type Employee {
        _id: String!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        projects:[Project]
    }

    type Query {
        employee(_id: String!): Employee
        employees: [Employee]
    }

    type Mutation {
        addEmployee(first_name: String!, last_name: String!, email: String!, password: String!): String
        deleteEmployee(_id: String!) : Employee
        editEmployee(_id: String!, first_name: String, last_name: String, email: String, password: String, projects: [ProjectInput]): Employee
        login(email: String!, password: String!): String
    }

`