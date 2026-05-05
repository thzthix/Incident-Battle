# Player Action VFX Spec

## Goal

Define lightweight MVP animation and UI feedback for the `10 player actions`.

This spec should feel strongly inspired by DS-era turn battles while staying:

- cheap to implement
- readable on mobile
- compatible with `transform`, `opacity`, and tiny particle bursts
- reusable across multiple scenarios

## Global Rules

- every action uses the same base cadence:
  1. action line in textbox
  2. player sprite tiny nudge
  3. one action-specific effect
  4. state chip reaction
  5. result line
- total effect time should stay between `450ms` and `900ms`
- do not use complex masking, skeletal animation, or heavy shaders
- prefer one visual metaphor per action
- use at most `6` particles per action burst

## Shared Timing Template

- action confirm freeze: `80ms`
- player sprite nudge forward: `90ms`
- main effect: `180-320ms`
- state chip reaction: `160ms`
- result text pop: `140ms`

## 1. `범위 파악`

- visual metaphor:
  scanning the battlefield to reveal affected zones
- tiny animation effect:
  a thin horizontal scan line sweeps once across the stage, followed by 3 small square blips appearing over the active state area
- timing:
  `90ms` nudge + `260ms` scan + `120ms` blip fade
- UI reaction:
  active state chips get a brief outline glow, and the question panel highlights the words related to `영향` or `범위`
- result-line example:
  `영향 범위를 먼저 읽어냈다!`

## 2. `변경 추적`

- visual metaphor:
  tracing a fresh footprint backward to the source
- tiny animation effect:
  3 pale blue afterimage streaks slide backward from center to left, then snap into one pinpoint flash
- timing:
  `90ms` nudge + `220ms` backward streak + `80ms` pinpoint flash
- UI reaction:
  the newest-looking state chip pulses once, and the battle log area briefly tints cool blue
- result-line example:
  `최근 변경의 흔적을 정확히 짚었다!`

## 3. `관측 세우기`

- visual metaphor:
  bringing fuzzy telemetry into focus
- tiny animation effect:
  a soft noise overlay clears into 4 small vertical bars rising like metrics, then settling
- timing:
  `90ms` nudge + `180ms` noise fade + `180ms` metric rise
- UI reaction:
  blurred or uncertain state chips sharpen for a beat, and the textbox border flickers from gray to cyan
- result-line example:
  `흐린 정보 속에서 근거를 세웠다!`

## 4. `의존성 점검`

- visual metaphor:
  checking linked nodes in a chain
- tiny animation effect:
  3 small dots connected by thin lines pulse in sequence from player side toward opponent side, with the middle node flashing last
- timing:
  `90ms` nudge + `300ms` chain pulse
- UI reaction:
  dependency-related state chips briefly show a line-link icon, and any secondary context panel slides in by `6px`
- result-line example:
  `묶인 구간을 차분히 짚어냈다!`

## 5. `우선순위 선언`

- visual metaphor:
  placing a clear marker on the first target
- tiny animation effect:
  one bright chevron drops from above and locks onto the center of the battlefield with a small pulse ring
- timing:
  `90ms` nudge + `180ms` drop + `120ms` pulse
- UI reaction:
  the chosen action button stays lit longer than usual, and one core state chip gets a stronger border to show focus
- result-line example:
  `먼저 볼 대상을 분명히 세웠다!`

## 6. `원인 분리`

- visual metaphor:
  splitting tangled threads into clean lanes
- tiny animation effect:
  one central line branches into 3 thin lanes that fan out slightly, then hold for a beat
- timing:
  `90ms` nudge + `240ms` branch split + `80ms` hold
- UI reaction:
  two related state chips drift apart by `4px` before returning, making the separation readable
- result-line example:
  `원인 후보를 깔끔하게 분리했다!`

## 7. `즉시 우회`

- visual metaphor:
  finding a live side route around danger
- tiny animation effect:
  a curved arc line slips around the center and lands on a glowing side marker with 2 tiny spark particles
- timing:
  `90ms` nudge + `220ms` arc travel + `100ms` landing spark
- UI reaction:
  one dangerous state chip dims slightly while a support-colored badge flashes on the edge of the HUD
- result-line example:
  `위험 구간을 피해 우회로를 열었다!`

## 8. `되돌리기`

- visual metaphor:
  rewinding to a safer state
- tiny animation effect:
  a short reverse streak pulls backward, followed by a 2-frame echo of the player sprite snapping into place
- timing:
  `90ms` nudge + `180ms` reverse streak + `120ms` echo settle
- UI reaction:
  the screen takes a brief cool-tint flash, and `변경 흔적` or `복구 창` chips pulse in reverse order
- result-line example:
  `안전한 시점으로 판단을 되감았다!`

## 9. `우선 차단`

- visual metaphor:
  raising a quick barrier to stop spread
- tiny animation effect:
  a flat shield panel pops up for a moment in front of the player side, with 3 tiny fragments stopping against it
- timing:
  `90ms` nudge + `160ms` shield pop + `140ms` fragment stop
- UI reaction:
  spread-related state chips shake once then lose some glow, and the lower HUD gets a short protective flash
- result-line example:
  `확산 전에 선을 먼저 그었다!`

## 10. `상황 공유`

- visual metaphor:
  broadcasting a clear signal outward
- tiny animation effect:
  2 soft concentric rings expand from the player HUD upward, each fading as it grows
- timing:
  `90ms` nudge + `260ms` double pulse
- UI reaction:
  a compact message tag pops near the textbox, and trust-related or pressure-related chips soften in color for a moment
- result-line example:
  `상황을 명확하게 공유했다!`

## Action Family Color Guide

- analysis:
  `cyan / pale blue`
- prioritization:
  `gold / warm white`
- mitigation:
  `orange / mint`
- rollback:
  `cool blue / white`
- communication:
  `green / sky`

## Implementation Notes

- use reusable keyframes:
  - `nudge-forward`
  - `scan-sweep`
  - `pulse-ring`
  - `tiny-pop`
  - `fade-rise`
  - `reverse-streak`
- particles can be plain `div` elements with border-radius and opacity fades
- state chip reactions should reuse the same glow component with only color changes
- all action effects should work with reduced motion by collapsing to:
  - sprite nudge off
  - one opacity flash
  - result text pop only

## MVP Recommendation

If implementation time is tight, prioritize these 5 feeling-makers first:

1. `범위 파악`
2. `우선순위 선언`
3. `즉시 우회`
4. `되돌리기`
5. `상황 공유`

These 5 cover the widest emotional range and will make the battle feel alive fastest.
