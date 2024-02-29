import Todo from "./models/todo.js"
const resolvers={
    Query:{
        welcome:()=>{
              return "Welcome"
        },
        getTodos:async()=>{
            const todos=await Todo.find()
            return todos
        },
        getTodo:async(root,args)=>{
            const todo=await Todo.findById(args.id)
            return todo
        },
       
    },
    Mutation:{
        addTodo:async(root,args)=>{
            const { name, image,price, discount } = args;
            const newTodo = new  Todo({name,image,price,discount});
            try {
                await newTodo.save();
                return newTodo;
              } catch (error) {
                console.error("Error saving todo:", error);
                throw new Error("Unable to save todo");
              }
        },
        deleteTodo:async(root,args)=>{
            await Todo.findByIdAndDelete(args.id)
            return "Item deleted"
        },updateTodo:async(root,args)=>{
            const {id,name,image,price,discount}=({...args})
            const updatedTodo={}
            if(name!= undefined){
                updatedTodo.name=name
            }
            if(image!= undefined){
                updatedTodo.image=image
            }
            if(price!= undefined){
                updatedTodo.price=price
            }
            if(discount!= undefined){
                updatedTodo.discount=discount
            }
            const todo = await Todo.findByIdAndUpdate(id,updatedTodo,{new:true})
            return todo;

        },


    }
}

export default resolvers;