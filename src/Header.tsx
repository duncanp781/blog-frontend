import React, { useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import { UserContext, defaultUser } from "./contexts/UserContext";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const userController = React.useContext(UserContext);
  const [pages, setPages] = React.useState<
    { name: string; path?: string; onClick?: () => void }[]
  >([
    {
      name: "Home",
      path: "/",
    },
  ]);
  useEffect(() => {
    if (userController.user !== defaultUser) {
      setPages([
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Logout",
          onClick: () => {
            if (userController && userController.user) {
              userController.setUser(defaultUser);
            }
            localStorage.removeItem("user");
          },
        },
      ]);
    } else {
      setPages([
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Sign Up",
          path: "/signup",
        },
        {
          name: "Log In",
          path: "/login",
        },
      ]);
    }
  }, [userController]);

  return (
    <AppBar position="sticky">
      <Container>
        <Typography variant="h6">
          <Toolbar
            style={{ flex: "1", justifyContent: "flex-end", gap: "8px" }}
          >
            <>
              {pages.map((page) => {
                return (
                  <Button
                    key={uniqid()}
                    color="inherit"
                    href={page.path ? page.path : undefined}
                    onClick={page.onClick ? page.onClick : undefined}
                    variant={
                      location.pathname === page.path ? "outlined" : "text"
                    }
                  >
                    {page.name}
                  </Button>
                );
              })}
              {userController.user !== defaultUser && (
                <Avatar
                  onClick={() => {
                    if (userController && userController.user) {
                      navigate("/user/" + userController.user._id);
                    }
                  }}
                >
                  {userController.user.username[0]}
                </Avatar>
              )}
            </>
          </Toolbar>
        </Typography>
      </Container>
    </AppBar>
  );
}

export default Header;
