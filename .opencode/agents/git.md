---
description: Git/GitHub specialist for FulgensUI - handles commits, issues, PRs, releases, branch management
mode: subagent
prompt: {file:./prompts/git.md}
temperature: 0.2
tools:
  github_*: true
  bash: true
  read: true
  grep: true
  question: true
permission:
  bash:
    "git status*": allow
    "git diff*": allow
    "git log*": allow
    "git branch*": allow
    "git commit*": allow
    "git push*": ask
    "git pull*": allow
     "*": ask
  webfetch: deny
---
