# Chapter 4: Claude Code Workflows

## What is Claude Code?

Claude Code is Anthropic's official CLI tool—an agentic coding assistant that lives in your terminal. Unlike chat interfaces or IDE-specific tools, Claude Code is terminal-native, action-oriented, and deeply integrated with your development workflow.

It's not just another AI chatbot for code. Claude Code can:
- **Read your codebase** and understand its architecture
- **Write and edit files** directly
- **Run commands** to test, build, and deploy
- **Create commits and PRs** with thoughtful messages
- **Connect to external tools** via Model Context Protocol (MCP)
- **Work with specifications** from Spec-Kit Plus seamlessly

When combined with spec-driven development, Claude Code becomes incredibly powerful—implementing features exactly as specified, with minimal deviation and maximum consistency.

## Why Claude Code for Spec-Driven Development?

Traditional AI coding tools require you to manually provide context, copy-paste code, and guide every step. Claude Code changes this:

### Context Awareness
Claude Code automatically understands your project structure. When you ask about authentication, it finds the relevant files. When you request a feature, it knows where implementation should go.

### Direct Action
Instead of generating code for you to copy, Claude Code edits files directly. It runs tests. It creates commits. It's a true assistant that takes action, not just advice.

### Memory and Planning
The `CLAUDE.md` file serves as project memory—principles, conventions, and decisions that persist across sessions. Claude remembers what matters.

### Spec Integration
Claude Code works beautifully with Spec-Kit Plus. The `/sp.*` commands guide Claude through structured workflows, ensuring nothing gets missed.

## Installation and Setup

### Installing Claude Code

**macOS, Linux, WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Or via npm:**
```bash
npm install -g @anthropic-ai/claude-code
```

### Authentication

First run prompts you to authenticate:

**Option 1: Claude Console** (API with pay-as-you-go)
- Best for API users with existing billing
- Creates "Claude Code" workspace for tracking costs

**Option 2: Claude App** ($17-20/month subscription)
- Includes both web interface and CLI access
- Better value if using both

**Option 3: Enterprise** (AWS Bedrock or Google Vertex AI)
- For organizations using existing cloud infrastructure

After authentication, credentials store securely in your system keychain.

### Verify Installation

```bash
# Check health
claude doctor

# Start Claude Code
cd /path/to/project
claude
```

## Core Workflow Concepts

### The CLAUDE.md File

Before diving into workflows, understand `CLAUDE.md`—your project's permanent memory.

**Create it:**
```
> init
```

Claude analyzes your project and creates a comprehensive overview including:
- Architecture and tech stack
- Key files and their purposes
- Development rules and conventions
- Testing and deployment procedures

**Example CLAUDE.md:**
```markdown
# E-commerce Platform

## Overview
Next.js 14 e-commerce platform with Stripe payments.

## Architecture
- Frontend: Next.js with App Router
- Backend: tRPC API
- Database: PostgreSQL with Prisma
- Auth: NextAuth.js

## Development Rules
- Write tests for all features
- Use conventional commits
- Never commit directly to main
- Ask before schema changes

## Testing
Run `npm test` before creating PRs.

## Key Files
- src/app: Next.js pages
- src/server: tRPC backend
- prisma/schema.prisma: Database schema
```

**Add to memory on-the-fly:**
```
# Always use TypeScript strict mode
```

Lines starting with `#` append to CLAUDE.md.

### Permission Modes

Claude Code asks permission before making changes. Three modes:

**Accept Edits** (default):
- Claude asks before each file edit
- You review and approve/reject
- Safest for important projects

**Accept All**:
- Claude edits without asking
- Faster but riskier
- Good for experimental work

**Plan Mode**:
- Claude creates plan, doesn't execute
- You review the plan first
- Toggle with `Shift + Tab`

Start Claude with specific mode:
```bash
claude --permission-mode acceptEdits
claude --permission-mode acceptAll
claude --permission-mode plan
```

## Essential Workflows

### Workflow 1: Understanding a New Codebase

You've joined a team with an unfamiliar codebase. Here's how Claude Code helps:

**Step 1: Initialize**
```bash
cd project-directory
claude
```

**Step 2: Get Overview**
```
> init
> what does this project do?
> what's the architecture?
```

Claude reads the codebase and provides a comprehensive summary.

**Step 3: Dive Deeper**
```
> how does authentication work?
> where are the API routes defined?
> show me the database schema
> what testing framework is used?
```

**Step 4: Find Specific Code**
```
> where is user registration implemented?
> show me how payments are processed
> explain the error handling strategy
```

**Result:** You understand the codebase without reading hundreds of files manually.

### Workflow 2: Implementing a Feature with Specs

Combine Spec-Kit Plus with Claude Code for structured feature development.

**Step 1: Create Specification**
```
/sp.specify Build a password reset feature. Users enter email,
receive reset link, click link to set new password. Link expires
after 1 hour. Rate limit: 3 reset requests per hour per IP.
```

Claude creates a detailed spec in `.specify/specs/002-password-reset/spec.md`.

**Step 2: Clarify Requirements**
```
/sp.clarify
```

Claude asks targeted questions:
- "What happens if the user's email doesn't exist?"
- "Should the reset email be HTML or plain text?"
- "What should the reset password page look like?"

Answer these to complete the spec.

**Step 3: Create Technical Plan**
```
/sp.plan Use Node.js with Express. Store reset tokens in Redis
with 1-hour expiration. Use SendGrid for emails. Create both API
endpoints and frontend pages.
```

Claude generates:
- Implementation plan
- API specifications
- Database/cache schema
- Tech stack details

**Step 4: Generate Tasks**
```
/sp.tasks
```

Claude breaks the plan into ordered tasks:
```markdown
## Phase 1: Backend Setup
- Task 1.1: Create reset token model
- Task 1.2: Implement token generation/validation
- Task 1.3: Set up Redis connection

## Phase 2: API Endpoints
- Task 2.1: POST /api/auth/request-reset
- Task 2.2: POST /api/auth/reset-password

## Phase 3: Email Integration
- Task 3.1: Configure SendGrid
- Task 3.2: Create email template
- Task 3.3: Implement sending logic

## Phase 4: Frontend
- Task 4.1: Request reset form
- Task 4.2: Reset password form
- Task 4.3: Success/error pages

## Phase 5: Testing
- Task 5.1: Unit tests for token logic
- Task 5.2: API endpoint tests
- Task 5.3: Rate limiting tests
```

**Step 5: Implement**
```
/sp.implement
```

Claude executes each task:
1. Creates necessary files
2. Implements code according to spec
3. Runs tests
4. Reports progress

**Step 6: Review and Commit**
```
> show me what changed
> run all tests
> commit the changes with a detailed message
```

**Result:** A complete, tested feature built exactly to specification.

### Workflow 3: Debugging

You have a bug. Claude Code helps find and fix it.

**Step 1: Describe the Problem**
```
> Users can't log in - they get "Invalid credentials" even with
correct passwords. This started after yesterday's deployment.
```

**Step 2: Investigate**

Claude analyzes:
- Recent commits
- Authentication code
- Logs and error messages
- Related configuration

**Step 3: Identify Root Cause**

Claude reports:
```
Found the issue in src/auth/login.ts:42

The password hashing algorithm was changed from bcrypt to argon2,
but existing password hashes weren't migrated. New passwords work,
but old ones fail comparison.
```

**Step 4: Implement Fix**
```
> fix this by adding backwards compatibility - check if hash
starts with "$2" (bcrypt) and use bcrypt comparison, otherwise
use argon2
```

Claude:
1. Updates comparison logic
2. Adds detection for hash types
3. Preserves existing behavior
4. Adds test cases

**Step 5: Verify**
```
> run the authentication tests
> test login with a pre-migration user
```

**Result:** Bug identified and fixed with backwards compatibility maintained.

### Workflow 4: Refactoring

Your codebase needs modernization.

**Step 1: Identify Problems**
```
> analyze the codebase for technical debt
> what code needs refactoring most urgently?
```

Claude identifies:
- Callback hell in API clients
- Duplicate validation logic
- Missing error handling
- Poor test coverage in payment module

**Step 2: Create Refactoring Plan**
```
> create a plan to refactor the API client module:
  - Convert callbacks to async/await
  - Extract common patterns
  - Add error handling
  - Maintain backward compatibility
```

Claude generates a detailed plan with:
- Files to modify
- Order of operations
- Test strategy
- Risk assessment

**Step 3: Execute Refactoring**
```
> implement the refactoring plan step by step
```

Claude refactors incrementally, running tests after each change.

**Step 4: Verify**
```
> run all tests
> check that API calls still work correctly
> show me the coverage improvement
```

**Result:** Modernized code with maintained functionality.

### Workflow 5: Code Review

Before merging a PR, get comprehensive review.

**Step 1: Request Review**
```
> review all changed files in this branch for:
  - Code quality
  - Security vulnerabilities
  - Performance issues
  - Test coverage
  - Best practices
```

**Step 2: Receive Feedback**

Claude provides structured review:
```markdown
## ✅ Strengths
- Clean separation of concerns
- Comprehensive input validation
- Good error messages

## ⚠️ Concerns
1. HIGH: SQL query in line 45 vulnerable to injection
2. MEDIUM: Missing rate limiting on API endpoint
3. LOW: Function complexity could be reduced

## 📋 Recommendations
1. Use parameterized queries (line 45)
2. Add rate limiting middleware
3. Extract validation logic to separate function
4. Add integration test for error cases
```

**Step 3: Address Issues**
```
> fix the SQL injection vulnerability
> add rate limiting as recommended
```

Claude implements fixes.

**Step 4: Re-review**
```
> review the changes again
```

**Result:** High-quality code ready for merge.

### Workflow 6: Documentation

Generate and maintain documentation effortlessly.

**Step 1: Generate Project Docs**
```
> create comprehensive documentation:
  - README with setup instructions
  - API documentation for all endpoints
  - Architecture overview
  - Contributing guidelines
```

**Step 2: Document Code**
```
> add JSDoc comments to all functions in src/utils/
> document the authentication flow in ARCHITECTURE.md
> create examples for each API endpoint
```

**Step 3: Keep Docs Updated**
```
> update the README with the new environment variables
> add the password reset feature to API docs
> update CHANGELOG.md with recent changes
```

**Result:** Complete, up-to-date documentation without manual effort.

## Working with Git

### Conversational Git Operations

Claude Code understands Git naturally:

```
> what files did I change?
> show me uncommitted changes
> create a new branch called feature/notifications
> commit these changes with a descriptive message
> push to remote
> create a pull request
```

### Commit Message Generation

Claude writes excellent commit messages:

```
> commit my changes
```

Claude analyzes the diff and generates:
```
feat(auth): implement password reset functionality

- Add reset token generation and validation
- Integrate SendGrid for reset emails
- Create reset request and confirmation endpoints
- Add rate limiting to prevent abuse
- Include comprehensive test coverage

Closes #234
```

### Merge Conflict Resolution

```
> help me resolve these merge conflicts
```

Claude:
1. Analyzes both branches
2. Understands intent of each change
3. Suggests resolution strategy
4. Implements the merge
5. Runs tests to verify

### Pull Request Creation

```
> create a PR for this feature with a detailed description
```

Claude generates:
```markdown
## Password Reset Feature

### Overview
Implements secure password reset functionality with email-based
token verification.

### Changes
- Backend: Token generation and validation logic
- API: Two new endpoints for reset workflow
- Frontend: Reset request and confirmation pages
- Email: SendGrid integration with HTML templates

### Testing
- Unit tests for token logic
- API endpoint integration tests
- Rate limiting verification
- Email sending mocks

### Security
- Tokens expire after 1 hour
- Rate limited to 3 requests/hour/IP
- Constant-time token comparison
- No email enumeration vulnerability

### Screenshots
[Includes relevant UI screenshots]
```

## Advanced Features

### Subagents

Subagents are specialized AI assistants for specific tasks.

**Built-in subagents:**
- `code-reviewer`: Code quality analysis
- `debugger`: Error investigation
- `security-auditor`: Vulnerability scanning
- `performance-optimizer`: Performance improvements

**Using subagents:**
```
> use the security-auditor to analyze the authentication module
> have the performance-optimizer review the API routes
```

**Creating custom subagents:**

`.claude/agents/frontend-reviewer.md`:
```markdown
---
name: frontend-reviewer
description: React component review specialist
tools: Read,Grep,Glob
model: sonnet
---

Review React components for:
- Performance (memo, useMemo, useCallback)
- Accessibility (ARIA, keyboard navigation)
- Best practices (hooks, composition)
- TypeScript types

Provide specific, actionable feedback with examples.
```

**Use it:**
```
> use frontend-reviewer on src/components/UserProfile.tsx
```

### Custom Commands

Create reusable workflows as slash commands.

`.claude/commands/pr-ready.md`:
```markdown
---
description: Prepare code for pull request
---

Prepare this code for PR:
1. Run all tests and fix failures
2. Fix lint errors
3. Update documentation
4. Remove debugging code
5. Verify no sensitive data
6. Generate PR description
```

**Use it:**
```
> /pr-ready
```

### Hooks

Hooks execute shell commands at specific lifecycle events.

**Example: Auto-format after edits**
```json
{
  "PostToolUse": [
    {
      "matchers": ["Write"],
      "hooks": [
        {
          "command": "prettier --write $(jq -r '.tool_input.path')"
        }
      ]
    }
  ]
}
```

**Example: Block production changes**
```json
{
  "PreToolUse": [
    {
      "matchers": ["Write"],
      "hooks": [
        {
          "command": "jq -r '.tool_input.path' | grep -q 'config/production' && echo '❌ Cannot modify production config' && exit 1"
        }
      ]
    }
  ]
}
```

### Model Context Protocol (MCP)

Connect Claude Code to external tools and data sources.

**Install MCP servers:**
```bash
# Project management
claude mcp add linear --transport sse https://mcp.linear.app/sse
claude mcp add jira --transport sse https://mcp.atlassian.com/v1/sse

# Communication
claude mcp add slack --transport http https://mcp.slack.com/mcp

# Design
claude mcp add figma --transport http http://127.0.0.1:3845/mcp

# Development
claude mcp add github --transport http https://mcp.github.com/mcp
```

**Use MCP resources:**
```
> summarize @linear:project://ENG-2025-Q1
> implement the design from @figma:frame://abc123
> review @github:pr://456 for security issues
```

**Use MCP tools:**
```
> create a Linear ticket for this bug
> post to #engineering Slack channel about the deployment
> query the database for user retention metrics
```

## Headless Mode and Automation

Claude Code runs non-interactively for scripts and CI/CD.

### Basic Headless Usage

```bash
# Single command
claude -p "Analyze this codebase and report technical debt"

# Output to file
claude -p "Generate API documentation" > docs/api.md

# JSON output for parsing
claude -p "Review changes" --output-format json | jq -r '.result'
```

### Automation Scripts

**Automated code review:**
```bash
#!/bin/bash
for file in $(git diff --name-only main); do
  claude -p "Review @$file for security and quality" \
    --output-format json >> review.jsonl
done
```

**Automated testing:**
```bash
#!/bin/bash
claude -p "Generate tests for untested code" \
  --permission-mode acceptAll

npm test || claude -p "Fix test failures" \
  --permission-mode acceptAll
```

### GitHub Actions Integration

`.github/workflows/claude.yml`:
```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Claude Review
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

**Use in PRs:**
```
@claude review this PR for security vulnerabilities
@claude add tests for the authentication changes
@claude update documentation for the new API
```

## Best Practices

### Do's
- **Initialize CLAUDE.md** in every project
- **Write specs before coding** with Spec-Kit Plus
- **Use plan mode** for complex changes
- **Review AI changes** critically
- **Commit regularly** with descriptive messages
- **Leverage subagents** for specialized tasks
- **Create custom commands** for repeated workflows

### Don'ts
- **Don't skip specs** and rely solely on vibe coding
- **Don't accept edits blindly** without review
- **Don't let CLAUDE.md get stale** - keep it updated
- **Don't give unrestricted access** in automation
- **Don't forget to test** AI-generated code
- **Don't over-engineer** - keep solutions simple

## Troubleshooting

### Claude misunderstands requirements
**Solution:** Write clearer specs with `/sp.specify` and `/sp.clarify`

### Changes don't match coding style
**Solution:** Document style in CLAUDE.md or create output styles

### Claude makes unnecessary changes
**Solution:** Use plan mode, review plans before execution

### Performance is slow
**Solution:** Use `haiku` model for simple tasks, limit file context

### Tool permissions blocked
**Solution:** Check hooks in `.claude/hooks/config.json`

## Conclusion

Claude Code transforms spec-driven development from theory into practice. By combining structured specifications from Spec-Kit Plus with Claude Code's autonomous capabilities, you get:

- **Faster development** without sacrificing quality
- **Consistent implementation** that matches specifications
- **Better documentation** generated automatically
- **Reduced bugs** through systematic testing
- **Improved collaboration** with clear context

The key is structure. Specs provide direction. Claude Code provides execution. Together, they enable development at unprecedented speed while maintaining the rigor that ensures long-term maintainability.

In the next chapter, we'll explore publishing and sharing your AI-powered, spec-driven projects using Docusaurus.
