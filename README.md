# RH Summit 2026 — Main Stage Demo

Static mock environments for the Ansible Automation Platform keynote demo. Zero backend, GitHub Pages ready.

**Live:** https://ansible-tmm.github.io/rh-summit-2026/

---

## Demo Environments

| Environment | URL | Description |
|---|---|---|
| **AlertCommand** | [/alert_manager/](https://ansible-tmm.github.io/rh-summit-2026/alert_manager/) | Infrastructure alert management dashboard |
| **Ansible Automation Platform** | [/aap/](https://ansible-tmm.github.io/rh-summit-2026/aap/) | Mock AAP UI — templates, jobs, EDA, rulebook activations |

---

## Keyboard Triggers

Type these keywords anywhere on the page (no input field needed). Each trigger fires once per page load — refresh to reset.

### AlertCommand (`/alert_manager/`)

| Keyword | What it does |
|---|---|
| `sev1` | Single P1 critical alert appears with toast notification and alarm sound |
| `shit` | 7 different P1 critical alerts cascade in one by one (~750ms apart) |
| `fix` | All critical alerts resolve to green "Resolved" one after another (~500ms apart) |

### Ansible Automation Platform (`/aap/`)

| Keyword | What it does |
|---|---|
| `eda` | EDA fire count on "Infrastructure Auto-Remediation" climbs from 0→7, 7 alert events appear in the detail view, and 7 Auto-Remediation jobs appear on the Jobs page (Running → Successful) |

Additionally, clicking **Launch** on any job template in the Templates page plays a fake ansible-playbook output sequence.

---

## Cold Open Demo Flow

**Segment 1 — 2019 (Task-based):** Type `sev1` on AlertCommand → single alert fires → manually navigate to AAP → click Launch on a template → watch playbook run

**Segment 2 — 2023 (Event-driven):** Type `shit` on AlertCommand → 7 alerts cascade in → switch to AAP Rulebook Activations → type `eda` → fire count climbs, 7 jobs auto-run → switch to Jobs page to see them complete → type `fix` on AlertCommand → all alerts resolve

---

## Structure

```
index.html          Landing page linking to both environments
aap/index.html      Mock AAP (single self-contained HTML file)
alert_manager/       Mock AlertCommand (single self-contained HTML file)
```
