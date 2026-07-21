# RH Summit 2026 — Main Stage Demo

Static mock environments for the Ansible Automation Platform keynote demo. Zero backend, GitHub Pages ready.

**Live:** https://ansible-tmm.github.io/rh-summit-2026/

---

## Access (team only)

All demo pages show a sign-in screen before content loads. This is a lightweight gate for the public GitHub Pages site — not enterprise authentication.

| | |
|---|---|
| **Password** | `ansible123!` |
| **Session** | Stays signed in until you close the browser tab |
| **Scope** | Landing page and every demo subdirectory |

The password is verified client-side against a SHA-256 hash in `auth.js` (plaintext is not stored in the repo). Share this password with presenters and booth staff only.

---

## Demo Environments

| Environment | URL | Description |
|---|---|---|
| **ACME Alert Center** | [/alert_manager/](https://ansible-tmm.github.io/rh-summit-2026/alert_manager/) | Mock alert management dashboard |
| **Ansible Automation Platform** | [/aap/](https://ansible-tmm.github.io/rh-summit-2026/aap/) | Mock AAP UI — templates, jobs, EDA, rulebook activations |
| **IBM Instana** | [/instana/](https://ansible-tmm.github.io/rh-summit-2026/instana/) | Application observability — microservice dependency mapping and Smart Alerts |
| **ServiceNow** | [/servicenow/](https://ansible-tmm.github.io/rh-summit-2026/servicenow/) | IT Service Management — incident management with AI recommendations |
| **Cisco Splunk** | [/splunk/](https://ansible-tmm.github.io/rh-summit-2026/splunk/) | Log observability — detector alerts and AI-powered root cause correlation |
| **Now Assist Chat** | [/nowassist/](https://ansible-tmm.github.io/rh-summit-2026/nowassist/) | ServiceNow AI chatroom — MCP-driven incident remediation |

---

## Keyboard Triggers

Type these keywords anywhere on the page (no input field needed). Each trigger fires once per page load — refresh to reset.

### ACME Alert Center (`/alert_manager/`)

| Keyword | What it does |
|---|---|
| `issue1` | Single P1 critical alert appears with toast notification and alarm sound |
| `fix1` | The single capacity alert resolves to green "Resolved — Updated by AAP" (manual remediation) |
| `issue2` | 7 different P1 critical alerts cascade in one by one (~750ms apart) |
| `fix2` | All critical alerts resolve to green "Resolved by EDA" one after another (~500ms apart) |

### Ansible Automation Platform (`/aap/`)

Job IDs on the Jobs page run in the thousands, with the most recent existing job at **#4870**.

| Keyword | What it does |
|---|---|
| `eda` | EDA fire count on "Infrastructure Auto-Remediation" climbs from 0→7, 7 alert events appear in the detail view, and 7 Auto-Remediation jobs appear on the Jobs page (Running → Successful) |
| `demo` | Adds **Job #4871 — Restore Web Application** to the Jobs page as "Running" (does not navigate anywhere). Click it to watch the live playbook output (backup `httpd.conf`, restore baseline, restart httpd, verify HTTP 200) and it flips to "Successful" when done. This is the same job referenced by the Now Assist Chat script (`/nowassist/`) — click it again anytime afterward to review the completed run. |

Additionally, clicking **Launch** on any job template in the Templates page plays a fake ansible-playbook output sequence.

### AIOps Tools (`/instana/`, `/servicenow/`, `/splunk/`)

`/servicenow/` shows its P1 incident (**INC0049127**) by default on page load — no keyword needed, just click it. `/instana/` and `/splunk/` still use the keyword trigger:

| Keyword | What it does |
|---|---|
| `issue1` | Fires a critical alert/incident specific to the tool (see below) |

After the alert/incident is showing, **click it** to open a detail view showing MCP-to-AAP integration with diagnostic playbook output and remediation options.

| Tool | Use Case | Issue |
|---|---|---|
| **IBM Instana** | Microservice cascade failure | Type `issue1` — `order-service` error rate spikes, downstream services degrade, Smart Alert fires |
| **ServiceNow** | Production database outage | Shown by default — P1 incident INC0049127, database cluster unreachable, failover required |
| **Cisco Splunk** | Anomalous error log spike | Type `issue1` — 15x baseline error rate detected, ERROR logs flood the log observer |

### Now Assist Chat (`/nowassist/`)

The chat input is pre-filled with `can you help me with INC0049127?`. Just press **Send** to play the scripted 8-message remediation sequence (analyzing incident → connect to AAP via MCP → launch job template on `nostromo` → playbook output → incident resolved). No keyword needed.

---

## Cold Open Demo Flow

**Segment 1 — 2019 (Task-based):** Type `issue1` on ACME Alert Center → single alert fires → manually navigate to AAP → click Launch on "Increase Web Server Capacity" → watch playbook run → type `fix1` on ACME Alert Center → capacity alert resolves (Updated by AAP)

**Segment 2 — 2023 (Event-driven):** Type `issue2` on ACME Alert Center → 7 alerts cascade in → switch to AAP Rulebook Activations → type `eda` → fire count climbs, 7 jobs auto-run → switch to Jobs page to see them complete → type `fix2` on ACME Alert Center → all alerts resolve

**AIOps Tools — MCP + AAP:** Open ServiceNow (INC0049127 already showing) and click it, or open Instana/Splunk and type `issue1` first → see the MCP + AAP diagnostic and remediation workflow

**Now Assist Chat:** Open Now Assist Chat → press Send on the pre-filled message → watch the scripted MCP + AAP remediation flow

---

## Structure

```
auth.js                 Client-side login gate (SHA-256 hash check, sessionStorage)
index.html              Landing page linking to all demo environments
aap/index.html          Mock AAP (single self-contained HTML file)
alert_manager/          Mock ACME Alert Center (single self-contained HTML file)
instana/index.html      Mock IBM Instana (single self-contained HTML file)
servicenow/index.html   Mock ServiceNow ITSM (single self-contained HTML file)
splunk/index.html       Mock Cisco Splunk Observability (single self-contained HTML file)
nowassist/index.html    Mock ServiceNow Now Assist chat (single self-contained HTML file)
```
