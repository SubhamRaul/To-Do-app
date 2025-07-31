import Todo from '../models/todo.models.js';

const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed || false,
        user: req.user._id // Associate todo with the authenticated user
    })

    try {
        const newtodo = await todo.save();
        console.log(newtodo);
        
        res.status(201).json({ message: "Todo created successfully", newtodo: newtodo });
    } catch (error) {
        console.log("Error creating todo:", error);
        res.status(500).json({ message: "Error creating todo" });
        
    }
}

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user._id}) // Fetch todos for the authenticated user;
        
        res.status(201).json({message:"Todo fetched successfully",todos});
        
    } catch (error) {
        console.log("Error fetching todos:", error);
        res.status(500).json({ message: "Error fetching todos from database" });
        
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id , req.body, { new: true });
        if(!todo){
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(201).json({message:"Todo updated successfully",todo});
    } catch (error) {
        console.log("Error while updating todo:", error);
        res.status(500).json({ message: "Error updating todo" });
        
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(201).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log("Error while deleting todo:", error);
        res.status(500).json({ message: "Error deleting todo" });
    }
}



export { createTodo , getTodos , updateTodo , deleteTodo };