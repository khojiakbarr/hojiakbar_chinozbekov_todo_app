const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#loginForm");
const url_data = "https://todo-for-n92.cyclic.app";

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const date = await fetch(url_data + "/user/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: event.target[0].value,
      password: event.target[1].value,
    }),
  });
  const res = await date.json();
  alert(res.message);

  localStorage.setItem("token", res.token);
  const token = res.token;

  if (token == res.token && token) {
    location.replace("../main.html");
  }
});
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const date = await fetch(url_data + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target[0].value,
        password: event.target[1].value,
      }),
    });
    const res = await date.json();
console.log(res);
    localStorage.setItem("token", res.token);
    const token = res.token;

    if (token == res.token && token) {
      location.replace("../main.html");
    }
  });
});
