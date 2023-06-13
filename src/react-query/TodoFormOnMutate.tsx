import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoFormOnMutate = () => {
  // get the QueryClient that we defined in main.tsx
  const queryClient = useQueryClient();

  // useMutation(TData - data that we get from the backend, TError - our error object, TVariables - the data that we send to the backend, the context)
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    // onMutate: (variable data that we send to the back)
    // onMutate Callback - return a context object with the previous todos
    // we update the query cache so the UI gets updated right away - no loading time
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      // clear input field after post
      if (ref.current) ref.current.value = "";

      // return a context object that returns the previous data, used in case our request fails
      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // onSuccess: (savedTodo: todo from the backend, newTodo: todo created on the client) Callback
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        // if todo equals the created todo in the client we replaced it with the todo from the backend, else we keep the same todo
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          // React Query will send our data to the backend using our mutationFn
          // We will pass a todo object which will be passed to "mutationFn: (todo: Todo)"
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoFormOnMutate;
