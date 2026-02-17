# Specification

## Summary
**Goal:** Restore reliable access to all Learning Modes entry points, expand the chapter catalog with English Grammar and Hindi Vyakaran, and add an in-app Premium upgrade option with persistent status per Internet Identity user.

**Planned changes:**
- Fix Learning Modes navigation and mode launching so it works from primary navigation, Home quick-access, the Learning Modes list Start buttons, and Chapter Detail Start Learning buttons.
- Ensure the Learning Mode Run page renders without errors for every predefined modeId and that it preserves subject + chapterId context when launched from a chapter.
- Add two new subjects (“English Grammar” and “Hindi Vyakaran”) with complete chapter/topic lists, chapter numbering, and working Chapter Detail routing.
- Implement a Premium/Upgrade section in Settings with an in-app upgrade flow that requires Internet Identity login to complete.
- Add backend APIs to read and set the caller’s Premium status with access control, and persist Premium status keyed by the user’s Internet Identity principal.

**User-visible outcome:** Users can open and start any Learning Mode from anywhere in the app without errors, browse and launch learning modes for the new English Grammar and Hindi Vyakaran chapter lists, and upgrade to Premium from Settings (with Premium status saved for their logged-in Internet Identity across sessions).
