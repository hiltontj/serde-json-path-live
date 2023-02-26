import css from "./style.css";
const wasm = import("serde-json-path");

const parse_json = async (json, path) => {
  let serde_json_path = await wasm;
  return serde_json_path.parse_json(json, path);
};

const defaultJson = {
  store: {
    books: [
      {
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        category: "reference",
        price: 24.99,
      },
      {
        title: "David Copperfield",
        author: "Charles Dickens",
        category: "fiction",
        price: 12.99,
      },
      {
        title: "Moby Dick",
        author: "Herman Melville",
        category: "fiction",
        price: 8.99,
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        category: "fiction",
        price: 19.99,
      },
    ],
  },
};

const defaultQueryString =
  "$.store.books[?@.author == 'Fyodor Dostoevsky'].title";

const formatJson = (json) => JSON.stringify(json, null, 2);

const jsonPathQueryInput = document.getElementById("json-path-query-input");
jsonPathQueryInput.value = defaultQueryString;
const getQuery = () => jsonPathQueryInput.value;

const jsonInputTextarea = document.getElementById("json-input-textarea");
jsonInputTextarea.value = formatJson(defaultJson);
const initialTextAreaHeight = `${jsonInputTextarea.parentElement.scrollHeight}px`;
jsonInputTextarea.style.height = initialTextAreaHeight;
const getParsedJson = () => JSON.parse(jsonInputTextarea.value);

const queryOutputTextarea = document.getElementById("query-output-textarea");
queryOutputTextarea.style.height = initialTextAreaHeight;

const errorOutputDiv = document.getElementById("error-output-div");
const showErrorOutput = () => (errorOutputDiv.style.display = "block");
const hideErrorOutput = () => (errorOutputDiv.style.display = "none");

const consoleOutputTextarea = document.getElementById(
  "console-output-textarea"
);
const clearConsole = () => {
  consoleOutputTextarea.value = "";
  hideErrorOutput();
};
const setConsole = (value) => {
  consoleOutputTextarea.value = value;
  showErrorOutput();
};

const fmtJsonButton = document.getElementById("button-fmt-json");
fmtJsonButton.addEventListener("click", (_) => {
  try {
    clearConsole();
    const parsedJson = getParsedJson();
    const formattedJson = formatJson(parsedJson);
    jsonInputTextarea.value = formattedJson;
  } catch (error) {
    setConsole(error);
  }
});

const convertQueryResult = (query) => {
  let converted = [];
  for (const r of query) {
    if (r instanceof Map) {
      converted.push(Object.fromEntries(r));
    } else if (r instanceof Array) {
      const c = convertQueryResult(r);
      converted.push(c);
    } else {
      converted.push(r);
    }
  }
  return converted;
};

const runQueryButton = document.getElementById("button-run-query");
runQueryButton.addEventListener("click", async (_) => {
  try {
    clearConsole();
    const query = await parse_json(getParsedJson(), getQuery());
    queryOutputTextarea.value = formatJson(convertQueryResult(query));
  } catch (error) {
    setConsole(error);
  }
});
