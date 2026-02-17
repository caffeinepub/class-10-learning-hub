# Specification

## Summary
**Goal:** Replace the Learning Mode Run page placeholder with real, mode-specific learning content and at least one interactive element for every predefined learning mode, with appropriate behavior when chapter context is present or missing.

**Planned changes:**
- Update the Learning Mode Run page to render mode-specific UI for all 20 predefined `modeId`s instead of the current generic placeholder block.
- Ensure each learning mode includes at least one interactive control that changes UI state (e.g., reveal/flip, selectable choices, check answer, next/previous, timer start/stop).
- Add chapter-aware rendering when `subject` and `chapterId` are provided via URL search params, referencing the selected chapter in the mode content.
- When chapter context is missing (or invalid), show a usable mode landing state that clearly indicates chapter selection is required for chapter-specific practice, and provide a working “Choose a Chapter” button linking to `/chapters`.
- Prevent crashes and console errors for any mode launch path (from Learning Modes list or Chapter Detail page), including invalid `subject`/`chapterId` values.

**User-visible outcome:** Opening any learning mode shows a working, mode-specific experience (not a placeholder), includes at least one interactive element, and properly adapts to whether a chapter is selected (with a clear chapter-selection call-to-action when needed).
