---
title: "Cron Jobs Explained: Syntax, Patterns, and Debugging"
description: "Learn cron syntax, common scheduling patterns, platform differences, and how to debug cron jobs that are not running as expected."
date: 2026-03-23
category: explainer
tags: [cron, scheduling, devops]
relatedTools: [timestamp-converter, hash-generator]
---

Cron is the standard job scheduler on Unix-like operating systems. It runs commands or scripts at specified times and intervals — database backups at midnight, log cleanup every Sunday, health checks every 5 minutes. If you manage servers, deploy applications, or work with CI/CD pipelines, you will encounter cron expressions.

## Cron Syntax

A cron expression consists of five fields separated by spaces, each representing a time unit:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-7, where 0 and 7 = Sunday)
│ │ │ │ │
* * * * *
```

Each field accepts:
- **A specific value**: `5` means "at 5"
- **An asterisk (*)**: means "every" value in the range
- **A range**: `1-5` means "1 through 5"
- **A list**: `1,3,5` means "1, 3, and 5"
- **A step**: `*/5` means "every 5th value" (e.g., `*/5` in the minute field means every 5 minutes)

## Common Patterns

Here are the most frequently used cron schedules:

| Pattern | Expression | Description |
|---------|-----------|-------------|
| Every minute | `* * * * *` | Runs once per minute, 24/7 |
| Every 5 minutes | `*/5 * * * *` | Runs at :00, :05, :10, ... |
| Every hour | `0 * * * *` | Runs at the top of every hour |
| Every day at midnight | `0 0 * * *` | Runs at 00:00 every day |
| Every day at 3:30 AM | `30 3 * * *` | Common time for backups |
| Every Monday at 9 AM | `0 9 * * 1` | Weekly tasks on Monday morning |
| First day of every month | `0 0 1 * *` | Monthly tasks at midnight on the 1st |
| Every weekday at 8 AM | `0 8 * * 1-5` | Monday through Friday |
| Twice a day | `0 8,20 * * *` | At 8 AM and 8 PM |
| Every 15 minutes | `*/15 * * * *` | Runs at :00, :15, :30, :45 |

## Reading Cron Expressions

To read a cron expression, process each field left to right:

`30 2 * * 0` reads as: "At minute 30, hour 2, every day of month, every month, on Sunday" — meaning 2:30 AM every Sunday.

`0 */4 * * *` reads as: "At minute 0, every 4th hour, every day" — meaning at 00:00, 04:00, 08:00, 12:00, 16:00, and 20:00 daily.

`0 9 1,15 * *` reads as: "At 9:00 AM on the 1st and 15th of every month."

## Platform Differences

Cron implementations vary across platforms, which causes confusion.

### Standard Unix Cron

The traditional crontab on Linux and macOS uses the five-field format described above. Edit your crontab with `crontab -e` and list it with `crontab -l`.

### Extended Cron (6 or 7 fields)

Some systems add a seconds field at the beginning or a year field at the end:

- **6 fields (with seconds)**: `0 */5 * * * *` — every 5 minutes starting at second 0
- **7 fields (with year)**: `0 0 0 1 1 ? 2026` — midnight on January 1, 2026

Used by: Quartz scheduler (Java), Spring Framework, AWS CloudWatch Events.

### Shorthand Strings

Some cron implementations support shorthand:

| Shorthand | Equivalent | Meaning |
|-----------|-----------|---------|
| `@yearly` | `0 0 1 1 *` | Once a year (Jan 1 midnight) |
| `@monthly` | `0 0 1 * *` | First day of each month |
| `@weekly` | `0 0 * * 0` | Every Sunday at midnight |
| `@daily` | `0 0 * * *` | Every day at midnight |
| `@hourly` | `0 * * * *` | Every hour |
| `@reboot` | N/A | Once at system startup |

Not all platforms support these shortcuts. Verify before relying on them.

## Common Mistakes

### Forgetting the Timezone

Cron jobs run in the system timezone unless explicitly configured otherwise. A job scheduled for `0 0 * * *` runs at midnight in whatever timezone the server is set to. If your server is in UTC but you expect local time, your job runs at the wrong time.

Always document the timezone for your cron jobs. Many cloud platforms let you specify the timezone explicitly.

### The PATH Problem

Cron runs with a minimal environment — the PATH variable typically includes only `/usr/bin:/bin`. Commands that work in your terminal may fail in cron because their binary is not in the cron PATH.

Solutions:
- Use absolute paths to commands: `/usr/local/bin/node script.js` instead of `node script.js`
- Set PATH at the top of your crontab: `PATH=/usr/local/bin:/usr/bin:/bin`
- Use a wrapper script that sources your shell profile

### Output Goes Nowhere

By default, cron sends command output to the local mail system. If mail is not configured (which it usually is not on modern servers), output is silently discarded. Redirect output explicitly:

```
0 3 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1
```

The `2>&1` redirects stderr to the same file as stdout, capturing both regular output and error messages.

### The Day-of-Week / Day-of-Month Overlap

When both day-of-month and day-of-week are specified (not `*`), the behavior varies by implementation. In standard cron, the job runs when EITHER condition is true (OR logic). In Quartz and some other systems, both conditions must be true (AND logic).

For example, `0 0 15 * 5` in standard cron runs at midnight on the 15th of every month AND every Friday — not only on Fridays that fall on the 15th.

## Debugging Cron Jobs

When a cron job is not running as expected, follow this checklist:

1. **Check the crontab**: Run `crontab -l` to verify your entry exists and the syntax is correct.

2. **Check the system logs**: On Linux, cron logs to `/var/log/syslog` or `/var/log/cron`. Look for entries showing whether cron attempted to run your command.

3. **Test the command manually**: Run the exact command from the crontab in your terminal. If it fails, the command itself has an error.

4. **Check permissions**: The script must be executable (`chmod +x script.sh`) and the cron user must have permission to run it.

5. **Check the environment**: Cron runs with minimal environment variables. If your command depends on specific environment variables, set them in the crontab or in the script.

6. **Check output**: Redirect output to a log file and check for error messages. Silent failures are the most common cron debugging challenge.

7. **Check the timezone**: Verify that the server timezone matches your expectations. Use `date` and `timedatectl` to check.

## Cron Alternatives

For modern applications, several alternatives to traditional crontab exist:

- **Systemd timers**: On modern Linux systems, systemd timers offer logging, dependency management, and better error handling than crontab.
- **Cloud schedulers**: AWS EventBridge, Google Cloud Scheduler, and Azure Timer Functions provide managed scheduling with monitoring and retry logic.
- **Application-level schedulers**: Libraries like node-cron (Node.js), schedule (Python), and whenever (Ruby) embed scheduling directly in your application.
- **CI/CD scheduled pipelines**: GitHub Actions, GitLab CI, and other CI systems support scheduled workflow runs using cron syntax.

Despite these alternatives, understanding cron syntax remains essential because it is the standard notation used by almost every scheduling system. Cloud schedulers, CI/CD pipelines, and even Kubernetes CronJobs all use cron expression syntax.

Use the [Timestamp Converter](/timestamp-converter) when debugging cron jobs to verify that timestamps in logs match your expected schedule times.
