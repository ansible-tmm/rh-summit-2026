# RH Summit 2026 — Main Stage Demo

Static mock environments for the Ansible Automation Platform keynote demo. Zero backend, GitHub Pages ready.

**Live:** https://ansible-tmm.github.io/rh-summit-2026/

---

## Demo Environments

| Environment | URL | Description |
|---|---|---|
| **AlertCommand** | [/alert_manager/](https://ansible-tmm.github.io/rh-summit-2026/alert_manager/) | Infrastructure alert management dashboard |
| **Ansible Automation Platform** | [/aap/](https://ansible-tmm.github.io/rh-summit-2026/aap/) | Mock AAP UI — templates, jobs, EDA, rulebook activations |
| **IBM Instana** | [/instana/](https://ansible-tmm.github.io/rh-summit-2026/instana/) | Application observability — microservice dependency mapping and Smart Alerts |
| **ServiceNow** | [/servicenow/](https://ansible-tmm.github.io/rh-summit-2026/servicenow/) | IT Service Management — incident management with AI recommendations |
| **Cisco Splunk** | [/splunk/](https://ansible-tmm.github.io/rh-summit-2026/splunk/) | Log observability — detector alerts and AI-powered root cause correlation |

---

## Keyboard Triggers

Type these keywords anywhere on the page (no input field needed). Each trigger fires once per page load — refresh to reset.

### AlertCommand (`/alert_manager/`)

| Keyword | What it does |
|---|---|
| `issue1` | Single P1 critical alert appears with toast notification and alarm sound |
| `fix1` | The single capacity alert resolves to green "Resolved — Updated by AAP" (manual remediation) |
| `issue2` | 7 different P1 critical alerts cascade in one by one (~750ms apart) |
| `fix2` | All critical alerts resolve to green "Resolved by EDA" one after another (~500ms apart) |

### Ansible Automation Platform (`/aap/`)

| Keyword | What it does |
|---|---|
| `eda` | EDA fire count on "Infrastructure Auto-Remediation" climbs from 0→7, 7 alert events appear in the detail view, and 7 Auto-Remediation jobs appear on the Jobs page (Running → Successful) |

Additionally, clicking **Launch** on any job template in the Templates page plays a fake ansible-playbook output sequence.

### AIOps Tools (`/instana/`, `/servicenow/`, `/splunk/`)

All three AIOps mock sites use the same trigger pattern:

| Keyword | What it does |
|---|---|
| `issue1` | Fires a critical alert/incident specific to the tool (see below) |

After the alert fires, **click the alert** to open a detail view showing MCP-to-AAP integration with diagnostic playbook output and remediation options.

| Tool | Use Case | What `issue1` triggers |
|---|---|---|
| **IBM Instana** | Microservice cascade failure | `order-service` error rate spikes, downstream services degrade, Smart Alert fires |
| **ServiceNow** | Production database outage | P1 incident created — database cluster unreachable, failover required |
| **Cisco Splunk** | Anomalous error log spike | 15x baseline error rate detected, ERROR logs flood the log observer |

---

## Cold Open Demo Flow

**Segment 1 — 2019 (Task-based):** Type `issue1` on AlertCommand → single alert fires → manually navigate to AAP → click Launch on "Increase Web Server Capacity" → watch playbook run → type `fix1` on AlertCommand → capacity alert resolves (Updated by AAP)

**Segment 2 — 2023 (Event-driven):** Type `issue2` on AlertCommand → 7 alerts cascade in → switch to AAP Rulebook Activations → type `eda` → fire count climbs, 7 jobs auto-run → switch to Jobs page to see them complete → type `fix2` on AlertCommand → all alerts resolve

**AIOps Tools — MCP + AAP:** Open any AIOps tool (Instana, ServiceNow, or Splunk) → type `issue1` → observe the alert/incident → click it → see the MCP + AAP diagnostic and remediation workflow

---

## Structure

```
index.html              Landing page linking to all 5 environments
aap/index.html          Mock AAP (single self-contained HTML file)
alert_manager/          Mock AlertCommand (single self-contained HTML file)
instana/index.html      Mock IBM Instana (single self-contained HTML file)
servicenow/index.html   Mock ServiceNow ITSM (single self-contained HTML file)
splunk/index.html       Mock Cisco Splunk Observability (single self-contained HTML file)
```
