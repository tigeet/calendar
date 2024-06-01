import { cn } from "@bem-react/classname";
import { TTodo } from "@src/types";
import React, {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { useTodos } from "@hooks/useTodos";
import { areSameDay } from "@utils/areSameDay";
import { useModal } from "@hooks/useModal";
import CloseIcon from "@static/x.svg";
import { getMonthName } from "@utils/getMonthName";
import IconButton from "@components/iconButton/iconButton";
import useKeyPress from "@src/hooks/useKeyPress";
import DeleteIcon from "@static/trash-2.svg";

import "./modal.css";
const cnModal = cn("modal");

type Props = {
  className?: string;
};
const Modal = ({ className }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { date, close } = useModal();
  const [title, setTitle] = useState("");
  const { todos, toggleTodo, addTodo, deleteTodo } = useTodos();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useKeyPress({
    callback: close,
    keys: useMemo(() => ["Esc", "Escape"], []),
  });

  const displayedTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const createdAt = new Date(todo.createdAt);
        return areSameDay(createdAt, date);
      }),
    [date, todos]
  );

  const handleTodoClick = useCallback(
    (todo: TTodo) => {
      toggleTodo(todo.id, !todo.completed);
    },
    [toggleTodo]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!title) return;
      setTitle("");
      addTodo({ title, createdAt: date });
      inputRef.current?.focus();
    },
    [addTodo, date, title]
  );

  return (
    <div className={clsx(className, "center", cnModal())} onClick={close}>
      <div className={cnModal("content")} onClick={(e) => e.stopPropagation()}>
        <div className={cnModal("header")}>
          <span className={cnModal("date")}>
            {getMonthName(date.getMonth()) + " " + date.getDate()}
          </span>

          <IconButton
            onClick={close}
            className={cnModal("close")}
            icon={<CloseIcon />}
          />
        </div>
        <form className={cnModal("form")} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            name="title"
            placeholder="Title"
            value={title}
            className={cnModal("input")}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className={cnModal("addButton")}>Add</button>
        </form>
        <div className={cnModal("items")}>
          {displayedTodos.map((todo) => (
            <div
              key={todo.id}
              className={cnModal("item", { completed: todo.completed })}
              onClick={() => handleTodoClick(todo)}
            >
              <span className={cnModal("title")}>{todo.title}</span>
              <div className={cnModal("actions")}>
                <input
                  className={cnModal("checkbox")}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                  className={cnModal("delete")}
                  icon={<DeleteIcon className={cnModal("deleteIcon")} />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
