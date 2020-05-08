const csjs = require("csjs-inject");
const html = require("nanohtml");

//Global Variable tracking our state
const state = {};

const inputInteger = require("..");

function demo() {
  const output = html`<div class=${css.output}></div>`;
  const page = html`<div class=${css.demo}>
    <h1>input-integer demos</h1>
    ${output}
    <div class=${css.container}>
      ${inputInteger({ value: 1, placeholder: "integer" }, listen)}
      ${inputInteger({ value: 2, placeholder: "integer" }, listen)}
      ${inputInteger({ value: 3, placeholder: "integer" }, listen)}
    </div>
  </div>`;

  return page;

  //Message = {type: 'update', body:5}
  function listen(message) {
    const { from, type, body } = message;
    if (type === "update") {
      if (!state[from]) state[from] = { value: Number(body) };
      else state[from].value = body;

      const values = Object.keys(state).map((from) => state[from].value);
      const summary = values.reduce((sum, x) => sum + x, 0);

      output.textContent = summary;
    }
  }
}

const css = csjs`
  .demo{
    margin:20px;
    padding:20px;
    border: 2px dashed green;
  }
  .output{
    width:auto;
    border:1px solid red;
  }
  .container {
    display:flex;
    flex-direction:column;
    width:50%;
  }`;
document.body.appendChild(demo());
