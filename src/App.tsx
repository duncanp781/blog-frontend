import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Header from "./Header";
import { Page } from "./styled/page.styled";
import {Content} from "./styled/content.styled";
import { UserContext, defaultUser } from "./contexts/UserContext";
import { User } from "./types/User";
import PostForm from "./PostForm";
import PostPage from "./PostPage";
import UserPage from "./UserPage";

//TODO: 
//Add responding to comments
//Make everything look nicer. 
//Stop fetching from localhost, use .env or something.

function App() {
  const [user, setUser] = React.useState<User>(defaultUser);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  //The user context is used to pass the user to the children components
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Page>
        <Router>
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/post" element={<PostForm />} />
              <Route path="/post/:id/update" element={<PostForm />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>
          </Content>
        </Router>
      </Page>
    </UserContext.Provider>
  );
}

export default App;
