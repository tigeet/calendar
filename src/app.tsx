import React, { memo, useCallback, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { makeId } from "./utils/makeId";
import Calendar from "./components/calendar/calendar";
import { Todo } from "./types";

const App = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>({
    key: "todos",
    defaultValue: [],
  });

  const handleAddTodo = useCallback(
    (payload: Pick<Todo, "title" | "description">) => {
      setTodos((todos) => [
        ...todos,
        {
          id: makeId(),
          createdAt: new Date(),
          completed: false,
          ...payload,
        },
      ]);
    },
    [setTodos]
  );

  const handleDeleteTodo = useCallback(
    (id: string) => setTodos((todos) => todos.filter((todo) => todo.id !== id)),
    [setTodos]
  );

  const handleToggleTodo = useCallback(
    (id: string, completed: boolean) => {
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
    },
    [setTodos]
  );

  return <></>;
};
export default memo(App);
