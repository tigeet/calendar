import React, { memo } from "react";
import { TodoProvider } from "./providers/todoProvider";
import Main from "./pages/main/main";
import "./app.css";
import "./reset.css";
import { ModalProvider } from "./providers/modalProvider";
import { DateProvider } from "./providers/dateProvider";
import { ProfileProvider } from "./providers/profileProvider";

const App = () => {
  return (
    <ProfileProvider>
      <TodoProvider>
        <ModalProvider>
          <DateProvider>
            <Main />
          </DateProvider>
        </ModalProvider>
      </TodoProvider>
    </ProfileProvider>
  );
};

export default memo(App);
