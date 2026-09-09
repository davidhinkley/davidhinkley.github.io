# 🐍 David's Python Foundations

### *An interactive beginner course that runs entirely in your browser — no install, no account, no fear.*

<p align="center">
  <img src="Pyf-icon.svg" width="96" height="96" alt="Pyf course icon">
</p>

<p align="center">
  <b>Read a little. Run a lot. Break things on purpose. Build 5 real programs.</b><br>
  Python 3.12 • 100 runnable code boxes • Built-in console • 6 quizzes • 19 exercises • 5 guided projects
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12-blue?style=flat-square&logo=python" alt="Python 3.12">
  <img src="https://img.shields.io/badge/Runs-100%25_in_browser-green?style=flat-square" alt="Runs in browser">
  <img src="https://img.shields.io/badge/Install-nothing_needed-brightgreen?style=flat-square" alt="No install">
  <img src="https://img.shields.io/badge/Offline-works_after_first_load-orange?style=flat-square" alt="Offline ready">
  <img src="https://img.shields.io/badge/Privacy-nothing_leaves_your_tab-lightgrey?style=flat-square" alt="Private">
</p>

Live site: **https://davidhinkley.github.io/python-course.html** — featured on [https://davidhinkley.github.io](https://davidhinkley.github.io).

---

## ⚡ Quick start

An interactive beginner Python course in a single HTML file. Zero install.

1. Open https://davidhinkley.github.io/python-course.html in any modern browser (Firefox, Chrome, Edge, Safari — Windows, macOS, Linux, Chromebook).
   - Or locally: open `python-course.html` from this repo in your browser.

That's it. You get:

- 100 runnable / editable code boxes (+ 7 reference boxes)
- Built-in Python console (REPL)
- 6 quizzes, 19 exercises with solutions, 5 guided projects
- Python runs locally in your browser tab and stays completely local
- First load fetches the Python engine (~10 MB) once; after that it works offline
- Progress and saved edits are stored by your browser (`localStorage`)

---

## 📁 Site files

| File | Role |
|---|---|
| `index.html` | **Landing page** for https://davidhinkley.github.io — introduces and links both courses. |
| `python-course.html` | **The whole Foundations course.** Content + browser runtime in one self-contained file. This is the only file you need to run or share the course. |
| `Pyf-icon.svg` | Foundations course icon (`Pyf` badge). Used as favicon / brand icon for `python-course.html` and on `index.html`. |
| `python-course.md` | This file — the friendly guide to the Foundations course. |
| `python-intermediate.html` | The Intermediate course (see `python-intermediate.md`). |
| `PyI-icon.svg` | Intermediate course icon (`PyI` badge). |

> Do not edit `python-course.html` unless you mean to change the course itself — your edits and progress are stored separately in your browser.

---

## What is this?

**David's Python Foundations** is a complete Python 3 course packed into a single file: **`python-course.html`**.

Open it, and you get a real Python interpreter, a textbook, a lab, a quiz master, and a patient debugger — all in one tab.

> If you've never written a line of code, start here. If you've bounced off other tutorials, try this one. You don't read about Python here. **You drive it from line one.**

```python
print("Hello, World!")
print("I am learning Python inside my own browser 🎉")
# 👆 That box is live in the course. Press ▶ Run. Change it. Run it again.
```

---

## ⚡ Try it in 30 seconds

1. Open **`python-course.html`** — via the live site link above, or double-click the local file / drag it into Firefox, Chrome, Edge, or Safari.
2. Wait once for the Python engine to wake up (~10 MB download, first load only).
3. Click **▶ Run** on the first box. Change `"Hello, World!"` to your name. Run again.

That's the whole workflow of the course:

**Read → Predict → Run → Tinker → Break → Fix → Build**

Works on Windows, macOS, Linux, and Chromebook. No terminal. No `pip`. No setup tears.

---

## 💚 Why beginners actually finish this one

| Instead of... | You get... |
|---|---|
| Walls of text to copy-paste elsewhere | **100+ live code boxes** — every example is editable and runnable where you read it |
| "Go install these 5 tools first" | **Zero install.** Python 3.12 runs locally in the tab via Pyodide (CPython → WebAssembly) |
| Passive reading | **Predict-then-Run habit** — every lesson asks you to guess the output before you press Run |
| Fear of red errors | **Deliberate 🐞 crash boxes** — you break code on purpose and learn to read tracebacks bottom-up |
| Lonely exercises with no answers | **19 exercises with hidden solutions + hints** — struggle first, peek only when stuck |
| Abstract quizzes on another site | **6 in-page quizzes (30 questions)** with instant checking and explanations |
| Toy snippets that go nowhere | **5 complete guided projects** you can extend and show off |
| Losing your place | **Auto-saved edits, progress bar, ✅ lesson checkmarks, dark/light theme** — all stored locally |

---

## 🗺️ What you'll learn — the full map

From `print()` to fetching live data from an API.

| Module | You'll learn | You'll build |
|---|---|---|
| **0 · Start Here** | How the course works, the console / REPL, blocks & indentation | Your first program + console superpowers |
| **1 · Variables, Types & Operators** | `print()`, variables, `int/float/str/bool`, strings, f-strings, `input()`, arithmetic, comparisons, logic | Tip calculator, time converter |
| **2 · Control Flow** | `if/elif/else`, `for` + `range()`, looping over data, `while`, `break/continue`, debugging tracebacks | 🎮 **Project 1: Number Guessing Game** |
| **3 · Data Structures** | Lists + methods, tuples & unpacking, dicts (incl. counting pattern), sets, how to choose | 📝 **Project 2: To-Do List Manager** |
| **4 · Functions & Modules** | `def`, `return` vs `print`, defaults & keywords, scope, `math` & `random`, writing your own module | 🧮 **Project 3: Calculator** |
| **5 · Objects & Classes** | Classes vs objects, `__init__` & `self`, methods & `__str__`, inheritance & `super()` | Bank accounts, rectangles, `Student(Person)` |
| **6 · Files & Errors** | `open()` modes, `with` auto-close, `try/except/else/finally`, `raise`, bullet-proof `input()` | Crash-proof programs, settings file |
| **7 · Projects** | Combining everything: dict-of-dicts worlds, classes + game loops, persistence with `datetime` | 🏰 **Project 4: Escape the Manor** + 📔 **Capstone: Personal Journal** |
| **8 · Ecosystem** | `pip` / `micropip`, `numpy` arrays, `json`, real APIs with `pyfetch`/`requests`, `help()`, editors, what's next | Live web data fetch, weather parser |
| **Appendix A · Error Field Guide** | 12 classic errors with a runnable "error zoo" — `SyntaxError` to `EOFError` | Debugging confidence |
| **Appendix B · Cheat Sheet** | The whole course on one screen | Your forever reference |
| **Appendix C · Checklist** | What makes a great beginner course — and where you got each piece | Proof you're ready |

> **Total in-app:** ~100 runnable boxes + 6 static references, 6 quizzes, 19 exercises with solutions, 5 guided projects, 12-error field guide, 1-page cheat sheet.

---

## 🧪 Interactive superpowers

### ✏️ Live code boxes
- **▶ Run** executes instantly below the box. **↺** restores the original.
- `Ctrl`+`Enter` (⌘ on Mac) runs from the keyboard. `Tab` indents 4 spaces.
- Edit fearlessly — your changes **auto-save in the browser**.
- Python **remembers variables between boxes** like a real session. Confused? Hit **↻ Reset** in the top bar for fresh state.

### `>_ ` Built-in Python console (REPL)
Press the green `>_ ` button (bottom-right). It's a real `>>>` prompt:

- One-liners for quick experiments: `2 + 2`, `"py" + "thon"`, `10 ** 100`
- Full blocks with auto-indent: `for`, `if`, `def`, `while` — type header, body, then **empty Enter to run**, `Ctrl+C` to cancel
- **Shares state with lesson boxes** — set `x = 5` in a lesson, inspect `x` in the console

### 📝 Quizzes that teach, not trick
Multiple-choice with **Check answers → instant explanations → Try again**. Perfect scores get a 🏆 toast. No account, no grading server.

### 🎯 Exercises with dignity
Every exercise starts as a `TODO` starter. Hints are in `<details>`, solutions stay hidden until *you* decide. Example progression: *Swap two variables → FizzBuzz → PIN lockout → Palindromes → Gradebook → `safe_divide`*.

### 💡 Callouts everywhere
- 💡 **Why it matters** — the real-world reason behind the syntax
- ✅ **Tips & style advice** — what pros actually do
- ⚠️ **Warnings** — `=` vs `==`, infinite `while`, `set()` vs `{}`, `print` vs `return`
- 🍪 **Analogies** — variables as labelled boxes, `with` as auto-return library books
- 🐞 **Crash labs** — read the *last line* first, add a `print()` before the crash

### 📊 Progress that survives a coffee break
Sidebar contents with active-section highlight, top-bar progress bar (`7 / 54 lessons`), per-lesson **Mark complete** buttons, saved edits, dark 🌙 / light ☀️ theme. All in `localStorage` — private to you.

---

## 🏆 The 5 programs you'll finish

1. **🎮 Number Guessing Game** — `random`, `while True`, `input()`, counters, `break`
2. **📝 To-Do List Manager** — command loop (`add/list/done/quit`), lists, `enumerate`, safe indexes
3. **🧮 Calculator** — tiny functions + thin `main()`, dispatch, divide-by-zero grace
4. **🏰 Escape the Manor** — text adventure with rooms-as-dicts, `Player` class, `go/take/look/quit` parser
5. **📔 Personal Journal (capstone)** — `datetime` stamps, `date|text` file format, load/save that survives missing files and bad lines, then a JSON upgrade path

Each project has a **starter → build order → hints → full solution → 🚀 extensions** (attempt limits, priorities, monsters, locked doors, history command).

---

## 🖥️ How to run it (browser — zero install)

Just open the page:

```text
https://davidhinkley.github.io/python-course.html  →  hosted version
python-course.html  →  double-click / drag into browser (local copy)
```

- First load needs internet once to fetch the Python engine (~10 MB, then cached).
- After that: **fully local, works offline, nothing leaves your tab.**
- `input()` shows as a small pop-up dialog. **Cancel = `EOFError`** (you'll learn to handle it in Module 6 — on purpose).
- Files you create live in a **sandboxed in-browser filesystem** and vanish when the tab closes. Code is identical to desktop Python.
- True `while True:` with no `break` will freeze the tab — just reload, your code is saved.

Supported browsers: current Firefox, Chrome, Edge, and Safari on Windows, macOS, Linux, and Chromebook. Older browsers fall back gracefully (solid backgrounds instead of tinted callouts).

---

## 🔒 Privacy & requirements

- **Requirements:** Any modern browser (Firefox / Chrome / Edge / Safari).
- **Privacy:** Code runs locally. No telemetry, no account, no server. Progress lives in your browser (`localStorage`).
- **Offline:** Yes, after first engine download. The live-API lesson in 8.3 is the only one that needs internet on purpose.

---

## 🛠️ Browser troubleshooting

- **Python engine won't load / boxes stay read-only:** check internet on first load (~10 MB), then reload. Use “keep reading anyway” to browse lessons offline and Run once the engine is cached.
- **`numpy` box says “No module named 'numpy'”:** in-browser packages load via `micropip`. The course auto-loads it on `import numpy` where supported — otherwise run that box after internet is available.
- **`help(len)` prints a lot:** that's normal — it's Python's real documentation. Scroll the output box.
- **Where are my files / progress?** In-page virtual filesystem (cleared on tab close) + `localStorage` for code edits and checkmarks. Clear-site-data in the browser will wipe saved edits/progress.
- **I froze the tab with `while True:`:** reload. Your code is saved. Every `while` needs something in its body that moves the condition toward `False`.

---

## 👩‍💻 Who is this for?

**Perfect if you are:**
- An absolute beginner who's never coded
- A returning learner who got stuck on setup, errors, or "tutorial hell"
- A student, teacher, or parent who wants one page that just works on a Chromebook
- A tinkerer who learns by breaking and fixing

**You need:** zero programming experience, basic computer comfort, and willingness to type (not copy-paste).

**After you finish you will be able to:**
- Read, write, and debug ~100-line Python programs with confidence
- Use variables, loops, conditionals, lists/dicts/sets/tuples, functions, classes, files, and exceptions correctly
- Structure small projects with functions and modules
- Read tracebacks, use `help()`, search docs effectively, and install packages with `pip` (Lesson 8.4)
- Take any starter idea (quiz game, timer, file organizer, journal) from blank file to working program

---

## ✅ How to get the most out of it

1. **Type, don't paste.** Your fingers learn too.
2. **Predict before you Run.** Wrong guesses teach the most.
3. **Do exercises before opening solutions.** Struggle is the feature.
4. **Break things weekly.** Change numbers, delete colons, feed letters to `int()`.
5. **Keep the console open.** Answer every "what does *this* do?" in 5 seconds.
6. **Finish the 5 projects.** Then add one extension each — that's your portfolio.
7. **When stuck:** read last traceback line → `print()` the data right before the crash → check Appendix A → ask the console.

---

## ❓ FAQ

**Do I need to install Python first?**
No. Python comes *inside* the page. Install real Python later (Lesson 8.4 walks you through python.org + VS Code / Thonny / PyCharm).

**Why does `input()` pop up a dialog?**
Browsers can't block on terminal input, so the course bridges it with a dialog. Same Python semantics, slightly different UI. Cancel raises `EOFError` — which you learn to catch gracefully.

**Where did my files / progress go?**
Browser: in-page virtual filesystem (cleared on tab close) + `localStorage` for code edits and checkmarks.

**Can I use `pip`, `numpy`, `requests`?**
In-browser: `micropip` installs real wheels (`import micropip` auto-loads it), `numpy` auto-installs on first `import numpy` where supported, web fetching uses `pyfetch` instead of sockets. Full `pip` + any package works once you install Python on your own computer (Lesson 8.4).

**I froze the tab with `while True:` — did I break it?**
No. Reload. Your code is saved. Every `while` needs something in its body that moves the condition toward `False` — Module 2 drills this until it's reflex.

**Is this Python 2 or 3?**
Python 3.12 (modern Python 3: f-strings, `pathlib`-era idioms, `:.2f` formatting, `super()` without args). No Python 2-isms.

---

## 🚀 After the course

You won't need another "beginner syntax" course. Do this instead:

- **Build weekly:** quiz game, pomodoro timer, download renamer, birthday reminder that saves to a file
- **Learn in order:** list comprehensions → `os/csv/re/sqlite3/datetime` → `pytest` → pick a lane: Flask/FastAPI (web), pygame (games), pandas (data), requests + BeautifulSoup (automation) — or continue with **[David's Python Intermediate](https://davidhinkley.github.io/python-intermediate.html)**
- **Read like a pro:** `help(len)`, [docs.python.org/3](https://docs.python.org/3), *Automate the Boring Stuff* (free online), and precise searches: *"python 3 how to sort list of dicts"*

> As the course says at the end: *You started with `print("Hello, World!")` and ended by fetching live data from an API. Go build something.* 🐍

---

<p align="center">
  <b>David's Python Foundations</b> · single HTML file · Python 3.12 in your tab via Pyodide · no data ever leaves your browser<br>
  Open <code>python-course.html</code> and press ▶ Run. Happy hacking!
</p>
