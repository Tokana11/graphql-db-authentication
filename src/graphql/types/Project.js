export default `

    input ProjectInput{
        _id: String!
        name: String!
        in_date: String!
        fee: Float!
        
    }

    type Project {
        _id: String!
        name: String!
        in_date: String!
        fee: Float!
        is_ready: Boolean
    }

    type Query {
        project(_id: String!): Project
        projects: [Project]
    }
    type Mutation {
        addProject(name: String!, in_date: String!, fee: Float!): Project
        deleteProject(_id: String!): Project
        editProject(_id: String!, name: String!, in_date: String!, fee: Float!, is_ready:Boolean ): Project
    }

`