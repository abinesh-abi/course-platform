import axios from "axios";
import React, { useEffect } from "react";

function Login() {
  useEffect(() => {
    axios
      .post(
        "http://127.0.0.1:5000/login",
        { email: "abi@gmail.com", password: "1234" },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  function refresh() {
    axios.post(
      "http://127.0.0.1:5000/refresh_token",
      {},
      {
        withCredentials: true,
        credentials: 'include'
      }
    ).then(({data})=>console.log(data))
  }

  return (
    <div>
      <p>hi</p>
      <button onClick={refresh}>refresh</button>
    </div>
  );
}

export default Login;
