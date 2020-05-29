import {mergeResolvers} from "merge-graphql-schemas";
import Employee from "./Employee";
import Project from "./Project";

const resolvers = [Employee, Project];

export default mergeResolvers(resolvers);