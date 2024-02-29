import express from "express";
import {ApolloServer,gql} from "apollo-server-express";
import typeDefs from './typeDefs.js';
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import cors from "cors"

async function initServer(){
    const app=express()
    app.use(cors())

    const apolloServer=new ApolloServer({typeDefs,resolvers})
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
    app.use((req,res)=>{
        res.send("Server Started Succesfuly")
    })

    const PORT=process.env.PORT||3005
    try {
        await mongoose.connect(
            'mongodb+srv://charanjoseph00:' +
              encodeURIComponent('Newtask@123') +
              '@cluster1.mbwtjgz.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster1' 
          );
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
    }
    app.listen(PORT,()=>{
        console.log(`express Server is running on port ${PORT}`);
    })
}

initServer()
