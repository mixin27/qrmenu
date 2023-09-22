import { toast } from "react-toastify";
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function request(path, { data = null, token = null, method = "GET" }) {
  return fetch(`/api${path}`, {
    method: method,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
    body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
  })
    .then((response) => {
      if (response.ok) {
        if (method === "DELETE") {
          // If delete, nothing return
          return true;
        }

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
      // toast(JSON.stringify(json), { type: "success" });
      return json;
    })
    .catch((e) => {
      toast(e.message, { type: "error" });
    });
}

export { request };

export function signIn(username, password) {
  return request("/auth/token/login", {
    data: { username, password },
    method: "POST",
  });
}

export function register(username, password) {
  return request("/auth/users/", {
    data: { username, password },
    method: "POST",
  });
}

export function fetchPlaces(token) {
  return request("/api/places/", { token });
}

export function addPlace(data, token) {
  return request("/api/places/", { data, token, method: "POST" });
}

export function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "qrmenu_photos");

  return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.json();
  });
}
