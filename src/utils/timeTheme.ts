export type ThemeOverride = 'auto' | 'light' | 'dark';
export type EffectiveScheme = 'light' | 'dark';

type RGB = [number, number, number];
type Anchor = { hour: number; background: RGB; teal: RGB; amber: RGB };

/* Smooth local-time palette: morning → midday → golden hour → evening → night. */
const ANCHORS: Anchor[] = [
  { hour: 5, background: [253, 248, 240], teal: [61, 139, 130], amber: [209, 158, 74] },
  { hour: 10, background: [255, 253, 247], teal: [18, 110, 103], amber: [201, 145, 60] },
  { hour: 16, background: [253, 238, 222], teal: [185, 128, 55], amber: [229, 139, 73] },
  { hour: 19, background: [94, 68, 57], teal: [91, 201, 188], amber: [235, 171, 77] },
  { hour: 22, background: [35, 29, 26], teal: [80, 214, 199], amber: [219, 153, 69] },
  { hour: 29, background: [253, 248, 240], teal: [61, 139, 130], amber: [209, 158, 74] },
];

const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t),
];
const rgb = (value: RGB, alpha?: number) => `rgb(${value.join(' ')}${alpha === undefined ? '' : ` / ${alpha}`})`;
const luminance = ([r, g, b]: RGB) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

const paletteAt = (hour: number) => {
  const normalized = hour < 5 ? hour + 24 : hour;
  const startIndex = ANCHORS.findIndex((anchor, index) => index < ANCHORS.length - 1 && normalized >= anchor.hour && normalized <= ANCHORS[index + 1].hour);
  const start = ANCHORS[startIndex < 0 ? 0 : startIndex];
  const end = ANCHORS[(startIndex < 0 ? 0 : startIndex) + 1];
  const progress = (normalized - start.hour) / (end.hour - start.hour);
  return { background: mix(start.background, end.background, progress), teal: mix(start.teal, end.teal, progress), amber: mix(start.amber, end.amber, progress) };
};

export const getThemeOverride = (): ThemeOverride => 'auto';
export const setThemeOverride = (_override: ThemeOverride) => undefined;
export const getNextManualOverride = (_scheme: EffectiveScheme): Exclude<ThemeOverride, 'auto'> => 'light';

export const applyTimeTheme = (_override: ThemeOverride): EffectiveScheme => {
  const root = document.documentElement;
  const now = new Date();
  const palette = paletteAt(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
  const dark = luminance(palette.background) < 0.45;
  const text: RGB = dark ? [255, 249, 241] : [43, 38, 67];
  const secondary: RGB = dark ? [238, 229, 219] : [82, 75, 106];
  const muted: RGB = dark ? [205, 193, 183] : [120, 112, 140];
  const surface = mix(palette.background, dark ? [55, 45, 40] : [255, 255, 255], dark ? 0.46 : 0.64);
  const elevated = mix(surface, dark ? [76, 62, 56] : [255, 255, 255], dark ? 0.38 : 0.48);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tokens: Record<string, string> = {
    '--accent-color': palette.teal.join(' '), '--bg-base': rgb(palette.background), '--bg-surface': rgb(surface, dark ? 0.8 : 0.78), '--bg-elevated': rgb(elevated, dark ? 0.92 : 0.94), '--bg-overlay': rgb(elevated, 0.98),
    '--text-primary': rgb(text), '--text-secondary': rgb(secondary), '--text-muted': rgb(muted), '--text-faint': rgb(muted, 0.78), '--accent-cyan': rgb(palette.teal), '--accent-red': rgb(palette.amber), '--accent-green': rgb(dark ? [105, 205, 153] : [56, 158, 122]),
    '--border-subtle': rgb(text, dark ? 0.14 : 0.13), '--border-soft': rgb(text, dark ? 0.24 : 0.22), '--border-focus': rgb(palette.teal, 0.58), '--card-bg': rgb(surface, dark ? 0.72 : 0.72), '--card-bg-hover': rgb(elevated, 0.94),
    '--card-shadow': `0 18px 50px ${rgb(dark ? [0, 0, 0] : [93, 70, 150], dark ? 0.28 : 0.12)}`, '--sidebar-bg': rgb(surface, 0.72), '--sidebar-border': rgb(text, 0.13), '--header-bg': rgb(palette.background, 0.82), '--header-border': rgb(text, 0.13),
    '--statusbar-bg': rgb(dark ? [29, 24, 22] : palette.teal), '--statusbar-text': rgb(dark ? [255, 249, 241] : [255, 255, 255]), '--tab-active-bg': rgb(palette.teal, 0.14), '--tab-active-indicator': rgb(palette.teal), '--btn-primary-bg': rgb(palette.teal), '--btn-primary-text': rgb(dark ? [20, 29, 27] : [255, 255, 255]),
    '--btn-primary-glow': rgb(palette.teal, 0.3), '--btn-ghost-border': rgb(text, 0.22), '--btn-ghost-text': rgb(text), '--code-bg': rgb(surface, 0.76), '--code-border': rgb(text, 0.16), '--glow-line-via': rgb(palette.teal, 0.46), '--scrollbar-thumb': rgb(palette.teal, 0.28), '--scrollbar-hover': rgb(palette.teal, 0.44),
    '--interactive-glow-shadow': `0 12px 28px ${rgb(palette.teal, 0.18)}`, '--interactive-glow-border': rgb(palette.teal, 0.46), '--interactive-glow-bg': rgb(palette.teal, 0.08), '--mobile-menu-bg': rgb(elevated), '--mobile-menu-border': rgb(text, 0.16), '--theme-transition': reduceMotion ? '0ms linear' : '900ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  };
  Object.entries(tokens).forEach(([name, value]) => root.style.setProperty(name, value));
  root.dataset.themeScheme = dark ? 'dark' : 'light';
  return dark ? 'dark' : 'light';
};

export const subscribeTimeTheme = (overrideGetter: () => ThemeOverride, onApplied: (scheme: EffectiveScheme) => void) => {
  const apply = () => onApplied(applyTimeTheme(overrideGetter()));
  apply();
  const interval = window.setInterval(apply, 60_000);
  return () => window.clearInterval(interval);
};
