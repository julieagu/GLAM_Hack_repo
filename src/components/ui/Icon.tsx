import type { SVGProps } from "react";

// Line icons from the design: 1.4–1.8px stroke, round caps, currentColor.
const paths = {
  menu: <path d="M3 8h18M3 16h18" strokeWidth="1.4" />,
  "arrow-up-right": <path d="M7 17L17 7M8.5 7H17v8.5" strokeWidth="1.6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.6" />,
  "arrow-up": <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="1.8" />,
  "chevron-left": <path d="M15 5l-7 7 7 7" strokeWidth="1.6" />,
  "chevron-right": <path d="M9 5l7 7-7 7" strokeWidth="1.6" />,
  plus: <path d="M12 5v14M5 12h14" strokeWidth="1.8" />,
  close: <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="1.8" />,
  thermometer: <path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0z" strokeWidth="1.6" />,
  drop: <path d="M12 3.5c3.2 3.8 6 7.2 6 10.5a6 6 0 0 1-12 0c0-3.3 2.8-6.7 6-10.5z" strokeWidth="1.6" />,
  sun: (
    <g strokeWidth="1.6">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </g>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" strokeWidth="1.6" />,
  signal: (
    <g strokeWidth="1.7">
      <path d="M5 12a7 7 0 0 1 14 0M8.5 12a3.5 3.5 0 0 1 7 0" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </g>
  ),
  clock: (
    <g strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </g>
  ),
  lock: (
    <g strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </g>
  ),
  box: (
    <g strokeWidth="1.6">
      <path d="M4 8l8-4 8 4v9l-8 4-8-4z" />
      <path d="M4 8l8 4 8-4M12 12v9" />
    </g>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" strokeWidth="1.6" />,
  eye: (
    <g strokeWidth="1.6">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  camera: (
    <g strokeWidth="1.6">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </g>
  ),
  alert: (
    <g strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5" />
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
    </g>
  ),
  globe: (
    <g strokeWidth="1.5">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z" />
    </g>
  ),
  linkedin: (
    <g strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.7 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
    </g>
  ),
  instagram: (
    <g strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </g>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 16, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
