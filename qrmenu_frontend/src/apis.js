import { toast } from "react-toastify";

export function signIn(username, password) {
  return fetch("/api/auth/token/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      }

      return response
        .json()
        .then((json) => {
          // handle JSON error, response by the server

          if (response.status === 400) {
            const errors = Object.keys(json).map((k) => `${json[k].join(" ")}`);
            throw new Error(errors.join(" "));
          }

          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
          if (e.name === "SyntaxError") {
            throw new Error(response.statusText);
          }
          throw new Error(e);
        });
    })
    .then((json) => {
      // call api success
      toast(JSON.stringify(json), { type: "success" });
      return json;
    })
    .catch((e) => {
      toast(e.message, { type: "error" });
    });
}
