import {useState, useEffect, SetStateAction} from 'react'
import { Dispatch } from 'react';

//The get method should be wrapped in a useCallback hook to avoid unnecessary re-renders.
const useData = (getMethod: () => Promise<any[]>): [any[], Dispatch<SetStateAction<any[]>>] => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getMethod().then(setData);
  }, [getMethod]);

  return [data, setData];
}

export default useData