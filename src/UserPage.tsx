import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import useData from "./hooks/useData";
import PostsDisplay from "./PostsDisplay";
import { UserContext } from "./contexts/UserContext";

function UserPage() {
  const userController = useContext(UserContext);
  const { id } = useParams();
  const getPosts = useCallback(() => {
    return fetch("http://localhost:3000/api/user/" + id + "/posts", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userController.user.token,
      },
    }).then((res) => res.json());
  }, [id, userController.user.token]);

  const getUser = useCallback(() => {
    return fetch("http://localhost:3000/api/user/" + id, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return [res];
      });
  }, [id]);

  const [posts, setPosts] = useData(getPosts);
  const [user, setUser] = useData(getUser);

  return (
    <>
      {user[0] ? <h1>{`Posts by ${user[0].username}`}</h1> : null}
      <PostsDisplay posts={posts} />
    </>
  );
}

export default UserPage;
