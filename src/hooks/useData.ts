import {useState, useEffect} from 'react'

//The get method should be wrapped in a useCallback hook to avoid unnecessary re-renders.
const useData = (getMethod: () => Promise<any[]>) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getMethod().then(setData);
  }, [getMethod]);

  return data;
}

export default useData