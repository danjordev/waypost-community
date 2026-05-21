# Waypost — Co-founder Onboarding Guide

Welcome to the Waypost project. This guide will walk you through everything you need to get set up, make changes, and push updates to the shared codebase — no prior coding experience required.

---

## What you're working on

**Waypost** is a free website that gives military spouses a personalized guide to their new town when they PCS. A visitor answers a short questionnaire (kids' ages, priorities, dining preferences, etc.) and receives a custom guide with schools, sports leagues, restaurants, military discounts, and more — specific to their answers.

The current prototype covers **Fallbrook, CA** (near Camp Pendleton) and is built to eventually support many towns. It's three pages:
- `index.html` — Town selector home page
- `questionnaire.html` — The intake questionnaire
- `guide.html` — The personalized guide with a sidebar (Save, To Do, Contacts)

---

## Part 1: One-Time Setup

Do this once. After this, you're ready to work anytime.

### Step 1 — Accept the GitHub invitation

Check your email for an invitation from GitHub to join the `waypost-community` repository. Click **Accept invitation**. If you don't have a GitHub account yet, you'll be prompted to create a free one first.

### Step 2 — Install Git

Git is the tool that syncs your work with the shared codebase.

1. Go to [git-scm.com/downloads](https://git-scm.com/downloads)
2. Download and install for your operating system
3. During installation, accept all the default settings

To verify it worked: open **Terminal** (Mac) or **Command Prompt** (Windows) and type `git --version`. You should see a version number.

### Step 3 — Tell Git who you are

In your terminal, run these two lines (replace with your actual name and the email tied to your GitHub account):

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### Step 4 — Download the project

In your terminal, navigate to where you want to keep the project (e.g., your Documents folder), then run:

```
git clone https://github.com/danjordev/waypost-community.git
```

This creates a `waypost-community` folder on your computer with all the project files.

### Step 5 — Install Claude Code

Claude Code is the AI tool you'll use to make changes. You interact with it in plain English — no need to edit code files directly.

1. Go to [claude.ai/code](https://claude.ai/code) and follow the installation instructions
2. You'll need an Anthropic account (free to create) and an API key
3. Once installed, you can open Claude Code in any folder by typing `claude` in your terminal

---

## Part 2: Every Time You Work

Follow these steps each time you sit down to make edits.

### Step 1 — Get the latest version

Before you change anything, always pull the most recent version from GitHub so you're working with up-to-date files:

```
git pull
```

Run this in your terminal from inside the `waypost-community` folder.

### Step 2 — Open Claude Code

In your terminal, navigate into the project folder and start Claude Code:

```
cd waypost-community
claude
```

Claude Code will load with full knowledge of the Waypost project — what the files do, the design decisions already made, and the brand guidelines. You don't need to explain the project from scratch each session.

### Step 3 — Describe what you want to change

Just tell Claude Code what you want in plain English. A few examples:

> "Update the La Casita phone number in guide.js to (760) 555-1234"

> "Add a new church called Grace Fellowship at 123 Main Ave to the faith community section"

> "Change the terracotta color to be a bit more muted"

> "Add a new town card for Oceanside / Camp Pendleton to the home page"

Claude Code will make the changes and explain what it did. You can preview the result by opening the HTML files in your browser (just double-click `index.html`).

### Step 4 — Review the changes

Before saving your work, take a quick look. Claude Code will tell you which files it changed. You can open those files or just preview the site in your browser to make sure everything looks right.

If something isn't right, tell Claude Code:

> "That's not quite right — can you make the font a bit larger on that card?"

### Step 5 — Commit and push your changes

When you're happy with the result, ask Claude Code to save and upload your work:

> "Please commit and push these changes"

Claude Code will handle the git commands. It will ask you to confirm the commit message (a short description of what changed) and then push everything to GitHub.

Alternatively, you can do it yourself in the terminal:

```
git add .
git commit -m "brief description of what you changed"
git push
```

---

## Part 3: Project File Reference

You don't need to edit these files directly — Claude Code does that for you — but it helps to know what each one does.

| File | What it does |
|---|---|
| `index.html` | Home page — the town selector grid |
| `questionnaire.html` | The 5-step intake questionnaire |
| `guide.html` | The guide page with sidebar (structure only) |
| `guide.js` | All the guide logic: generates content, handles Save/To Do/Contacts |
| `app.js` | Questionnaire logic — collects answers and sends to guide |
| `styles.css` | All visual design — colors, layout, fonts |
| `towns.js` | The town card data shown on the home page |
| `README.md` | Project summary (for GitHub) |

**The file you'll touch most often:** `guide.js` — this is where all the Fallbrook content lives (restaurant names, phone numbers, school info, sports leagues, etc.).

---

## Part 4: Coordination

Since two people are working on this codebase, follow these simple rules to avoid stepping on each other's toes:

1. **Always `git pull` before you start.** This ensures you have the latest version.

2. **Give each other a heads-up.** A quick message like "working on guide.js today" prevents conflicts.

3. **Don't work on the same file at the same time.** If you do end up with a conflict, Claude Code can help resolve it — just tell it "I have a git conflict, can you help?"

4. **Commit and push at the end of every session.** Don't leave unpushed changes sitting on your computer overnight.

---

## Part 5: Common Tasks

### Updating a phone number or address
> "Update the phone number for [business name] in guide.js to [new number]"

### Adding a new restaurant or business
> "Add a new family-friendly restaurant called [name] at [address] to the family dining section in guide.js. The phone number is [number] and here's a description: [description]"

### Adding a contact's todo items
> "Add todo action items for [business/school name] in guide.js — the steps are: [list them out]"

### Changing colors or fonts
> "Change the terracotta color to [description or hex code]" — Claude Code will update `styles.css`

### Adding a new town card to the home page
> "Add a town card for [city], [state] near [base name] to towns.js. Status is coming-soon. Here's a tagline: [tagline]"

---

## If Something Goes Wrong

**"I made a mistake and want to undo my last change"**
> Tell Claude Code: "Can you undo the last change I made?"

**"I accidentally pushed something wrong"**
> Tell Claude Code: "I pushed something incorrect — can you help me revert it?" and describe what happened.

**"Claude Code doesn't seem to know about the project"**
> Say: "This is the Waypost project — a free welcome guide for military spouses. Please read the project files to get context before we start."

**"Git says there's a conflict"**
> Don't panic. Tell Claude Code: "I have a merge conflict when I tried to pull. Can you walk me through resolving it?"

---

*Built for military families. Questions? Reach out to your co-founder.*
