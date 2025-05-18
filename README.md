Boiler Plate Project containing several pre-made UI components that allow for more custom visual adjustments

Tech Stack: Vite + React + TS + TailwindCSS

UI Components:
- Accordion
- Carousel
- Drawer
- Dropdown
- Dual Range Slider
- Modal
- On-hover Tooltips / Popups

Additional Packages Installed:
- @sglara/cn: helps customize classes for TailwindCSS
- framer-motion: can help make animations easier
- react-hot-toast: lightweight and simple notifications
- react-icons: lots of handy icons available to use

Custom Hooks:
- useWindowDimensions(): keeps track of the current screen's width and height, plus a boolean to keep track of if it passes a breakpoint for mobile devices (isMobile = width < 768px)

Project is also linted with a combination of lint-staged, husky, and biome to ensure additional commits pass biome checks