const el = require('../../el.js');

function Image(props) {
  return () => {
    const styles = {
      display: "none",
      "border-radius": "50%",
      border: "10px solid #f2f2f2"
    };
    return el("img")
      .css(styles)
      .on("load", e => {
        e.target.css("display", "block");
      });
  }
}

module.exports = Image;