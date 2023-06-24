let patient = JSON.parse(localStorage.getItem("user-detail")) || null;
let doctor = JSON.parse(localStorage.getItem("doc-detail")) || null;

let user = patient || doctor;
if (user) {
  let menu = document.getElementById("menu");

  let h2 = document.createElement("h4");
  h2.setAttribute("id", "userName");
  h2.innerText = user.user.name;

  let li = document.createElement("li");
  li.setAttribute("id", "logOut");
  li.innerText = "Log Out";

  menu.append(h2, li);

  let loginBtn = document.getElementById("loginBtn");
  loginBtn.style.display = "none";

  let signupBtn = document.getElementById("signupBtn");
  signupBtn.style.display = "none";

  let logOut = document.getElementById("logOut");
  logOut.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "./index.html";
  });
}
