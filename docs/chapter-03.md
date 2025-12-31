# Chapter 3: Spec-Kit Plus Deep Dive

## What is Spec-Kit Plus?

Spec-Kit Plus (also known as SpecifyPlus) is an open-source toolkit that transforms spec-driven development from theory into practice. It provides a structured workflow, templates, and CLI commands that guide you and your AI assistant through the entire development process—from initial requirements to production-ready code.

Think of it as the bridge between your ideas and implementation. While AI assistants are powerful, they work best with structure. Spec-Kit Plus provides that structure through a systematic process that ensures nothing falls through the cracks.

## Why Spec-Kit Plus Exists

The problem with traditional "vibe coding"—prompting AI with loosely defined requirements—is inconsistency. Sometimes you get great results. Sometimes you get code that works but doesn't fit your architecture. Sometimes you get complete misses.

Spec-Kit Plus solves this by introducing **"Spec-driven Vibe-coding"**: the rapid, conversational generation power of vibe coding combined with the structure and architectural coherence of spec-driven development.

The toolkit ensures:
- Requirements are captured comprehensively before coding
- Technical decisions are documented and intentional
- AI assistants have the context they need to generate appropriate code
- Projects remain maintainable as they grow
- Teams can collaborate effectively with shared understanding

## Core Architecture

Spec-Kit Plus organizes your project with a `.specify` directory containing everything needed for structured development:

```
.specify/
├── memory/
│   └── constitution.md          # Project principles and guidelines
├── specs/
│   └── 001-feature-name/        # Feature-specific specifications
│       ├── spec.md              # Functional requirements
│       ├── plan.md              # Technical implementation plan
│       ├── tasks.md             # Actionable task breakdown
│       ├── data-model.md        # Database/data structures
│       └── contracts/           # API specifications
├── templates/                   # Reusable templates
└── scripts/                     # Automation scripts
```

This structure keeps specification artifacts separate from implementation code, making it easy to understand what a feature does and how it's built, even months later.

## The Six-Step Workflow

Spec-Kit Plus follows a systematic six-step process. Each step has a dedicated command that guides AI through specific tasks.

### Step 1: Establish Principles (`/sp.constitution`)

Before writing any code or specs, define your project's governing principles. This creates a "constitution" that guides all subsequent decisions.

**Command:**
```
/sp.constitution Create principles focused on code quality,
testing standards, user experience consistency, and performance
requirements. Include governance for technical decisions.
```

**What it creates:** `.specify/memory/constitution.md`

**Why it matters:** Your constitution ensures consistency. When AI makes decisions about architecture, libraries, or patterns, it references these principles. This prevents drift and ensures the system evolves coherently.

**Example constitution principles:**
- All API endpoints must include comprehensive error handling
- Database queries must use parameterized statements (no SQL injection)
- UI components follow Material Design guidelines
- Code coverage must exceed 80% for all business logic
- Performance budget: Page loads under 2 seconds on 3G networks

### Step 2: Define Requirements (`/sp.specify`)

Describe *what* you want to build and *why*, without worrying about technology choices.

**Command:**
```
/sp.specify Build a user dashboard that displays activity metrics,
recent notifications, and quick action buttons. Users should see
their profile summary and have easy access to settings. The dashboard
should update in real-time when new notifications arrive.
```

**What it creates:** `.specify/specs/{feature-id}/spec.md`

**Why it matters:** This step captures functional requirements, user stories, acceptance criteria, and edge cases. It's purely about the problem space, not the solution space.

**The spec includes:**
- **Overview:** High-level description of the feature
- **User Stories:** Who wants this and why
- **Functional Requirements:** Specific behaviors the feature must exhibit
- **Edge Cases:** Boundary conditions and error scenarios
- **Acceptance Criteria:** How to verify the feature works correctly

### Step 3: Clarify Ambiguities (`/sp.clarify`)

Before moving to technical planning, ensure specifications are complete and unambiguous.

**Command:**
```
/sp.clarify
```

**What it does:** AI analyzes the spec for underspecified areas and asks targeted questions to fill gaps. Answers are recorded in a Clarifications section of the spec.

**Why it matters:** Ambiguities in specs lead to implementation mismatches. Clarifying upfront prevents rework downstream.

**Example clarifications:**
- "What happens when a notification is deleted while displayed on the dashboard?"
- "Should metrics show real-time data or can they have a 5-minute lag?"
- "If settings are unavailable, should the button be disabled or hidden?"

### Step 4: Create Technical Plan (`/sp.plan`)

Now specify *how* to build the feature: technology stack, architecture, and design decisions.

**Command:**
```
/sp.plan Use React with TypeScript for the frontend. State management
with Zustand. Backend is Node.js with Express and PostgreSQL. Use
WebSockets for real-time updates. Follow REST API conventions.
```

**What it creates:**
- `.specify/specs/{feature-id}/plan.md` - Implementation plan
- `.specify/specs/{feature-id}/data-model.md` - Database schema
- `.specify/specs/{feature-id}/contracts/` - API specifications
- `.specify/specs/{feature-id}/research.md` - Tech stack details

**Why it matters:** The plan translates functional requirements into technical reality. It documents architectural decisions, identifies dependencies, and provides AI with concrete guidance for implementation.

**The plan includes:**
- **Tech Stack Rationale:** Why these technologies were chosen
- **Architecture Overview:** How components fit together
- **Data Models:** Database schemas and relationships
- **API Contracts:** Endpoint specifications (OpenAPI format)
- **Dependencies:** Libraries and their versions
- **Implementation Strategy:** Order of development

### Step 5: Generate Task Breakdown (`/sp.tasks`)

Transform the plan into an actionable, ordered task list.

**Command:**
```
/sp.tasks
```

**What it creates:** `.specify/specs/{feature-id}/tasks.md`

**Why it matters:** Tasks provide a concrete roadmap. Each task specifies what to implement, in which files, and in what order. Dependencies are explicit, enabling parallel work where possible.

**Task structure:**
```markdown
## Phase 1: Data Layer

### Task 1.1: Define database schema [P]
Files: `migrations/001_dashboard.sql`
- Create users table with profile fields
- Create notifications table with timestamps
- Create metrics table with aggregation support

### Task 1.2: Implement data access layer [P]
Files: `src/models/User.ts`, `src/models/Notification.ts`
- Create User model with CRUD operations
- Create Notification model with real-time queries
- Write unit tests for all models
```

Tasks marked `[P]` can run in parallel. Others have dependencies and must execute sequentially.

### Step 6: Implement the Feature (`/sp.implement`)

Execute the task breakdown to build the feature.

**Command:**
```
/sp.implement
```

**What it does:**
- Validates prerequisites (constitution, spec, plan, tasks exist)
- Parses task breakdown
- Executes tasks in order, respecting dependencies
- Runs tests and builds as specified
- Provides progress updates

**Why it matters:** Implementation follows the plan systematically. AI doesn't improvise or take shortcuts—it builds exactly what was specified, in the right order, with proper testing.

## Advanced Commands

Beyond the core workflow, Spec-Kit Plus offers additional commands for quality assurance:

### `/sp.analyze` - Cross-Artifact Analysis

Checks consistency across specifications, plans, and tasks.

```
/sp.analyze
```

This command:
- Verifies all user stories have corresponding implementation tasks
- Checks that API contracts match planned endpoints
- Ensures data models cover all specified entities
- Identifies gaps in test coverage

Run this after `/sp.tasks` and before `/sp.implement` to catch issues early.

### `/sp.checklist` - Quality Validation

Generates custom checklists for validating requirements completeness.

```
/sp.checklist Create a checklist for security requirements
```

Think of checklists as "unit tests for English"—they verify your specifications meet quality standards before implementation begins.

## Supported AI Assistants

Spec-Kit Plus integrates with major AI coding tools:

| Tool | Support | Notes |
|------|---------|-------|
| **Claude Code** | ✅ Full | Recommended for complex projects |
| **Cursor** | ✅ Full | Excellent IDE integration |
| **GitHub Copilot** | ✅ Full | Works in VS Code |
| **Windsurf** | ✅ Full | Multi-model support |
| **Qwen Code** | ✅ Full | Strong open-source option |
| **Gemini CLI** | ✅ Full | Google's offering |

Each tool accesses the same slash commands, ensuring consistent workflow regardless of your AI assistant choice.

## Getting Started with Spec-Kit Plus

### Installation

Install via pip or uv:

```bash
# Using pip
pip install specifyplus

# Using uv (recommended)
uv tool install specifyplus

# Verify installation
sp version
```

### Initializing a Project

Create a new project:

```bash
# New project
sp init my-project --ai claude

# Or initialize in current directory
sp init --here --ai claude
```

This creates the `.specify` directory structure and configures slash commands for your chosen AI assistant.

### Your First Feature

Once initialized, start your AI assistant (e.g., `claude`) in the project directory. You'll see the `/sp.*` commands available.

Follow the six-step workflow:

1. **Define principles:** `/sp.constitution Create principles...`
2. **Specify requirements:** `/sp.specify Build a...`
3. **Clarify details:** `/sp.clarify`
4. **Plan implementation:** `/sp.plan Use React with...`
5. **Generate tasks:** `/sp.tasks`
6. **Implement:** `/sp.implement`

Each step builds on the previous, creating a complete trail from idea to working code.

## Real-World Example: Building a Photo Album App

Let's walk through a concrete example.

### Step 1: Constitution

```
/sp.constitution Create principles focused on:
- Performance: Images load progressively, no blocking
- UX: Drag-and-drop must feel responsive
- Data: User data stays local, no cloud uploads
- Code: Vanilla JavaScript preferred, minimal dependencies
```

### Step 2: Specification

```
/sp.specify Build a photo album organizer. Users create albums
grouped by date. Albums display in a grid on the main page and can
be reordered by dragging. Within each album, photos display in a
tile interface. Albums cannot be nested. All data stores locally
in SQLite.
```

AI generates `spec.md` with user stories like:
- As a user, I can create new albums
- As a user, I can drag albums to reorder them
- As a user, I can view photos in an album as tiles

### Step 3: Clarification

```
/sp.clarify
```

AI asks:
- "What happens if two albums have the same date?"
- "Can users rename albums after creation?"
- "What's the maximum number of photos per album?"

You answer, and responses are captured in the spec.

### Step 4: Plan

```
/sp.plan Use Vite with vanilla JavaScript, HTML, and CSS.
SQLite for local storage. No external dependencies for drag-and-drop;
implement using native HTML5 APIs.
```

AI creates:
- **plan.md:** Architecture overview, component breakdown
- **data-model.md:** SQLite schema for albums and photos
- **research.md:** Details on HTML5 drag-and-drop API

### Step 5: Tasks

```
/sp.tasks
```

AI generates task breakdown:
```markdown
## Phase 1: Database Layer
- Task 1.1: Create SQLite schema [P]
- Task 1.2: Implement database wrapper [P]

## Phase 2: Album Management
- Task 2.1: Create album CRUD operations
- Task 2.2: Build album grid UI
- Task 2.3: Implement drag-and-drop reordering

## Phase 3: Photo Management
- Task 3.1: Add photo upload functionality
- Task 3.2: Create tile view component
- Task 3.3: Link photos to albums
```

### Step 6: Implementation

```
/sp.implement
```

AI executes each task:
1. Creates `schema.sql` with albums and photos tables
2. Implements `db.js` wrapper around SQLite
3. Builds `AlbumGrid.js` component with drag-and-drop
4. Creates `PhotoTile.js` component for image display
5. Writes tests for all components
6. Runs the build and verifies functionality

Result: A working photo album app built exactly to spec.

## Benefits of the Spec-Kit Plus Workflow

### For Solo Developers

- **Clarity:** Forces you to think through requirements before coding
- **Focus:** One step at a time; no overwhelm
- **Documentation:** Specs and plans document decisions automatically
- **Debugging:** When bugs arise, trace back through specs to find mismatches

### For Teams

- **Alignment:** Everyone understands what's being built
- **Collaboration:** Team members review specs before implementation
- **Onboarding:** New developers read specs to understand features
- **Code Reviews:** Reviews verify implementation matches specs

### For AI Collaboration

- **Context:** AI has complete context for every decision
- **Consistency:** Following the workflow prevents AI from improvising
- **Quality:** Structured process catches issues before they become code
- **Traceability:** Every line of code traces back to a requirement

## Common Patterns and Tips

### Multiple Features in Parallel

Each feature gets its own directory under `.specify/specs/`:

```
.specify/specs/
├── 001-photo-albums/
├── 002-user-profiles/
└── 003-sharing-features/
```

Develop features in separate Git branches. The spec structure keeps them organized.

### Iterative Refinement

Specs aren't write-once documents. As you learn more:

1. Update the spec with new requirements
2. Regenerate the plan: `/sp.plan`
3. Update tasks: `/sp.tasks`
4. Continue implementation: `/sp.implement`

The workflow accommodates change gracefully.

### Constitution Evolution

Your constitution grows with your project. When you establish new patterns or make architectural decisions, update `.specify/memory/constitution.md` so future features benefit.

### Integration with Existing Projects

Spec-Kit Plus works with brownfield projects:

```bash
cd existing-project
sp init --here --ai claude
```

This adds the `.specify` structure without disrupting existing code. Use it for new features while leaving legacy code untouched.

## Troubleshooting

### "Command not found" Error

If `/sp.*` commands aren't available after initialization, ensure:
1. You're running your AI assistant from the project root
2. The `.specify/templates/commands/` directory exists
3. Your AI tool supports slash commands (see compatibility table)

### AI Skips Steps

If AI tries to jump straight to coding without following the workflow:

```
Stop. We're using Spec-Kit Plus workflow. First, let's create
the specification with /sp.specify before any implementation.
```

Explicitly remind AI to follow the process.

### Specs Don't Match Implementation

Run `/sp.analyze` to check consistency. If mismatches exist, decide:
- Update the spec to match reality (if implementation is correct)
- Update code to match the spec (if spec is correct)

Keep them in sync.

## Best Practices

### Do:
- **Run `/sp.clarify` before planning:** Prevents ambiguous requirements
- **Use `/sp.analyze` before implementing:** Catches issues early
- **Update constitution as you learn:** Capture patterns and decisions
- **Review specs with stakeholders:** Get feedback before coding
- **Keep specs and code in sync:** Update specs when requirements change

### Don't:
- **Skip steps:** Each step has purpose; shortcuts create gaps
- **Over-specify tech details in specs:** Save tech decisions for `/sp.plan`
- **Let specs drift:** Stale specs are worse than no specs
- **Ignore AI questions during `/sp.clarify`:** Those questions reveal gaps
- **Rush to implementation:** The workflow's value is in the preparation

## Conclusion

Spec-Kit Plus transforms spec-driven development from a manual, ad-hoc process into a structured, repeatable workflow. By providing clear steps, templates, and AI integration, it ensures quality outcomes without sacrificing speed.

The toolkit's genius is simplicity. Six commands guide you from vague idea to production-ready code. Each command has a clear purpose. Each step builds on the previous. The result: software that does what you intended, built faster than traditional methods, with documentation that stays relevant.

Whether you're building solo projects or coordinating team efforts, Spec-Kit Plus provides the structure needed to harness AI's power effectively. It's the bridge between spec-driven methodology and practical implementation.

In the next chapter, we'll explore Claude Code specifically—one of the most powerful AI assistants for spec-driven development workflows.
