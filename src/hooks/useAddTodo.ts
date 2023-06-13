import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import { Todo } from "./useTodos";

interface AddTodoContext {
    previousTodos: Todo[];
  }
  
const useAddTodo = (onAdd: () => void) => {
   // get the QueryClient that we defined in main.tsx
   const queryClient = useQueryClient();

   // useMutation(TData - data that we get from the backend, TError - our error object, TVariables - the data that we send to the backend, the context)
   return useMutation<Todo, Error, Todo, AddTodoContext>({
     mutationFn: (todo: Todo) =>
       axios
         .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
         .then((res) => res.data),
     // onMutate: (variable data that we send to the back)
     // onMutate Callback - return a context object with the previous todos
     // we update the query cache so the UI gets updated right away - no loading time
     onMutate: (newTodo: Todo) => {
       const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
 
       // todos = [] it initialises the todo array as an empty array, so we don't need ...(todos || [])
       queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
         newTodo,
         ...todos,
       ]);

       onAdd();
 
       // return a context object that returns the previous data, used in case our request fails
       return { previousTodos };
     },
 
     onSuccess: (savedTodo, newTodo) => {
       // onSuccess: (savedTodo: todo from the backend, newTodo: todo created on the client) Callback
       queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
         // if todo equals the created todo in the client we replaced it with the todo from the backend, else we keep the same todo
         todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
       );
     },
 
     onError: (error, newTodo, context) => {
       if (!context) return;
       queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
     },
   });
}

export default useAddTodo