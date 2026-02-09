

## Fix "No" Button First Tap Animation

**Problem:** When the "No" button is tapped for the first time, it jumps/teleports to its new position instead of smoothly sliding. This happens because the button starts with static positioning (no inline styles) and then switches to `position: fixed` with `left`/`top` values — the CSS `transition` only applies to `left` and `top`, but the initial change from static to fixed positioning causes an instant jump.

**Solution:** Initialize the button's position on mount so it already has `position: fixed` with its actual coordinates from the start. That way, when `dodgeNo` is called, the transition between two fixed positions will animate smoothly.

### Technical Details

**File: `src/components/ValentinePage.tsx`**

1. Use a `useEffect` + `useRef` to capture the button's natural position on mount
2. Initialize `noPos` with those coordinates immediately so the button is always rendered with `position: fixed`
3. This ensures the first tap transitions from one fixed position to another, triggering the existing CSS transition smoothly

Changes:
- Add a `buttonRef` ref to the "No" button
- Add a `useEffect` that reads the button's `getBoundingClientRect()` on mount and sets `noPos` to that initial position
- Remove the conditional style logic — always apply fixed positioning once the initial position is captured
- Keep existing `dodgeNo` logic for subsequent taps

