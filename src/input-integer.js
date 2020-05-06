const csjs = require("csjs-inject");
const html = require("nanohtml");

module.exports = inputInteger;

function inputInteger() {
  return html`<input
    class=${css.inputInteger}
    type="number"
    placeholder="Number"
  />`;
}

const css = csjs`
.inputInteger {
  background-color:lightgreen;
}`;
