# Bug Report

## 1. Incorrect Status Keys in getStats()

**Location:** `services/taskService.js → getStats()`

The function uses status keys `todo`, `in_progress`, and `done`, while the API defines valid statuses as `pending`, `in-progress`, and `completed`.

**Impact:** `/tasks/stats` never reports correct counts.


## 2. Missing Validation in create()

**Location:** `services/taskService.js → create()`

The function creates tasks without validating `status`, `priority`, or `dueDate`, even though validation helpers exist.

**Impact:** Invalid task data can be stored, breaking assumptions elsewhere.


## 3. completeTask() Modifies Priority

**Location:** `services/taskService.js → completeTask()`

When marking a task as complete, the function resets `priority` to `'medium'`.

**Impact:** Data corruption — completing a task should not change its priority.


## 4. Incorrect Pagination Logic

**Location:** `services/taskService.js → getPaginated()`

Offset calculated as `page * limit` assumes page starts from 0.

**Impact:** First page of results is skipped.

# Fix Implemented

I fixed the pagination logic by:

- Converting query params to numbers
- Handling invalid values
- Correcting offset to `(page - 1) * limit`
- Providing default values
# Feature: Assign Task to User

Implemented `PATCH /tasks/:id/assign`.

Design decisions:

- Validated `user` input from request body
- Prevented assigning already completed tasks
- Kept route and service logic separate
- Updated task immutably and preserved existing data
