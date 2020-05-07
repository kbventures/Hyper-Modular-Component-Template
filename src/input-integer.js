const csjs = require("csjs-inject");
const html = require("nanohtml");

module.exports = inputInteger;

function inputInteger(data, notify) {
  const { value = "0", placeholder = "number" } = data;

  //notify({ type: "update", body: 123 });
  const input = html`<input
    class=${css.inputInteger}
    type="number"
    placeholder=${placeholder}
    value=${value}
  />`;
  input.onchange = (event) => {
    notify({ type: "update", body: input.value });
  };
  return input;
}

const css = csjs`
.inputInteger {
  background-color:lightgreen;
}`;
