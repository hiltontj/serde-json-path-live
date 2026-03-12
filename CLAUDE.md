# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Browser-based sandbox for querying JSON with JSONPath (RFC 9535), powered by the Rust `serde_json_path` crate compiled to WebAssembly via Dioxus. Live at https://serdejsonpath.live.

## Commands

- `dx serve` — dev server on port 8080 with hot reload
- `dx build --release` — production build to `target/dx/serde-json-live/release/web/public/`
- `cargo fmt` — format Rust code
- `cargo clippy --target wasm32-unknown-unknown` — lint

Requires: `cargo install dioxus-cli`, `rustup target add wasm32-unknown-unknown`

## Architecture

Single-binary Dioxus 0.7 web app (`src/main.rs`). All state is local Dioxus signals — no external state management. The `serde_json_path` crate is a direct Cargo dependency, so updating it is just a version bump in `Cargo.toml`.

### Core Flow

`run_query()` parses JSON with `serde_json`, parses the JSONPath query with `JsonPath::parse()`, then executes with either `.query()` or `.query_located()` based on the "Located" toggle. Results are serialized back to pretty-printed JSON for display.

### UI

- Two textareas side-by-side: JSON input (editable) and query output (read-only)
- Dark theme with accent color `#e5840f`, styled in `assets/main.css`
- Font: Source Code Pro (loaded from Google Fonts)

## Deployment

GitHub Actions CI (`.github/workflows/ci.yml`) builds and deploys to GitHub Pages on push to `main`.
