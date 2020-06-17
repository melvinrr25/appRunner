const el = require('../../el.js');

function login(props) {

  function handleSubmit(props) {
    return (e) => {
      e.preventDefault();
      debugger
      const username = e.target.username.value;
      const pwd = e.target.password.value;
      if(pwd == '123' && username == 'admin'){
        sessionStorage.setItem('token', '123')
        return props.navigate('#/') 
      }
      sessionStorage.clear();
      return alert('Invalid credentials')
    }
  }

  const label = text => el("label", text);
  const input = (name, type = "text") => el("input").attrs({ type, name });
  
  const div = (...children) => el("div", ...children).attrs({
    class: "input-wrapper"
  });

  const form = el("form",
    div(
      label("Username:"), 
      input("username", "text")
    ),
    div(
      label("Password:"), 
      input("password", "password")
    ),
    div(
      input("submit", "submit")
    )
  );

  form.on("submit", handleSubmit(props));
  
  form.attrs({
    class: "UserForm"
  });

  return form;
}

module.exports = login;
