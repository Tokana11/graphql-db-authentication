import {mergeTypes} from "merge-graphql-schemas";
import Employee from "./Employee";
import Project from "./Project";

const typeDefs = [Employee, Project];

export default mergeTypes(typeDefs, {all: true});