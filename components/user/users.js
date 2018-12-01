function Users(props) {
  return () => {
    const users = props.state.users.map((user) => User(props)({id: user.id}));
    return el("div",
      UserForm(props)(),
      el("br"),
      el("div",
        ...users)
    );
  }
}