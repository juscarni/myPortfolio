// Runs in <head>, before the first paint: marks that JavaScript is on (so the reveal animations
// can hide content until it scrolls in) and, as a safety net, shows the hero after 2.5 s
// even if its entrance animation never ran (a background tab, for example).
document.documentElement.classList.add('js');
setTimeout(function () { document.documentElement.classList.add('hero-done'); }, 2500);
