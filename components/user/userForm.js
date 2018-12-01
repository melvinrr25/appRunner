function handleSubmit(props) {
  return (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const url = e.target.url.value;
    const users = props.state.users;
    const id = users.length + 1;
    users.push({id, name, age, url });
    props.setState("users", users);
  }
}

function UserForm(props) {
  return () => {
    const label = text => el("label", text);
    const input = (name, type = "text") => el("input").attrs({
      type: type,
      name: name
    });
    const div = (...children) => el("div", ...children).attrs({
      class: "input-wrapper"
    });

    const form = el("form",
      div(label("Name:"), input("name")),
      div(label("Age:"), input("age")),
      div(label("Url:"), input("url")),
      div(input("submit", "submit"))
    );

    form.on("submit", handleSubmit(props));
    form.attrs({
      class: "UserForm"
    });

    return form;
  }
}