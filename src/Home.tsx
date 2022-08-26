import Button from "@mui/material/Button";
import usePosts from "./hooks/useData";
import PostsDisplay from "./PostsDisplay";
import { useCallback, useContext } from "react";
import { UserContext } from "./contexts/UserContext";

export interface Post {
  _id: string;
  title: string;
  content: string;
  public: boolean;
  createdAt: string;
  author: {
    username: string;
    _id: string;
  };
}

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

  const posts = usePosts(getPosts);

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
