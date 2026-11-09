import { useId, useState } from "react";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { SendIcon } from "./Icons.jsx";

const EMPTY = { name: "", org: "", email: "", phone: "", participants: "", format: "", message: "" };

function buildMailto(email, values, labels) {
  const subject = `Zapytanie o szkolenie — ${values.org || values.name || "nowy kontakt"}`;
  const lines = [
    `${labels.nameLabel}: ${values.name}`,
    values.org ? `${labels.orgLabel}: ${values.org}` : null,
    `${labels.emailLabel}: ${values.email}`,
    values.phone ? `${labels.phoneLabel}: ${values.phone}` : null,
    values.participants ? `${labels.participantsLabel}: ${values.participants}` : null,
    values.format ? `${labels.formatLabel}: ${values.format}` : null,
    "",
    values.message,
  ].filter((l) => l !== null);
  const body = lines.join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const { t, tx } = useContentStrings();
  const ui = CONTENT.ui.contactForm;
  const co = CONTENT.contact;
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus("error");
      return;
    }
    const href = buildMailto(co.email, values, ui);
    window.location.href = href;
    setStatus("success");
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h3 className="contact-form__heading">{tx("ui.contactForm.heading", ui.heading)}</h3>
      <p className="contact-form__sub">{tx("ui.contactForm.sub", ui.sub)}</p>

      <div className="contact-form__grid">
        <label className="field" htmlFor={`${uid}-name`}>
          <span className="field__label">{tx("ui.contactForm.nameLabel", ui.nameLabel)} *</span>
          <input
            id={`${uid}-name`}
            type="text"
            required
            value={values.name}
            onChange={set("name")}
            placeholder={tx("ui.contactForm.namePlaceholder", ui.namePlaceholder)}
            autoComplete="name"
          />
        </label>

        <label className="field" htmlFor={`${uid}-org`}>
          <span className="field__label">{tx("ui.contactForm.orgLabel", ui.orgLabel)}</span>
          <input
            id={`${uid}-org`}
            type="text"
            value={values.org}
            onChange={set("org")}
            placeholder={tx("ui.contactForm.orgPlaceholder", ui.orgPlaceholder)}
            autoComplete="organization"
          />
        </label>

        <label className="field" htmlFor={`${uid}-email`}>
          <span className="field__label">{tx("ui.contactForm.emailLabel", ui.emailLabel)} *</span>
          <input
            id={`${uid}-email`}
            type="email"
            required
            value={values.email}
            onChange={set("email")}
            placeholder={tx("ui.contactForm.emailPlaceholder", ui.emailPlaceholder)}
            autoComplete="email"
          />
        </label>

        <label className="field" htmlFor={`${uid}-phone`}>
          <span className="field__label">{tx("ui.contactForm.phoneLabel", ui.phoneLabel)}</span>
          <input
            id={`${uid}-phone`}
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            placeholder={tx("ui.contactForm.phonePlaceholder", ui.phonePlaceholder)}
            autoComplete="tel"
          />
        </label>

        <label className="field" htmlFor={`${uid}-participants`}>
          <span className="field__label">{tx("ui.contactForm.participantsLabel", ui.participantsLabel)}</span>
          <input
            id={`${uid}-participants`}
            type="text"
            inputMode="numeric"
            value={values.participants}
            onChange={set("participants")}
            placeholder={tx("ui.contactForm.participantsPlaceholder", ui.participantsPlaceholder)}
          />
        </label>

        <label className="field" htmlFor={`${uid}-format`}>
          <span className="field__label">{tx("ui.contactForm.formatLabel", ui.formatLabel)}</span>
          <select id={`${uid}-format`} value={values.format} onChange={set("format")}>
            <option value="" />
            {ui.formatOptions.map((opt, i) => (
              <option key={opt} value={opt}>
                {tx(`ui.contactForm.formatOptions[${i}]`, opt)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field" htmlFor={`${uid}-message`}>
        <span className="field__label">{tx("ui.contactForm.messageLabel", ui.messageLabel)} *</span>
        <textarea
          id={`${uid}-message`}
          required
          rows={4}
          value={values.message}
          onChange={set("message")}
          placeholder={tx("ui.contactForm.messagePlaceholder", ui.messagePlaceholder)}
        />
      </label>

      <div className="contact-form__footer">
        <p className="contact-form__note">{tx("ui.contactForm.requiredNote", ui.requiredNote)}</p>
        <button type="submit" className="btn btn-primary">
          {tx("ui.contactForm.submit", ui.submit)}
          <SendIcon size={17} />
        </button>
      </div>

      {status === "success" ? (
        <p className="contact-form__status contact-form__status--ok" role="status">
          <strong>{tx("ui.contactForm.successTitle", ui.successTitle)}</strong> {tx("ui.contactForm.successBody", ui.successBody)}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="contact-form__status contact-form__status--error" role="alert">
          {tx("ui.contactForm.errorRequired", ui.errorRequired)}
        </p>
      ) : null}
    </form>
  );
}
