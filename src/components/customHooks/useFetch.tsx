import { useEffect, useState } from 'react';

function useFetch(url, type, postBody) {
  const [fetchData, setFetchData] = useState<any>('');
  const [fetchError, setFetchErr] = useState<string | null>('');
  const [fetchIsPending, setFetchIsPending] = useState<boolean>(true);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    let done = false;

    function getData() {
      if (type === 'GET' && !done) {
        fetch(`http://localhost:3001${url}`)
          .then((res) => {
            setFetchIsPending(false);
            return res.json();
          })
          .then((result) => {
            setFetchData(result);
            setFetchErr(null);
            setTimeout(() => {
              setCounter(counter + 1);
            }, 1000);
          })
          .catch((err) => {
            setFetchErr(err.message);
            setFetchIsPending(false);
          });
      }
      if (type === 'POST' && postBody && !done) {
        fetch(`http://localhost:3001${url}`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        })
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            setFetchIsPending(false);
            setFetchData(result);
          })
          .catch((err) => {
            setFetchErr(err);
            setFetchIsPending(false);
          });
      }
    }
    getData();
    return () => {
      done = true;
    };
  }, [url, postBody && postBody, counter]);

  return { fetchData, fetchIsPending, fetchError };
}

export default useFetch;
