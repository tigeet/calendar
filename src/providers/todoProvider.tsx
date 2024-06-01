import { useLocalStorage } from "@hooks/useLocalStorage";
import { useProfile } from "@src/hooks/useProfile";
import { TTodo } from "@src/types";
import { makeId } from "@utils/makeId";
import React, { createContext, useCallback, useMemo } from "react";
type Props = {
  children?: React.ReactNode;
};

type TAddTodo = ({
  title,
  createdAt,
}: {
  title: string;
  createdAt: Date;
}) => void;
type TTodoContext = {
  todos: TTodo[];
  addTodo: TAddTodo;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string, completed: boolean) => void;
};
export const TodoContext = createContext<null | TTodoContext>(null);
export const TodoProvider = ({ children }: Props) => {
  const { selected } = useProfile();

  const [todos, setTodos] = useLocalStorage<TTodo[]>({
    key: "todos",
    defaultValue: [],
  });

  const addTodo: TAddTodo = useCallback(
    ({ title, createdAt }) => {
      setTodos((todos) => [
        ...todos,
        {
          id: makeId(),
          createdAt: createdAt.getTime(),
          completed: false,
          title,
          createdBy: selected.id,
        },
      ]);
    },
    [selected.id, setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => setTodos((todos) => todos.filter((todo) => todo.id !== id)),
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string, completed: boolean) => {
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
    },
    [setTodos]
  );

  const profileTodos = useMemo(
    () => todos.filter((todo) => todo.createdBy === selected.id),
    [selected.id, todos]
  );
  return (
    <TodoContext.Provider
      value={{ todos: profileTodos, addTodo, deleteTodo, toggleTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
