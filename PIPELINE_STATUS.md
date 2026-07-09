# Pipeline Status

Operational handoff only. `LEADS.md` and `OUTREACH_LOG.md` remain the source of truth.

- Current phase: FIX applied - BLOCKED on required rendered QA
- Last trusted commit: current FIX commit once committed
- Known untrusted state: Required rendered contrast and mobile/tablet/desktop image audits could not be rerun. Local preview server failed with `PermissionError: [Errno 1] Operation not permitted`; escalation was rejected by app usage limit; in-app browser blocks direct `file://` pages by URL policy.
- Next exact action: When browser/local preview access is available, rerun `.pipeline/qa/upscale-audit.js` and `.pipeline/qa/contrast-audit.js` at 390x844, 768x1024 and 1440x900 across all pages. If clean, deploy `Plainset/yi-dao-clinic-demo`, confirm Pages loads, then draft outreach only in `vdvalkproductions@gmail.com`.
- Deploy URL: n/a - not deployed because required rendered QA could not be completed
- Outreach state: not drafted - no deployed URL and Gmail/account confirmation not attempted
- Flags for Alex: Fixes are in place but do not deploy/send until rendered QA can be rerun; official Yi Dao site was blocked by verification/DNS during this pass, so final source wording should be confirmed with clinic-controlled copy before restoring any credentials, prices or testimonials.
