import Button from "@mui/material/Button";
import React from "react";
import { useJWT } from "./useJWT";

interface Post{
  _id: string;
  title: string;
  content: string,
  author: string;
}

const Home = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const jwt = useJWT();

  React.useEffect(() => {
    fetch("http://localhost:3000/api/posts", { mode: "cors" })
      .then((res) => res.json())
      .then((json) =>{ 
        console.log(json);
        setPosts(json)});
  }, []);

  return (
    <>
      <Button variant="contained" href='/post'>Make a post</Button>
      <div>
        {posts.map((post) => (
          <div key={post._id}>{post.title}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
