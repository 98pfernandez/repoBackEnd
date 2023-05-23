//Change password
const changePass = document.getElementById("changePassword");
if (changePass) {
  changePass.addEventListener("click", (e) => {
    const newPass = document.getElementById("newPass");
    const confirmPass = document.getElementById("passConfirm");
    if (!newPass.value || !confirmPass.value)
      return Swal.fire("Warning", "Dont leave empty fields", "warning");

    if (newPass.value != confirmPass.value)
      return Swal.fire("Warning", "Passwords must be equals", "warning");

    var queryString = window.location.search;

    var params = new URLSearchParams(queryString);
    var token = params.get("token");

    //fetch
    const url = "/auth/restorePass";
    const headers = {
      "Content-Type": "application/json",
    };
    const method = "PATCH";
    const body = JSON.stringify({ token: token, pass: newPass.value });

    fetch(url, {
      headers,
      method,
      body,
    })
      .then((response) => {
        Swal.fire("Done", "The password was changed", "success").then((result) => {
          if (result.isConfirmed) {
            // El usuario presionó "OK"
            document.location.href = '/'
          }});
      })
      .catch((error) => {
        alert("error");
        console.log(error);
      });
  });
}
