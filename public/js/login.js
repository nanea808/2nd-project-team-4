(function() {
  const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (email && password) {
      const response = await fetch("/api/users/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location = "/";
      } else {
        alert("Could not log in. Please try again.");
      
      }
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    const username = $('#signup-username').val().trim();
    const email = $("#signup-email").val().trim();
    const password = $("#signup-password").val().trim();

    if (username && email && password) {
      const response = await fetch("api/users", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("signed up!");
        document.location = "/";
      } else {
        alert("Failed to sign up.");
      }
    }
  };

  document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);

  $("#signup-form").submit(signUp);
})();
