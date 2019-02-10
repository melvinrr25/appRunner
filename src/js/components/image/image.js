const el = require('../../el.js');

function Image(props) {
  const styles = {
    display: "none",
    "border-radius": "50%",
    border: "10px solid #f2f2f2"
  };
  return el("img")
    .css(styles)
    .on("load", e => {
      e.target.css("display", "block");
    }).on('click', () => alert('h1'))
}

module.exports = Image;