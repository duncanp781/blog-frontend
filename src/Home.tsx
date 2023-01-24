import Button from "@mui/material/Button";
import useData from "./hooks/useData";
import PostsDisplay from "./PostsDisplay";
import { useCallback, useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const Home = () => {
  const userController = useContext(UserContext);
  const getPosts = useCallback(() => {
    return fetch("http://localhost:3000/api/posts", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }, []);

  const [posts, setPosts] = useData(getPosts);

  return (
    <>
      <Button variant="contained" href="/post">
        Make a post
      </Button>
      <PostsDisplay posts={posts} />
    </>
  );
};

export default Home;
