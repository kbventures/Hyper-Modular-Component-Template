const csjs = require("csjs-inject");
const parser = document.createElement("randomName");

module.exports = inputInteger;

function inputInteger() {
  parser.innerHTML = `<input type="number" placeholder="Number">`;
  const element = parser.children[0];
  return element;
}
