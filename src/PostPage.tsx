import React, { useState, useEffect } from "react";
import { Post } from "./types/Post";
import { Page } from "./styled/page.styled";
import { useParams } from "react-router";
import CommentDisplay from "./CommentDisplay";
import { PostContent } from "./styled/postContent.styled";
import { Link } from "react-router-dom";
import { PostStyled } from "./styled/post.styled";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    //Fetch post from API
    fetch("http://localhost:3000/api/post/" + id, { mode: "cors" })
      .then((res) => res.json())
      .then((json) => {
        setPost(json);
      });
  }, [id]);

  return (
    <Page>
      {post ? (
        <>
          <PostStyled>
            <h1>{post.title}</h1>
            <h2 style={{ marginLeft: "auto" }}> {post.author.username}</h2>
            <h2 style={{ marginLeft: "auto" }}>
              {post.public ? "Published" : "Not Published"}
            </h2>
            <h3>
              <Link to={'/post/' + post._id +'/update' } state={{ post }}>
                Edit
              </Link>
            </h3>
            <PostContent>{post.content}</PostContent>
          </PostStyled>
          <CommentDisplay />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Page>
  );
}

export default PostPage;
