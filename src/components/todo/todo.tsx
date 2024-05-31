import { cn } from "@bem-react/classname";
import { useTodos } from "@hooks/useTodos";
import React, { memo, useEffect, useMemo, useState } from "react";
import { areSameDay } from "@utils/areSameDay";
import { useModal } from "@hooks/useModal";
import { fetchService } from "@lib/fetch/fetch";
import "./todo.css";
import clsx from "clsx";
type Props = {
  date: Date;
  isFiller: boolean;
  limit: number;
};

const cnTodo = cn("todo");

const Todo = ({ date, isFiller, limit }: Props) => {
  const { todos } = useTodos();
  const { open } = useModal();
  const [isDayoff, setIsDayoff] = useState(false);
  const displayedTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const createdAt = new Date(todo.createdAt);
        return areSameDay(createdAt, date);
      }),
    [date, todos]
  );

  const extraTodosCount = displayedTodos.length - limit;

  useEffect(() => {
    async function run() {
      try {
        const json = await fetchService.get(
          `https://isdayoff.ru/api/getdata?year=${date.getFullYear()}&month=${
            date.getMonth() + 1
          }&day=${date.getDate()}`
        );

        if (json) setIsDayoff(true);
      } catch (error) {
        console.log("error", error);
      }
    }

    run();
  }, [date]);

  return (
    <div className={cnTodo()} onClick={() => open(date)}>
      <span
        className={cnTodo("date", {
          isFiller,
          isDayoff,
          today: areSameDay(date, new Date()),
        })}
      >
        {date.getDate()}
      </span>
      <div className={cnTodo("items")}>
        {displayedTodos.slice(0, limit).map((todo) => (
          <div key={todo.id} className={cnTodo("item")}>
            <div className={cnTodo("todoInfo")}>
              <div className={cnTodo("todoPoint")} />
              <span
                className={cnTodo("todoTitle", { completed: todo.completed })}
              >
                {todo.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {displayedTodos.length > 0 && (
        <span className={clsx("center", cnTodo("todosCount"))}>
          {displayedTodos.length}
        </span>
      )}
      {extraTodosCount > 0 && (
        <span className={cnTodo("extra")}>And {extraTodosCount} more</span>
      )}
    </div>
  );
};

export default memo(Todo);
