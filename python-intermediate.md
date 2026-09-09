# 🐍 David's Python Intermediate

### *From 100-line scripts to 400-line tested programs — the intermediate course that runs in your browser and grows into your terminal.*

<p align="center">
  <img src="PyI-icon.svg" width="96" height="96" alt="PyI course icon">
</p>

<p align="center">
  <b>Read a little. Trace a lot. Break things on purpose. Ship 3 tested programs.</b><br>
  Python 3.12 • 139 runnable code boxes • Built-in console • 6 quizzes • 21 exercises • 3 capstones
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12-blue?style=flat-square&logo=python" alt="Python 3.12">
  <img src="https://img.shields.io/badge/Runs-100%25_in_browser-green?style=flat-square" alt="Runs in browser">
  <img src="https://img.shields.io/badge/Install-nothing_needed-brightgreen?style=flat-square" alt="No install">
  <img src="https://img.shields.io/badge/Offline-works_after_first_load-orange?style=flat-square" alt="Offline ready">
  <img src="https://img.shields.io/badge/Privacy-nothing_leaves_your_tab-lightgrey?style=flat-square" alt="Private">
</p>

Live site: **https://davidhinkley.github.io/python-intermediate.html** — featured on [https://davidhinkley.github.io](https://davidhinkley.github.io).

> **Prerequisite:** this course starts where *David's Python Foundations* ends. You should be comfortable with variables, loops, lists/dicts, functions, basic classes, files + `try/except`. Not sure? Lesson 0.2 is a 10-task entry diagnostic — score under 7/10 and it tells you exactly which Foundations modules to redo.

---

## ⚡ Quick start

An interactive intermediate Python course in a single HTML file. Zero install to start.

1. Open https://davidhinkley.github.io/python-intermediate.html in any modern browser (Firefox, Chrome, Edge, Safari — Windows, macOS, Linux, Chromebook).
   - Or locally: open `python-intermediate.html` from this repo in your browser.

That's it. You get:

- 139 runnable / editable code boxes (+ 29 reference boxes and transcripts)
- Built-in Python console (REPL), sharing state with the lesson boxes
- 6 quizzes (30 questions), 21 exercises with solutions, 3 portfolio capstones
- Python runs locally in your browser tab and stays completely local
- First load fetches the Python engine (~10 MB) once; after that it works offline
- Progress and saved edits are stored by your browser (`localStorage`, separate `pyi:*` namespace — safe to run side-by-side with Foundations)

From Module 6 on you'll also use the terminal on your own computer (`venv`, real files, `pytest`) — Lesson 0.3 sets it up in five minutes. Browser for concepts, terminal for real files, CLIs, venv, and pytest.

---

## 📁 Site files

| File | Role |
|---|---|
| `index.html` | **Landing page** for https://davidhinkley.github.io — introduces and links both courses. |
| `python-intermediate.html` | **The whole Intermediate course.** Content + browser runtime in one self-contained file. This is the only file you need to run or share the course. |
| `PyI-icon.svg` | Intermediate course icon (`PyI` badge). Used as favicon / brand icon for `python-intermediate.html` and on `index.html`. |
| `python-intermediate.md` | This file — the friendly guide to the Intermediate course. |
| `python-course.html` | The Foundations course (see `python-course.md`). |
| `Pyf-icon.svg` | Foundations course icon (`Pyf` badge). |

> Do not edit `python-intermediate.html` unless you mean to change the course itself — your edits and progress are stored separately in your browser.

---

## What is this?

**David's Python Intermediate** is a complete intermediate Python 3 course packed into a single file: **`python-intermediate.html`**.

It assumes ~100-line Foundations programs and graduates you to **200–400-line tested, CLI-driven programs** built from the standard library plus `pytest`: comprehensions and generators, dataclasses and properties, `pathlib`/`csv`/`json`/`sqlite3`, `argparse`/`logging`/`pytest`, decorators and context managers — ending in three capstones (CLI tool, CSV→SQLite reporter, tested mini-API).

Open it, and you get a real Python interpreter, a code-review-minded textbook, a crash lab, a quiz master, and a terminal coach — all in one tab.

```python
from collections import Counter

votes = ["yes", "no", "yes", "yes"]
print(Counter(votes).most_common(1))  # [('yes', 3)] — Module 1 in one line
# 👆 That box is live in the course. Predict. Trace. Run. Break it.
```

---

## ⚡ Try it in 30 seconds

1. Open **`python-intermediate.html`** — via the live site link above, or double-click the local file / drag it into Firefox, Chrome, Edge, or Safari.
2. Wait once for the Python engine to wake up (~10 MB download, first load only).
3. In Lesson 0.1, **predict** what the `Counter` box prints, **trace** `counts["berry"]` on paper, then press **▶ Run**.

That's the whole workflow of the course:

**Read → Predict → Run → Tinker → Break → Fix → Build**

…with the intermediate layer added between Predict and Run: **Predict → Trace → Run** (*"what is `x` at line N?"* before you touch Run).

Works on Windows, macOS, Linux, and Chromebook. The browser covers concepts; from Module 6 on you'll also use your terminal (`venv`, real files, `pytest`) — Lesson 0.3 sets it up in five minutes.

---

## 🟢🟡🔴 Where does each lesson run?

Every lesson wears one badge (legend also in Lesson 0.3):

| Badge | Meaning | You… |
|---|---|---|
| 🟢 Browser-safe | Runs identically in this tab (Pyodide) | press Run here |
| 🟡 Browser-adapted | Same concept, shimmed I/O (in-memory files / `pyfetch`) | run here, read the banner, redo on your PC with real files / `requests` |
| 🔴 Terminal-required | Needs a real CLI: venv, multi-file, pytest | do it on your PC — the browser box is read-only |

Rule of thumb for the whole course: **browser for concepts, your own terminal for real files, CLIs, venv, and pytest.**

---

## 💚 Why intermediates actually finish this one

| Instead of... | You get... |
|---|---|
| "You're past beginner, good luck" | A **0.2 entry diagnostic** that proves readiness (or prescribes exactly what to redo) |
| Endless syntax lists | **Idioms that delete code** — comprehensions, unpacking, `Counter`, genexps, dataclasses |
| Toy snippets | **3 portfolio capstones** (CLI tool, data reporter, mini-API) with spec → build order → tests |
| Fear of real tooling | **`venv`, `argparse`, `logging`, `pytest`, `pdb`** taught as transcripts + real runs, never faked |
| Silent bad habits | **🐞 crash labs in every module** — mutable defaults, late binding, exhausted generators, greedy regex, swallowed exceptions |
| Abstract quizzes elsewhere | **6 in-page quizzes (30 questions)** with instant explanations |
| Losing your place | **Auto-saved edits, progress bar, lesson checkmarks, dark/light theme** — all stored locally |

---

## 🗺️ What you'll learn — the full map

From `Counter` one-liners to a tested JSON API.

| Module | You'll learn | You'll build |
|---|---|---|
| **0 · Bridge In** | What "intermediate" means, entry diagnostic, browser↔terminal setup, traceback refresher | venv + project folder, trace-table habit |
| **1 · Pythonic Data** | Comprehensions (and when NOT), `enumerate`/`zip`/`sorted(key)`, `*` unpacking, `Counter`/`defaultdict`/`namedtuple`, `join`, truthiness | Top-words reporter |
| **2 · Functions as Objects** | First-class functions, lambda discipline, closures + late-binding trap, `map`/`filter` vs comps, `itertools`, `lru_cache`/`partial` | Dispatch table, ranked leaderboard |
| **3 · Lazy Python** | Iterator protocol, `yield`, `yield from`, genexps, lazy pipelines, `contextlib` bridge | Log pipeline, chunked batches |
| **4 · OOP That Pays** | `@dataclass`, `str`/`repr`/`eq`/`len`, composition vs inheritance, `@property` validation, custom exceptions + `raise from` | Refactored Bank account lab |
| **5 · Files, Data & Storage** | `pathlib`, `csv` (quoted commas, `newline=""`), `json` round-trips + live fetch, `sqlite3` CRUD, regex + datetime cleaning | Journal `date\|text` → JSON → SQLite arc |
| **6 · Tooling & Quality** | Layout + venv + pip, `argparse` CLIs, `logging` levels, `pytest` asserts/fixtures, `pdb`/`breakpoint()` discipline | Logged greeting CLI |
| **7 · Power Tools** | Writing + stacking decorators with `wraps` (timer/retry), custom `with` + `@contextmanager`, timed/logged resources | Logged retry decorator |
| **8 · Capstones** | A) CLI file tool, B) CSV→SQLite reporter, C) tested mini-API — spec → build order → tests → extensions | **3 portfolio programs (200–400 lines)** |
| **Appendices** | Regex quick-ref, `itertools` cheat-sheet, error/`pytest` field guide + where-next lanes | Forever references |

> **Total in-app:** 44 lessons, 139 runnable boxes + 29 static references, 6 quizzes (30Q), 21 exercises with solutions, 3 capstones, appendices A–C.

---

## 🧪 Interactive superpowers

Same engine as Foundations, tuned up:

- **▶ Run boxes + `>_ ` console** sharing one Python session; `Ctrl`+`Enter` runs, `↻ Reset` gives fresh state, edits auto-save.
- **Predict → Trace → Run** — solutions show trace tables, not just answers.
- **Quizzes that teach** — Check answers → explanations → Try again, 🏆 on aces.
- **Exercises with dignity** — `TODO` starter → `<details>` hints → hidden solution → 🚀 `+feature / +robustness / +ship` extensions.
- **Callouts everywhere** — 💡 why-it-matters (real-world reason), ✅ tips, ⚠️ footgun warnings, 🍪 systems analogies, 🐞 crash labs (broken box → *read the last line first* → fix in `<details>`).
- **Progress that survives** — sidebar, progress bar (`x / 44 lessons`), per-lesson checkmarks, dark/light, all local.

---

## 🖥️ How to run it

### 1. Browser (start here — zero install)

```text
https://davidhinkley.github.io/python-intermediate.html  →  hosted version
python-intermediate.html  →  double-click / drag into browser (local copy)
```

- First load needs internet once (~10 MB engine, then cached). After that: **fully local, works offline.**
- `input()` is a pop-up dialog; **Cancel = `EOFError`** (Module 0 teaches handling it).
- Files live in a **sandboxed in-memory filesystem** and vanish on tab close. Files on your own PC persist.
- True `while True:` / `list(infinite_generator)` freezes the tab — reload, code is saved. Infinite sources only ever feed `islice`/counters/`break` in this course.
- The `pyfetch`, `micropip`, `breakpoint()`, and `pytest` boxes are terminal/browser-only concepts: runnable where they belong, reference elsewhere, never faked.

Supported browsers: current Firefox, Chrome, Edge, and Safari on Windows, macOS, Linux, and Chromebook.

### 2. Your terminal (for the real thing — Module 6+)

For real files, CLIs, `venv`, and `pytest`, use Python on your own computer (Lesson 0.3 walks through it). Your browser `localStorage` uses separate `pyi:*` keys, so Foundations and Intermediate run side-by-side safely.

---

## 🔒 Privacy & requirements

- **Requirements:** Any modern browser. Terminal work needs Python 3.9+ and a `venv` (Lesson 0.3).
- **Privacy:** Code runs locally. No telemetry, no account, no server. Progress lives in your browser (`localStorage`, `pyi:*` keys).
- **Offline:** Yes, after first engine download. The live-fetch box (5.3) and `micropip` box (6.1) need internet on purpose and degrade to local samples offline.

---

## 🛠️ Troubleshooting

- **Python engine won't load / boxes stay read-only:** check internet on first load (~10 MB), then reload. Browse lessons offline once cached.
- **Where are my files?** Browser lesson files are in-memory and vanish on tab close. Files you create on your own PC persist.
- **A box says "run in terminal":** that's a `pyodide`/`micropip`/`pyfetch`/`breakpoint()`/`pytest` box doing its job — run that one in your `pywork` venv per the lesson.
- **`pip install` fails with `externally-managed-environment`:** that's PEP 668 on Debian/Ubuntu and Python 3.11+. Use a venv (`python3 -m venv .venv && .venv/bin/pip install ...`) — never `--break-system-packages`.
- **I froze the tab:** reload; code is saved. Infinite things only ever feed `islice`, counters, or `break`-guarded loops in this course.
- **Progress wiped?** Clear-site-data in the browser clears `localStorage` (`pyi:*`) edits and checkmarks.

---

## 👩‍💻 Who is this for?

**Perfect if you are:**

- A *David's Python Foundations* graduate (or equivalent: ~100-line programs feel easy)
- A self-taught scripter whose files all live in one folder and break when they grow
- A student who wants portfolio programs with tests, not just snippets
- A tinkerer who learns by breaking and fixing (there are 19 crash labs waiting)

**You need:** Foundations-level fluency (Lesson 0.2 checks it in 10 minutes), Python 3.9+ on your machine for the terminal half, and willingness to type.

**After you finish you will be able to:**

- Write 200–400-line multi-file programs with tests and CLIs
- Replace loops with comprehensions, generators, and stdlib tools (`itertools`, `collections`, `pathlib`, `sqlite3`)
- Design small object models (dataclasses, properties, custom exceptions, composition)
- Run Python like a professional: venvs, `argparse`, `logging`, `pytest`, tracebacks, `pdb`
- Read decorators and context managers fluently — and write your own

---

## ✅ How to get the most out of it

1. **Type, don't paste.** Your fingers learn too.
2. **Predict, then trace, then Run.** Wrong guesses teach the most.
3. **Do exercises before opening solutions.** Struggle is the feature.
4. **Break things weekly.** Feed strings to `int()`, delete `wraps`, `list()` an infinite (once!).
5. **Keep the console open.** Answer every "what does *this* do?" in 5 seconds.
6. **Finish the 3 capstones.** Then add one extension each — that's your portfolio.
7. **When stuck:** read last traceback line → `print()` the data before the crash → check Appendix C → ask the console.

---

## ❓ FAQ

**I haven't done Foundations. Can I start here?**
Take Lesson 0.2's diagnostic first. 7+/10: welcome aboard. Below that, Foundations Modules 2–6 will pay you back fast — this course assumes them fluent.

**Why two machines (browser + terminal)?**
Concepts click fastest with zero setup (browser). Real programs need files that persist, CLIs with real argv, venvs, and pytest (terminal). The badges (🟢🟡🔴) always tell you where you are.

**Where did my files / progress go?**
Browser: in-memory filesystem (cleared on tab close) + `localStorage` (`pyi:*`) for edits and checkmarks. Files on your own PC persist.

**Can I use `pip`, `numpy`, `requests`?**
On your PC: yes, everything real. In the browser tab: `micropip` installs real wheels, `numpy` works if installed, fetching uses `pyfetch` (Lesson 5.3) instead of sockets. Each lesson's boxes say which.

**I froze the tab — did I break it?**
No. Reload; code is saved. Infinite things only ever feed `islice`, counters, or `break`-guarded loops in this course — if you removed the guard while tinkering, that's a successful experiment.

**Is this Python 2 or 3?**
Python 3.12 (dataclasses, `pathlib`, f-strings, `zoneinfo`-era stdlib). No Python 2-isms.

---

## 🚀 After the course

Three lanes from Appendix C — pick the one whose programs excite you:

- **Web:** serve Capstone C properly → HTTP deeply → one framework (Flask/FastAPI/Django)
- **Data:** 10k-row reporters → SQL deeply → pandas, then charts from Capstone B
- **Automation:** scheduled `jstat`-style tools → argparse mastery → packaging, cron/systemd

> As the course says at the end: *You have three tested programs now. Go build the fourth.* 🐍

---

<p align="center">
  <b>David's Python Intermediate</b> · single HTML file · Python 3.12 in your tab via Pyodide · no data ever leaves your browser<br>
  Open <code>python-intermediate.html</code> and press ▶ Run. Happy hacking!
</p>
