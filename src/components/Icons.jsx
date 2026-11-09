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
