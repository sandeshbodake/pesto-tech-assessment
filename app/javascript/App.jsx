import React from "react";

import { AuthProvider } from "contexts/auth";
import { UserProvider } from "contexts/user";

import Main from "./components/Main";

const App = () => {
  const jsonString = document
    .querySelector("[data-react-class]")
    .getAttribute("data-react-props");
  const data = JSON.parse(jsonString);

  return (
    <AuthProvider>
      <UserProvider>
        <Main {...data} />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
