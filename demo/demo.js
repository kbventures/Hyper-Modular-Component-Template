const csjs = require("csjs-inject");
const html = require("nanohtml");

//Global Variable tracking our state
const state = {};

const inputInteger = require("..");

function demo() {
  const reset = html`<button>Reset</button>`;
  reset.onclick = (event) => {
    console.log("reset button");
    Object.keys(state).forEach((from) => {
      state[from].notify({ type: "reset", body: 0 });
    });
  };
  const output = html`<div class=${css.output}></div>`;
  const page = html`<div class=${css.demo}>
    <h1>input-integer demos</h1>
    ${output}
    <div class=${css.container}>
      ${inputInteger({ value: 10, placeholder: "integer" }, protocol)}
      ${inputInteger({ value: 20, placeholder: "integer" }, protocol)}
      ${inputInteger({ value: 30, placeholder: "integer" }, protocol)}
    </div>
    ${reset}
  </div>`;
  return page;
  function protocol(message, notify) {
    const { from, value } = message;
    state[from] = { notify, value: value };
    return function listen(message) {
      const { from, type, body } = message;
      if (type === "update") {
        if (!state[from]) throw new Error("unexpected message");
        state[from].value = Number(body);
        updateSummary();
      }
    };
  }
  function updateSummary() {
    const values = Object.keys(state).map((from) => state[from].value);
    const summary = values.reduce((sum, x) => sum + x, 0);

    output.textContent = summary;
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
