import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import usePosts from "./hooks/usePosts";
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

  const posts = usePosts(getPosts);

  return <PostsDisplay posts={posts} />;
}

export default UserPage;
