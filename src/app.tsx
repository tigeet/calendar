import React, { memo } from "react";
import { TodoProvider } from "./providers/todoProvider";
import Main from "./pages/main/main";
import "./app.css";
import "./reset.css";
import { ModalProvider } from "./providers/modalProvider";
import { DateProvider } from "./providers/dateProvider";

const App = () => {
  return (
    <TodoProvider>
      <ModalProvider>
        <DateProvider>
          <Main />
        </DateProvider>
      </ModalProvider>
    </TodoProvider>
  );
};

export default memo(App);
