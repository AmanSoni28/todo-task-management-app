import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo: "Todo msg",
            mark: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleMark: (id) => {}

});


export const TodoProvider = TodoContext.Provider;


export const useTodo = () => {
    return useContext(TodoContext);
}