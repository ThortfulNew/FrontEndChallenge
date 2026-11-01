# thortful · GitHub Explorer

A single-page app built for the [Thortful Front End Challenge](https://github.com/ThortfulNew/FrontEndChallenge): search GitHub repositories by name, browse their issues, and visualise the numbers.

Styled with Thortful's own brand palette (orange `#ff6900`, slate `#54668e`, pink `#fd7f82`, teal `#2da98d`) and typography (Roboto + Sunday Best), pulled from their live homepage CSS.

## Run it

No build step — just serve the folder over HTTP (templates are fetched via XHR):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Features

- **Search** — debounced repository search against the GitHub Search API, with loading, empty and error states (including rate-limit messaging).
- **Results** — responsive cards showing URL, description, stars, forks, watchers, open issues and language; click to select.
- **Repository overview** — selected repo details, topics, stat cards and a **Chart.js bar chart** of stars / forks / watchers / open issues (the bonus requirement).
- **Issues section** — latest issues (and pull requests) for the selected repository with state, author, comment count and updated date.

## Stack & structure (MVC)

Plain **AngularJS 1.8** components + **Bootstrap 5** + **Chart.js**, all via CDN.

```
index.html                  – shell (Model wiring via components)
css/app.css                 – Thortful-branded theme
js/app.js                   – module definition
js/services/                – Model / data layer
  github.service.js         –   GitHub API wrapper ($http)
  search.service.js         –   search state + debouncing + error handling
  selection.service.js      –   shared "selected repository" state
js/filters/                 – view helpers (stripTags, compactNumber)
js/components/              – View + Controller pairs (.component.js / .template.html)
  search-bar/               –   search input
  repo-card/                –   single result card
  repo-results/             –   results list + states
  repo-detail/              –   overview + Chart.js visualisation
  issues-panel/             –   issues list
```

Components use one-way `<` bindings and a shared service state — no `$rootScope` events.

## Notes

- Unauthenticated GitHub Search API is limited to 10 requests/min; the app debounces input and surfaces a friendly message when the limit is hit.
- GitHub returns `<em>` highlighting in search results, stripped by the `stripTags` filter.
