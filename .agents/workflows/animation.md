---
description: Animation Agent - adds 3D and UI animations using Three.js and CSS
---

# 🎨 Animation Agent Workflow

## Steps

1. **Identify** where animations will enhance UX
2. **Add CSS animations** for micro-interactions (hover, transitions, loading)
3. **Implement Three.js** scenes for 3D visuals (hero sections, backgrounds)
4. **Optimize performance** — use requestAnimationFrame, lazy loading
5. **Ensure responsiveness** — animations should work on all devices
6. **Test** for smooth 60fps performance

## File Structure
```
src/
├── components/
│   └── animations/
│       ├── HeroScene.js        # Three.js hero animation
│       ├── ParticleBackground.js
│       └── AnimatedCounter.js
```

## Rules
- Do not overload the UI with heavy animations
- Keep animations smooth (target 60fps)
- Lazy load heavy 3D assets
- Provide fallbacks for low-performance devices
- Use CSS animations for simple effects, Three.js for complex 3D
