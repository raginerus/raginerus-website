import { useEffect, useState } from "react";

export default function RaginerusLandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    document.title = "Raginerus – Datendrehscheibe für Telefonmarketing";

    const ensureMeta = (name: string, content: string, attr = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const ensureLink = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!tag) {
        tag = document.createElement("link");
        tag.rel = rel;
        document.head.appendChild(tag);
      }
      tag.href = href;
    };

    ensureMeta(
      "description",
      "Raginerus ist eine Serviceplattform für den strukturierten Datenaustausch von Leads und Abschlüssen zwischen Telefonmarketing-Unternehmen und Auftraggebern. Die Plattform ermöglicht die automatisierte Übertragung, Transformation und Rückmeldung von Daten in beide Richtungen."
    );
    ensureMeta(
      "keywords",
      "Telefonmarketing Datentransfer, Lead Datenaustausch, Abschluss Datenaustausch, Leads übertragen, Abschlüsse übertragen, Lead Rückmeldungen System, Abschluss Rückmeldungen System, Datendrehscheibe Telefonmarketing, Lead Schnittstelle CRM, Abschluss Schnittstelle CRM, automatischer Datenaustausch Telefonmarketing"
    );
    ensureMeta(
      "og:title",
      "Raginerus – Datendrehscheibe für Telefonmarketing",
      "property"
    );
    ensureMeta(
      "og:description",
      "Serviceplattform für den strukturierten Datenaustausch von Leads und Abschlüssen im Telefonmarketing zwischen Marketing-Unternehmen und Auftraggebern.",
      "property"
    );
    ensureMeta("og:type", "website", "property");
    ensureMeta("og:image", "https://raginerus.com/og-preview.png", "property");
    ensureLink("canonical", "https://raginerus.com/");

    const existingSchema = document.getElementById("raginerus-schema");
    if (existingSchema) existingSchema.remove();

    const schemaScript = document.createElement("script");
    schemaScript.id = "raginerus-schema";
    schemaScript.type = "application/ld+json";
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Raginerus",
          url: "https://raginerus.com/",
          email: "raghinerus@gmail.com",
          telephone: "+49 1749320812",
          logo: "https://raginerus.com/og-preview.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Leopold-Messmer-Weg 4a",
            postalCode: "78166",
            addressLocality: "Donaueschingen",
            addressCountry: "DE",
          },
        },
        {
          "@type": "WebSite",
          name: "Raginerus",
          url: "https://raginerus.com/",
          description:
            "Serviceplattform für den strukturierten Datenaustausch von Leads und Abschlüssen im Telefonmarketing zwischen Marketing-Unternehmen und Auftraggebern.",
        },
      ],
    });
    document.head.appendChild(schemaScript);

    let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2306b6d4'/%3E%3Cstop offset='100%25' stop-color='%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='18' cy='18' r='16' fill='url(%23g)' opacity='0.15'/%3E%3Ccircle cx='18' cy='18' r='10' fill='url(%23g)' opacity='0.35'/%3E%3Ccircle cx='18' cy='18' r='4' fill='url(%23g)'/%3E%3Ccircle cx='6' cy='18' r='2' fill='%2306b6d4'/%3E%3Ccircle cx='30' cy='18' r='2' fill='%233b82f6'/%3E%3Cline x1='8' y1='18' x2='14' y2='18' stroke='%2306b6d4' stroke-width='1.5'/%3E%3Cline x1='22' y1='18' x2='28' y2='18' stroke='%233b82f6' stroke-width='1.5'/%3E%3C/svg%3E";
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = "checked" in event.target ? event.target.checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      window.alert(
        "Bitte füllen Sie Name, E-Mail und Nachricht aus und bestätigen Sie den Datenschutzhinweis."
      );
      return;
    }

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "c6cfdcea-94d2-4578-bdf3-5d8df6c0edf6",
        subject: `Anfrage über Raginerus-Website von ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        company: formData.company || "-",
        message: formData.message,
      }),
    })
      .then(async (response) => {
        const result = await response.json();
        if (response.ok && result.success) {
          window.alert("Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet.");
          setFormData({
            name: "",
            company: "",
            email: "",
            message: "",
            consent: false,
          });
        } else {
          window.alert("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.");
        }
      })
      .catch(() => {
        window.alert("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.");
      });
  };

  const features = [
    {
      title: "Service statt Softwarekauf",
      text: "Keine Lizenzsoftware, keine lokale Installation: Der Datentransfer wird pro Datentransferformat monatlich abgerechnet.",
    },
  ];

  const serviceCards = [
    {
      title: "Einrichtung des Mappings",
      text: "Für jedes Datentransferformat wird mit einem Mapping definiert, wie Lead- bzw. Abschluss-Daten aus dem Marketing-System in das Format des Auftraggebers übertragen werden und wie Rückmeldungen wieder zum Marketing-Unternehmen zurückgeführt werden.",
      note: "Berechnung einer Konfigurationspauschale für Standard-Mappings. Mehrdimensionale Mappings werden nach Aufwand berechnet.",
    },
    {
      title: "Nutzungsbasiertes Servicemodell",
      text: "Abgerechnet wird nicht über Softwarelizenzen, sondern monatlich über die betriebenen Datentransferformate im laufenden Servicebetrieb.",
      note: "Transparente Abrechnung pro Format",
    },
  ];

  const leftFlow = ["Leads", "Abschlüsse", "Kampagnendaten"];
  const rightFlow = ["Bearbeitungsstatus", "Rückmeldungen", "Ergebnisdaten"];

  const benefits = [
    "Keine Softwareinstallation vor Ort erforderlich",
    "Keine Investition in Software erforderlich",
    "Pünktliche und fehlerfreie Bereitstellung der Daten",
    "Weniger manueller Abstimmungsaufwand",
  ];

  return (
    <>
      <style>{`
        @keyframes flowRight {
          0% { left: -10px; }
          100% { left: 100%; }
        }
        @keyframes flowLeft {
          0% { left: 100%; }
          100% { left: -10px; }
        }
      `}</style>

      <div className="min-h-screen bg-white text-slate-800">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 top-72 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>

        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="raginerusGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="16" fill="url(#raginerusGrad)" opacity="0.15" />
                <circle cx="18" cy="18" r="10" fill="url(#raginerusGrad)" opacity="0.35" />
                <circle cx="18" cy="18" r="4" fill="url(#raginerusGrad)" />
                <circle cx="6" cy="18" r="2" fill="#06b6d4" />
                <circle cx="30" cy="18" r="2" fill="#3b82f6" />
                <line x1="8" y1="18" x2="14" y2="18" stroke="#06b6d4" strokeWidth="1.5" />
                <line x1="22" y1="18" x2="28" y2="18" stroke="#3b82f6" strokeWidth="1.5" />
              </svg>
              <div>
                <div className="text-2xl font-extrabold tracking-[0.18em] text-slate-900">
                  RAGINERUS
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-700">
                  BIDIREKTIONALER DATENAUSTAUSCH ALS SERVICE
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-base font-semibold text-slate-700 md:flex">
              <a href="#start" className="transition hover:text-slate-900">
                Startseite
              </a>
              <a href="#leistung" className="transition hover:text-slate-900">
                Leistung
              </a>
              <a href="#kontakt" className="transition hover:text-slate-900">
                Kontakt
              </a>
            </nav>

            <a
              href="#kontakt"
              className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-600"
            >
              Anfrage stellen
            </a>
          </div>
        </header>

        <main id="start" className="relative">
          <section id="lead-transfer" className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-10">
              <h1 className="text-3xl font-semibold text-cyan-600 md:text-4xl">
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  Raginerus ermöglicht den strukturierten Datenaustausch von Leads und Abschlüssen im Telefonmarketing. Marketingunternehmen übertragen Leads und Abschlüsse automatisiert an Auftraggeber und erhalten Status- und Ergebnisdaten strukturiert zurück. Die Plattform fungiert als zentrale Datendrehscheibe für Lead- und Abschlussdaten und verbindet Marketing-Systeme mit CRM-Systemen der Auftraggeber.
                </p>
              </h1>

              <div className="mt-10 grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Problem</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Telefonmarketing-Unternehmen übergeben Leads und Abschlüsse häufig manuell an Auftraggeber. Unterschiedliche Datenformate, E-Mail-Listen oder Excel-Dateien führen zu Medienbrüchen, Verzögerungen und fehlenden Rückmeldungen.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Lösung</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Raginerus übernimmt den strukturierten Datenaustausch zwischen beiden Seiten. Leads und Abschlüsse werden automatisch übertragen, Datenformate werden gemappt und Auftraggeber senden Status- und Ergebnisdaten über den Rückkanal zurück.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Ergebnis</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Beide Seiten arbeiten mit kompatiblen Datenformaten. Leads und Abschlüsse werden schneller verarbeitet, Rückmeldungen sind transparent und der gesamte Datentransfer läuft automatisiert über eine zentrale Plattform.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="mt-0 w-full rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <div className="text-sm font-semibold text-white">Raginerus Systemarchitektur</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Bidirektionaler Datenaustausch
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                  aktiv
                </div>
              </div>

              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5 text-center">
                  <div className="text-sm font-semibold text-white">Telefonmarketing</div>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {leftFlow.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-col items-center gap-6 px-2">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-blue-300">
                    Leads / Abschlüsse
                  </div>

                  <div className="absolute left-1/2 top-[1.1rem] hidden h-1 w-[calc(100%+12rem)] -translate-x-1/2 overflow-hidden bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent lg:block" />
                  <div className="absolute left-1/2 top-[1.1rem] hidden h-1 w-[calc(100%+12rem)] -translate-x-1/2 overflow-hidden lg:block">
                    <span
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300"
                      style={{ animation: "flowRight 3s linear infinite" }}
                    />
                    <span
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300"
                      style={{ animation: "flowRight 3s linear infinite", animationDelay: "0.8s" }}
                    />
                    <span
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300"
                      style={{ animation: "flowRight 3s linear infinite", animationDelay: "1.6s" }}
                    />
                  </div>

                  <div className="rounded-[1.5rem] border border-cyan-400/30 bg-cyan-400/10 px-6 py-5 text-center">
                    <div className="text-lg font-semibold text-white">Raginerus</div>
                    <div className="text-xs text-slate-300">Zentrale Drehscheibe</div>
                    <div className="text-xs text-slate-400">Mapping &amp; Datentransfer</div>
                  </div>

                  <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                    Status / Ergebnisse
                  </div>

                  <div className="absolute left-1/2 bottom-[1.1rem] hidden h-1 w-[calc(100%+12rem)] -translate-x-1/2 overflow-hidden bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent lg:block" />
                  <div className="absolute left-1/2 bottom-[1.1rem] hidden h-1 w-[calc(100%+12rem)] -translate-x-1/2 overflow-hidden lg:block">
                    <span
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300"
                      style={{ animation: "flowLeft 3s linear infinite" }}
                    />
                    <span
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300"
                      style={{ animation: "flowLeft 3s linear infinite", animationDelay: "0.8s" }}
                    />
                    <span
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300"
                      style={{ animation: "flowLeft 3s linear infinite", animationDelay: "1.6s" }}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-5 text-center">
                  <div className="text-sm font-semibold text-white">Auftraggeber</div>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {rightFlow.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/40 p-4 text-sm leading-7 text-slate-300 lg:hidden">
                <div className="font-semibold text-white">Ablauf auf mobilen Geräten</div>
                <div className="mt-2">
                  Telefonmarketing übermittelt Leads und Abschlüsse an Raginerus. Auftraggeber senden Status- und Ergebnisdaten über Raginerus zurück.
                </div>
              </div>
            </div>

            <div className="mt-12 w-full">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="w-full rounded-3xl border border-slate-200 bg-sky-50 p-6 shadow-2xl shadow-black/10"
                >
                  <div className="mb-3 h-2 w-12 rounded-full bg-cyan-400/80" />
                  <h2 className="text-3xl font-semibold text-cyan-600">{item.title}</h2>
                  <p className="mt-2 text-lg leading-8 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Automatischer Datentransfer für Leads und Abschlüsse im Telefonmarketing
            </h2>
          
            <p className="mt-4 text-base leading-7 text-slate-700">
              Raginerus ist spezialisiert auf den automatisierten Datentransfer von Leads und Abschlüssen zwischen Telefonmarketing-Unternehmen und Auftraggebern. Unterschiedliche Datenformate werden über ein Mapping vereinheitlicht und zuverlässig übertragen. Gleichzeitig werden Status- und Ergebnisdaten strukturiert zurückgeführt. Dadurch entsteht ein durchgängiger, bidirektionaler Datenaustausch ohne manuelle Zwischenschritte.
            </p>
          </section>        
          <section id="leistung" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="rounded-[2rem] border border-slate-200 bg-sky-50 p-8 lg:p-10">
              <div className="mb-6 text-sm uppercase tracking-[0.32em] text-cyan-600">
                Leistung
              </div>

              <div className="mt-2 grid gap-5 lg:grid-cols-3)">
                {serviceCards.map((card) => (
                  <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="mb-3 h-10 w-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/10" />
                    <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-700">{card.text}</p>
                    {card.note && (
                      <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-50 px-4 py-3 text-sm text-cyan-700">
                        {card.note}
                      </div>
                    )}
                  </div>
                ))}

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <div className="text-sm uppercase tracking-[0.32em] text-cyan-600">Vorteile</div>

                  <div className="mt-6 grid gap-3">
                    {benefits.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="kontakt" className="mx-auto max-w-7xl px-6 pb-20 pt-4 lg:px-8">
            <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
              <div>
                <div className="text-sm uppercase tracking-[0.32em] text-cyan-600">Kontakt</div>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
                  Datentransfers technisch sauber organisieren.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">
                  Wenn Sie Leads, Abschlüsse und Rückmeldedaten zwischen Marketing-Unternehmen und Auftraggebern strukturiert austauschen möchten, ist Raginerus die passende Serviceplattform.
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Betrieben von Raginerus · Donaueschingen · Deutschland
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-700">
                    Name
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                      placeholder="Ihr Name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-700">
                    Unternehmen
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                      placeholder="Firma"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm text-slate-700">
                  E-Mail
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                    placeholder="name@unternehmen.de"
                  />
                </label>

                <label className="grid gap-2 text-sm text-slate-700">
                  Nachricht
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                  />
                </label>

                <label className="flex items-start gap-2 text-xs text-slate-500">
                  <input
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  Mit dem Absenden des Formulars stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung Ihrer Anfrage zu.
                </label>

                <button
                  type="submit"
                  className="mt-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-cyan-600"
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </section>
        </main>

        <section id="impressum" className="border-t border-slate-200 bg-slate-100/60">
          <div className="mx-auto max-w-4xl px-6 py-16 text-sm text-slate-700">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">Impressum</h2>

            <div className="max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="raginerusGradImpressum" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <circle cx="18" cy="18" r="16" fill="url(#raginerusGradImpressum)" opacity="0.15" />
                  <circle cx="18" cy="18" r="10" fill="url(#raginerusGradImpressum)" opacity="0.35" />
                  <circle cx="18" cy="18" r="4" fill="url(#raginerusGradImpressum)" />
                  <circle cx="6" cy="18" r="2" fill="#06b6d4" />
                  <circle cx="30" cy="18" r="2" fill="#3b82f6" />
                  <line x1="8" y1="18" x2="14" y2="18" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="22" y1="18" x2="28" y2="18" stroke="#3b82f6" strokeWidth="1.5" />
                </svg>
                <div className="text-lg font-semibold text-slate-900">Raginerus</div>
              </div>

              <div className="mt-2 font-medium">Rainer Schenk</div>

              <div className="mt-4 space-y-1">
                <div>Leopold-Messmer-Weg 4a</div>
                <div>78166 Donaueschingen</div>
                <div>Deutschland</div>
              </div>

              <div className="mt-4 space-y-1">
                <div>
                  E-Mail:{" "}
                  <span className="select-all">raghinerus@gmail.com</span>
                </div>
                <div>
                  Mobil:{" "}
                  <span className="select-all">+49 1749320812</span>
                </div>
                <div>
                  Telefon:{" "}
                  <span className="select-all">+49 771 4808</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="datenschutz" className="mx-auto max-w-4xl px-6 pb-16 text-sm text-slate-700">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Datenschutzerklärung</h2>

          <p className="mb-4">
            Raginerus verarbeitet personenbezogene Daten ausschließlich im Auftrag angeschlossener Marketingunternehmen. Die Plattform dient ausschließlich dem technischen Austausch von Leads, Abschlüssen und Rückmeldedaten zwischen Marketingunternehmen und Auftraggebern.
          </p>

          <p className="mb-4">
            Beim Besuch dieser Website werden durch den Hostinganbieter automatisch technische Server-Logfiles erfasst, zum Beispiel IP-Adresse, Datum und Uhrzeit der Anfrage sowie Browsertyp. Diese Daten dienen ausschließlich der technischen Sicherheit und dem Betrieb der Website.
          </p>

          <p className="mb-4">
            Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche Zustimmung.
          </p>

          <p>Die Datenübertragung dieser Website erfolgt verschlüsselt über HTTPS.</p>
        </section>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <span className="font-semibold text-slate-900">Raginerus</span> · Digitaler Service für bidirektionalen Datenaustausch
            </div>
            <div className="flex gap-6">
              <a href="#kontakt" className="hover:text-slate-900">
                Kontakt
              </a>
              <a href="#impressum" className="hover:text-slate-900">
                Impressum
              </a>
              <a href="#datenschutz" className="hover:text-slate-900">
                Datenschutz
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
