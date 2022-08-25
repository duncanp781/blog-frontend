import {useState, useEffect} from 'react'

//The get method should be wrapped in a useCallback hook to avoid unnecessary re-renders.
const usePosts = (getMethod: () => Promise<any>) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getMethod().then(setPosts);
  }, [getMethod]);

  return posts;
}

export default usePosts