/** Mały, spójny zestaw ikon liniowych (stroke="currentColor") — bez zależności zewnętrznych. */
function Svg({ size = 22, className, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function CompassIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M14.8 9.2 L12.9 13.9 L9.2 14.8 L11.1 10.1 Z" />
    </Svg>
  );
}

export function LayersIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 L20.5 8 L12 12.5 L3.5 8 Z" />
      <path d="M3.5 12.5 L12 17 L20.5 12.5" />
      <path d="M3.5 16.5 L12 21 L20.5 16.5" />
    </Svg>
  );
}

export function FileIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 3.5 H13.5 L18 8 V20 A1 1 0 0 1 17 21 H7 A1 1 0 0 1 6 20 V4.5 A1 1 0 0 1 7 3.5 Z" />
      <path d="M13.5 3.5 V8 H18" />
      <path d="M9 13 H15" />
      <path d="M9 16.5 H15" />
    </Svg>
  );
}

export function UsersIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 20 C3.5 16.4 6 14.5 9 14.5 C12 14.5 14.5 16.4 14.5 20" />
      <circle cx="17" cy="9.5" r="2.25" />
      <path d="M15.5 14.7 C17.9 14.9 19.9 16.5 20.3 19.3" />
    </Svg>
  );
}

export function ChatIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 5.5 H20 V15.5 H9.5 L5.5 19 V15.5 H4 Z" />
      <path d="M8 9.5 H16" />
      <path d="M8 12.5 H13" />
    </Svg>
  );
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M8 12.3 L10.8 15 L16.2 9" />
    </Svg>
  );
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7 V12 L15.5 14.3" />
    </Svg>
  );
}

export function TargetIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function StarIcon({ filled = true, ...rest }) {
  return (
    <Svg {...rest} fill={filled ? "currentColor" : "none"}>
      <path d="M12 3.6 L14.3 9.1 L20.2 9.6 L15.7 13.5 L17.1 19.3 L12 16.1 L6.9 19.3 L8.3 13.5 L3.8 9.6 L9.7 9.1 Z" />
    </Svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 12 H19" />
      <path d="M13.5 6.5 L19 12 L13.5 17.5" />
    </Svg>
  );
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 6 H20 V18 H4 Z" />
      <path d="M4.5 6.5 L12 12.5 L19.5 6.5" />
    </Svg>
  );
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5 H9.5 L11 7.8 L8.8 9.4 C9.7 11.6 11.4 13.4 13.6 14.3 L15.2 12.1 L19.5 13.6 V16.6 C19.5 18.6 17.8 20.2 15.8 19.9 C9.9 19 4.8 14 3.9 8.1 C3.6 6.1 5.2 4.4 6.5 3.5 Z" />
    </Svg>
  );
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21 C12 21 18.5 14.8 18.5 10 C18.5 6.1 15.6 3 12 3 C8.4 3 5.5 6.1 5.5 10 C5.5 14.8 12 21 12 21 Z" />
      <circle cx="12" cy="10" r="2.4" />
    </Svg>
  );
}

export function SendIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 12 L20 4.5 L13.5 20 L11 13 Z" />
      <path d="M11 13 L20 4.5" />
    </Svg>
  );
}

/** Głowa z żarówką — rady pedagogiczne / szkolenia. */
export function HeadLightbulbIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9 20 H15" />
      <path d="M10 17.5 H14" />
      <path d="M12 4.5 C8.7 4.5 6.5 7 6.5 9.8 C6.5 11.7 7.4 13 8.6 14.1 C9.3 14.7 9.6 15.3 9.7 16 H14.3 C14.4 15.3 14.7 14.7 15.4 14.1 C16.6 13 17.5 11.7 17.5 9.8 C17.5 7 15.3 4.5 12 4.5 Z" />
      <path d="M12 4.5 V2.3" />
    </Svg>
  );
}

/** Dłonie trzymające serce — warsztaty dla rodziców. */
export function HandHeartIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 9.3 C11 7.9 9 7.6 7.9 8.9 C6.9 10.1 7.1 11.7 8.2 12.8 L12 16.5 L15.8 12.8 C16.9 11.7 17.1 10.1 16.1 8.9 C15 7.6 13 7.9 12 9.3 Z" />
      <path d="M3.5 18.5 C5 17 6.6 16.3 8.3 16.3 H12.5 C13.4 16.3 14.1 17 14.1 17.8 C14.1 18.6 13.4 19.3 12.5 19.3 H9.5" />
      <path d="M20.5 18.5 C19 17 17.4 16.3 15.7 16.3 H14" />
    </Svg>
  );
}

/** Atom — zajęcia dla uczniów / samorozwój. */
export function AtomIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </Svg>
  );
}

/** Dłoń z sadzonką — tutoring / superwizje, rozwój. */
export function SproutIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 15.5 C3.5 19 6 21 12 21 C18 21 20.5 19 20.5 15.5 C14.5 15.5 9.5 15.5 3.5 15.5 Z" />
      <path d="M12 15.5 V9" />
      <path d="M12 9 C12 6 10 4.5 7 4.5 C7 7.6 9 9 12 9 Z" />
      <path d="M12 11.5 C12 9 13.7 7.7 16 7.7 C16 10.1 14.5 11.5 12 11.5 Z" />
    </Svg>
  );
}

/** Samolot — prelekcje podróżnicze. */
export function PlaneIcon(props) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <path d="M21 12.5 L13.8 9.9 L11.2 3.4 L9.5 3.9 L10.9 10.3 L4.9 8.9 L3.3 10 L8.9 13 L4.2 15 L4.6 16.5 L9.9 15.8 L8.4 19.6 L9.9 20.3 L13.3 15.5 L19.4 14.2 Z" />
    </Svg>
  );
}
