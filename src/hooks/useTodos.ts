import { TodoContext } from "@providers/todoProvider";
import useStrictContext from "./useStrictContext";

export const useTodos = () => useStrictContext(TodoContext, "Todo Context");
