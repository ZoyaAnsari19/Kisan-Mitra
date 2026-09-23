@AGENTS.md

# CLAUDE.md — Global Project Working Rules

Read this file before making any changes to the project.

These rules are project-agnostic and apply to any language, framework, frontend, backend, database, or infrastructure.

---

## 1. Core Rules

* **Read before changing.** Inspect existing code, structure, documentation, APIs, schemas, and tests before implementation.
* **Understand before coding.** For non-trivial work, explain the approach and identify important questions or risks first.
* **Reuse before creating.** Search for existing components, utilities, services, types, API clients, and patterns before creating new ones.
* **Follow existing architecture.** Do not introduce a new pattern when the project already has an established one.
* **Keep changes focused.** Do not modify unrelated code, dependencies, configuration, or architecture.
* **Do not guess business rules.** If a decision can change product behavior, ask first.
* **Prefer simple solutions.** Avoid unnecessary abstractions, libraries, or complexity.

---

## 2. Permission & Safety

Never perform these automatically:

* `git commit`, `git push`, force push, reset, rebase, or destructive Git operations.
* Production deployment or production configuration changes.
* Database migrations or destructive database operations.
* Dependency installation/upgrades when not explicitly requested.
* Infrastructure changes.
* Sending real emails, SMS, notifications, or paid external API requests.
* Deleting important files or rewriting unrelated work.

If an action can **delete data, expose secrets, change production, spend money, or rewrite history — ask first.**

Never commit:

```text
.env*
secrets/
credentials/
private keys
API keys
tokens
database dumps
production logs
```

Never use `git add -f` to bypass `.gitignore`.

---

## 3. Git & Local Documentation

`CLAUDE.md` and local changelog files are local development files and must remain ignored by Git.

Recommended `.gitignore`:

```gitignore
CLAUDE.md
**/CLAUDE.md
changelog.md
**/changelog.md
changelog-*/
**/changelog-*/
.claude/
```

Keep these files updated locally even though they are ignored.

---

## 4. Implementation Rules

* Keep responsibilities separated according to the project's architecture.
* Keep business logic in the appropriate backend/service/domain layer.
* Frontend validation improves UX; **server-side validation remains authoritative**.
* Reuse the existing API client, state management, validation, error handling, and UI patterns.
* Do not duplicate business rules across multiple layers.
* Never hardcode secrets or sensitive configuration.
* Handle loading, success, error, empty, and disabled states where applicable.
* Write comments for **why**, not obvious code behavior.
* Do not leave debugging code, temporary files, or unused imports behind.

---

## 5. Database & API

Before changing a database or API:

1. Inspect the current schema/contract.
2. Check existing migrations and consumers.
3. Preserve backward compatibility unless a breaking change is intentional.
4. Update related documentation/types when the contract changes.

Use transactions for operations that must succeed or fail together.

Do not modify applied migrations unless the project's established workflow explicitly allows it.

---

## 6. Testing & Verification

Every behavior change should be tested where practical.

Prioritize:

* New functionality
* Edge cases
* Validation
* Authorization
* Regression tests for bugs

Before declaring the task complete, run the project's relevant:

```text
typecheck
lint
tests
build
API/schema checks
```

Do not invent commands; use the project's existing scripts/configuration.

If a check fails, report the failure instead of claiming the task is complete.

---

## 7. Changelog

After every task, append one entry to the local changelog.

Use:

```md
## [DD-MM-YYYY HH:MM] — Short Title

**What changed:**
- Brief description.

**Files touched:**
- `path/to/file`

**API endpoints used:**
- `GET /api/...` or `—`

**Breaking change:** YES | NO

**Notes:**
- Important assumptions, limitations, or unresolved issues.

**Branch:** `<current-branch>`
```

Never guess the date, time, branch, files, or endpoints.

---

## 8. Before Saying "Done"

Verify:

* Requested functionality works.
* Existing architecture was followed.
* No unnecessary files or changes were introduced.
* No secrets were exposed.
* Relevant tests/checks passed.
* Documentation/types were updated where required.
* Changelog was updated.
* No commit or push was performed.

### Final Principle

> **Do not guess. Inspect first, follow existing conventions, make the smallest correct change, verify it, and ask before any risky action.**
