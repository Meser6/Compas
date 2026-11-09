import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CompassIcon, LayersIcon, FileIcon, UsersIcon, ChatIcon, CheckIcon } from "./Icons.jsx";

const ICONS = {
  compass: CompassIcon,
  layers: LayersIcon,
  file: FileIcon,
  users: UsersIcon,
  chat: ChatIcon,
  check: CheckIcon,
};

export function FeatureGrid({ items, trPrefix }) {
  const { tx } = useContentStrings();

  return (
    <div className="feature-grid">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] ?? CheckIcon;
        return (
          <Reveal key={item.title} className="feature-card">
            <span className="feature-card__icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <h3 className="feature-card__title">{tx(`${trPrefix}[${i}].title`, item.title)}</h3>
            <p className="feature-card__desc">{tx(`${trPrefix}[${i}].desc`, item.desc)}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
