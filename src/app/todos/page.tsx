import { todo } from "@/Models/page";
import axios from "axios";

export default async function Todos() {
  const response = await axios("https://jsonplaceholder.typicode.com/todos");
  const todos = response.data;
  return (
    <div>
      {todos.map((todo: todo) => {
        return (
          <div key={todos.id}>
            <h1>{todo.title}</h1>
            <p>{todo.completed}</p>
          </div>
        );
      })}
    </div>
  );
}
