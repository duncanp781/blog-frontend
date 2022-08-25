import React, { useState, useEffect } from "react";
import { Post } from "./Home";
import { Page } from "./styled/page.styled";
import { useParams } from "react-router";
import styled from "styled-components";

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

  const PostContent = styled.div`
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
    overflow-wrap: break-word;
    max-width: 100%;
  `;

  const PostStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    padding: 1rem;
    width: 100%;
  `


  return (
    <Page>
      {post ? (
        <PostStyled>
          <h1>{post.title}</h1>
          <h2 style = {{marginLeft: 'auto'}}> {post.author.username}</h2>
          <PostContent>{post.content}</PostContent>
        </PostStyled>
      ) : (
        <h1>Loading...</h1>
      )}
    </Page>
  );
}

export default PostPage;
