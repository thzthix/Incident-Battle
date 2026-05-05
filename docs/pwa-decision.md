# PWA Decision

## Decision

Build the MVP as a `mobile-friendly web app first`, with a `thin PWA base`.

That means:

- yes to PWA compatibility
- no to install-first product strategy
- no to deep offline architecture in the first playable version

## Why

This product fits PWA usage patterns well:

- short repeatable sessions
- easy friend-to-friend sharing
- strong mobile usage
- value from home-screen launch

But the MVP success criteria are still:

- battle feel
- smooth input and feedback
- replayable scenario loop

So installation should be a later polish point, not the launch goal.

## MVP Scope

Include:

- responsive mobile layout
- `manifest.json`
- app icon
- theme color
- basic service worker
- static asset caching
- fast revisit experience

## Defer

Do not prioritize these yet:

- aggressive install prompts
- full offline play
- push notifications
- background sync
- complex cache versioning
- offline progress storage

## Offline Strategy

Use a partial offline model:

1. app shell and static assets can cache
2. scenario data can cache
3. if network is unavailable, rule-based scoring can still work
4. LLM coaching can gracefully disable when offline

This is more realistic than trying to make the first version fully offline.

## Product Positioning

Launch positioning:

- `mobile web game that happens to be installable`

Not:

- `installable app first`

## Recommendation For Build Order

1. finish first playable browser version
2. confirm mobile UX is good
3. add manifest and basic cache
4. test add-to-home-screen flow
5. only then decide whether to promote installation in the UI

## One-Line Summary

`PWA is a good fit, but it should be a light compatibility layer around the MVP, not the main product story.`
