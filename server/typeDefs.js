import {gql} from "apollo-server-express"

const  typeDefs = gql`
scalar Date
type Todo{
    id:ID,
   name:String,
   image:String,
   price:Float,
   discount:Float
}

type Query{
    welcome:String,
    getTodos:[Todo],
    getTodo(id:ID):Todo
}
type Mutation{
    addTodo(name:String!,image:String!,price:Float!,discount:Float!):Todo,
    deleteTodo(id:ID):String
    updateTodo(id:ID,name:String,image:String,price:Int,discount:Int):Todo
}
`
export default typeDefs;