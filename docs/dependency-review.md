# Dependency review backlog

## 12 July 2026

`npm ci` reported 23 audit findings in the existing locked dependency tree:

- 2 low
- 13 moderate
- 7 high
- 1 critical

These findings were observed while validating the DataCost Answers change. They were deliberately not remediated in that content change and should be assessed in a dedicated dependency-review task, including impact analysis and full regression testing before any lockfile update.
