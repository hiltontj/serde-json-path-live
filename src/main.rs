use dioxus::prelude::*;
use serde_json_path::JsonPath;

const MAIN_CSS: Asset = asset!("/assets/main.css");

const DEFAULT_JSON: &str = r#"{
  "store": {
    "books": [
      {
        "title": "Guns, Germs, and Steel",
        "author": "Jared Diamond",
        "category": "reference",
        "price": 24.99
      },
      {
        "title": "David Copperfield",
        "author": "Charles Dickens",
        "category": "fiction",
        "price": 12.99
      },
      {
        "title": "Moby Dick",
        "author": "Herman Melville",
        "category": "fiction",
        "price": 8.99
      },
      {
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoevsky",
        "category": "fiction",
        "price": 19.99
      }
    ]
  }
}"#;

const QUERY_EXAMPLES: &[&str] = &[
    "$.store.books[?@.author == 'Fyodor Dostoevsky']['title', 'author', 'price']",
    "$.store.books[?search(@.author, 'Diamond|Dickens')]",
    "$.store.books[?@.price < 20 && @.price > 10]",
    "$..books[?@.price < 20].title",
    "$..books[?@.category == 'reference'].*",
    "$.store.books[::-1]",
    "$..author",
];

fn random_query() -> &'static str {
    use rand::Rng;
    let idx = rand::thread_rng().gen_range(0..QUERY_EXAMPLES.len());
    QUERY_EXAMPLES[idx]
}

fn run_query(json_str: &str, query_str: &str, located: bool) -> Result<String, String> {
    let value: serde_json::Value =
        serde_json::from_str(json_str).map_err(|e| format!("Invalid JSON: {e}"))?;
    let path =
        JsonPath::parse(query_str).map_err(|e| format!("Invalid JSONPath query: {e}"))?;

    if located {
        let nodes = path.query_located(&value);
        let output: Vec<serde_json::Value> = nodes
            .iter()
            .map(|node| {
                serde_json::json!({
                    "location": node.location().to_string(),
                    "value": node.node(),
                })
            })
            .collect();
        serde_json::to_string_pretty(&output).map_err(|e| format!("Serialization error: {e}"))
    } else {
        let nodes = path.query(&value);
        let output: Vec<&serde_json::Value> = nodes.all();
        serde_json::to_string_pretty(&output).map_err(|e| format!("Serialization error: {e}"))
    }
}

fn main() {
    launch(App);
}

#[component]
fn App() -> Element {
    let mut json_input = use_signal(|| DEFAULT_JSON.to_string());
    let mut query_input = use_signal(|| random_query().to_string());
    let mut query_output = use_signal(String::new);
    let mut is_located = use_signal(|| false);
    let mut error_msg: Signal<Option<String>> = use_signal(|| None);
    let mut show_info = use_signal(|| false);

    let handle_run = move |_| {
        match run_query(&json_input.read(), &query_input.read(), *is_located.read()) {
            Ok(output) => {
                error_msg.set(None);
                query_output.set(output);
            }
            Err(e) => {
                error_msg.set(Some(e));
            }
        }
    };

    rsx! {
        document::Link { rel: "stylesheet", href: MAIN_CSS }

        div { id: "main",
            // Header
            div { class: "header",
                div { class: "header-row",
                    h1 { "JSONPath Sandbox" }
                    button {
                        class: "info-btn",
                        title: "About",
                        onclick: move |_| show_info.set(!show_info()),
                        "ℹ"
                    }
                }
            }

            // Info banner
            if show_info() {
                div { class: "banner banner-info",
                    button {
                        class: "banner-dismiss",
                        onclick: move |_| show_info.set(false),
                        "×"
                    }
                    h3 { "About" }
                    p {
                        "This is the sandbox environment for "
                        span { class: "serde-json-path", "serde_json_path" }
                        ", a Rust implementation of the JSONPath standard (RFC 9535) for querying JSON data."
                    }
                    p {
                        "The sandbox runs entirely in the browser by compiling "
                        span { class: "serde-json-path", "serde_json_path" }
                        " to WebAssembly."
                    }
                    p {
                        "Learn more about JSONPath by reading the "
                        a { href: "https://www.rfc-editor.org/rfc/rfc9535.html", target: "_blank", "JSONPath Standard" }
                        ", and more about "
                        span { class: "serde-json-path", "serde_json_path" }
                        " by following the links at the bottom of the page. The code for this website can be found "
                        a { href: "https://github.com/hiltontj/serde-json-path-live", target: "_blank", "here" }
                        "."
                    }
                }
            }

            // Query bar
            div { class: "query-bar",
                input {
                    class: "query-input",
                    placeholder: "Enter a JSONPath query...",
                    value: "{query_input}",
                    oninput: move |e| {
                        error_msg.set(None);
                        query_input.set(e.value());
                    },
                    onkeypress: move |e| {
                        if e.key() == Key::Enter {
                            let json = json_input.read().clone();
                            let query = query_input.read().clone();
                            let located = *is_located.read();
                            match run_query(&json, &query, located) {
                                Ok(output) => {
                                    error_msg.set(None);
                                    query_output.set(output);
                                }
                                Err(e) => {
                                    error_msg.set(Some(e));
                                }
                            }
                        }
                    },
                }
                if error_msg.read().is_some() {
                    button { class: "run-btn error", "⚠ Error" }
                } else {
                    button { class: "run-btn", onclick: handle_run, "Run Query" }
                }
            }

            // Error banner
            if let Some(err) = error_msg.read().as_ref() {
                div { class: "banner banner-error",
                    button {
                        class: "banner-dismiss",
                        onclick: move |_| error_msg.set(None),
                        "×"
                    }
                    "{err}"
                }
            }

            // Editors
            div { class: "editors",
                div { class: "editor-panel",
                    div { class: "editor-label-row", "JSON Input" }
                    textarea {
                        spellcheck: false,
                        value: "{json_input}",
                        oninput: move |e| json_input.set(e.value()),
                    }
                }
                div { class: "editor-panel",
                    div { class: "editor-label-row",
                        span { "Query Output" }
                        label { class: "toggle-label",
                            input {
                                r#type: "checkbox",
                                checked: is_located(),
                                onchange: move |_| is_located.set(!is_located()),
                            }
                            "Located"
                        }
                    }
                    textarea {
                        spellcheck: false,
                        readonly: true,
                        value: "{query_output}",
                    }
                }
            }

            // Footer
            div { class: "footer",
                "Queries powered by Rust using the "
                span { class: "serde-json-path", "serde_json_path" }
                " crate: "
                a { href: "https://github.com/hiltontj/serde_json_path", target: "_blank", title: "GitHub", "GitHub" }
                a { href: "https://docs.rs/serde_json_path/latest/serde_json_path/", target: "_blank", title: "Docs", "Docs" }
                a { href: "https://crates.io/crates/serde_json_path", target: "_blank", title: "Crates.io", "Crates.io" }
            }
        }
    }
}
