import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import bAestheticLogo from "./assets/b-aesthetic-logo.png";

const whatsapp = (service?: string, language: "pt" | "en" = "pt") =>
  `https://wa.me/351916075728?text=${encodeURIComponent(
    language === "en"
      ? service
        ? `Hello! I would like to know more about the Plasma Jet treatment for ${service}. What availability do you have?`
        : "Hello! I would like to know more about B. aesthetic's Plasma Jet treatments. What availability do you have?"
      : service
        ? `Olá! Gostaria de saber mais sobre o tratamento de Plasma Jet para ${service}. Que disponibilidade tem?`
        : "Olá! Gostaria de saber mais sobre os tratamentos de Plasma Jet da B. aesthetic. Que disponibilidade tem?",
  )}`;

type TreatmentGroup = {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  imageAlt: string;
  imageAltEn: string;
};

const treatmentGroups: TreatmentGroup[] = [
  {
    id: "olhos",
    number: "01",
    title: "Olhos",
    titleEn: "Eyes",
    description:
      "Tratamentos para pálpebras e linhas de expressão, com o objetivo de suavizar o seu aspeto e realçar o olhar.",
    descriptionEn:
      "Treatments for eyelids and expression lines, designed to soften their appearance and enhance your eyes.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Tratamento facial numa zona dos olhos",
    imageAltEn: "A facial treatment focused around the eyes",
  },
  {
    id: "rosto",
    number: "02",
    title: "Rosto",
    titleEn: "Face",
    description:
      "Cuidados localizados para a zona à volta da boca, linha do maxilar e maçãs do rosto, adaptados aos seus objetivos.",
    descriptionEn:
      "Targeted care for the area around the mouth, jawline and cheeks, tailored to your goals.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Rosto feminino durante um cuidado de pele",
    imageAltEn: "Woman receiving a facial skincare treatment",
  },
  {
    id: "pele",
    number: "03",
    title: "Imperfeições da pele",
    titleEn: "Skin imperfections",
    description:
      "Uma abordagem precisa a pequenas imperfeições e manchas, para ajudar a uniformizar o aspeto da pele.",
    descriptionEn:
      "A precise approach to small blemishes and dark spots, helping to even the appearance of the skin.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Cuidados de pele e tratamento facial",
    imageAltEn: "Skincare products and a facial treatment",
  },
  {
    id: "corpo",
    number: "04",
    title: "Corpo",
    titleEn: "Body",
    description:
      "Tratamentos direcionados a estrias, cicatrizes e flacidez, com atenção individual a cada zona.",
    descriptionEn:
      "Targeted treatments for stretch marks, scars and skin laxity, with individual attention to each area.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Cuidado corporal num espaço de estética",
    imageAltEn: "Body care in an aesthetics studio",
  },
];

const testimonials = {
  pt: [
    "“Quero perceber o tratamento antes de tomar uma decisão.”",
    "“Uma conversa individual ajuda-me a escolher com confiança.”",
    "“Valorizo aconselhamento claro e pensado para a minha pele.”",
  ],
  en: [
    "“I want to understand the treatment before making a decision.”",
    "“A personal conversation helps me choose with confidence.”",
    "“I value clear advice tailored to my skin.”",
  ],
} as const;

function BrandMark({ english = false }: { english?: boolean }) {
  return (
    <a
      className="plasma-brand"
      href="#inicio"
      aria-label={english ? "B. aesthetic, home" : "B. aesthetic, início"}
    >
      <img
        className="plasma-brand-image"
        src={bAestheticLogo}
        alt="B. aesthetic — Be aesthetic. Be you"
      />
    </a>
  );
}

function BookingLink({
  children,
  service,
  outline = false,
  language = "pt",
}: {
  children: React.ReactNode;
  service?: string;
  outline?: boolean;
  language?: "pt" | "en";
}) {
  return (
    <Button asChild variant={outline ? "salonOutline" : "salon"}>
      <a href={whatsapp(service, language)} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function PlasmaLanding() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [pauseTestimonials, setPauseTestimonials] = useState(false);
  const english = language === "en";
  const testimonialQuotes = testimonials[language];

  useEffect(() => {
    if (pauseTestimonials) return;

    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonialQuotes.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [pauseTestimonials, testimonialQuotes.length]);

  const changeTestimonial = (direction: -1 | 1) => {
    setActiveTestimonial(
      (current) => (current + direction + testimonialQuotes.length) % testimonialQuotes.length,
    );
  };

  return (
    <div className="plasma-page" lang={language === "pt" ? "pt-PT" : "en"}>
      <header className="plasma-header">
        <div className="shell plasma-header-inner">
          <BrandMark english={english} />
          <nav
            className="plasma-nav"
            aria-label={english ? "Main navigation" : "Navegação principal"}
          >
            <a href="#tratamentos">{english ? "Treatments" : "Tratamentos"}</a>
            <a href="#sobre-mim">{english ? "About me" : "Sobre mim"}</a>
            <a href="#testemunhos">{english ? "Feedback" : "Testemunhos"}</a>
            <a href="#contactos">{english ? "Contact" : "Contactos"}</a>
          </nav>
          <div className="plasma-header-actions">
            <div
              className="plasma-language"
              role="group"
              aria-label={english ? "Choose language" : "Escolher idioma"}
            >
              <button type="button" aria-pressed={!english} onClick={() => setLanguage("pt")}>
                PT
              </button>
              <span aria-hidden="true">/</span>
              <button type="button" aria-pressed={english} onClick={() => setLanguage("en")}>
                EN
              </button>
            </div>
            <Button asChild variant="salon">
              <a href="#tratamentos">{english ? "View services" : "Ver serviços"}</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="plasma-hero" id="inicio" aria-labelledby="plasma-title">
          <img
            className="plasma-hero-backdrop"
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1920&q=90"
            alt={
              english
                ? "Illustrative facial treatment being applied to a woman's face"
                : "Imagem ilustrativa de um tratamento facial aplicado no rosto de uma mulher"
            }
            fetchPriority="high"
          />
          <div className="shell plasma-hero-grid">
            <div className="plasma-hero-copy">
              <p className="eyebrow">
                {english ? "Advanced aesthetics · Lagos" : "Estética avançada · Lagos"}
              </p>
              <h1 id="plasma-title">
                {english ? "Your skin," : "A sua pele,"}
                <br />
                <em>{english ? "a fresh perspective." : "com novo olhar."}</em>
              </h1>
              <p className="plasma-lead">
                {english
                  ? "Plasma Jet: a precise aesthetic treatment designed to enhance your natural beauty."
                  : "Plasma Jet: um cuidado estético preciso, pensado para realçar a sua beleza natural."}
              </p>
              <div className="plasma-hero-actions">
                <BookingLink language={language}>
                  {english ? "Talk to the professional" : "Falar com a profissional"}
                </BookingLink>
                <a className="plasma-text-link" href="#tratamentos">
                  {english ? "Explore treatments" : "Explorar tratamentos"}{" "}
                  <ArrowDown size={14} aria-hidden="true" />
                </a>
              </div>
              <p className="plasma-hero-note">
                <Sparkles size={15} aria-hidden="true" />
                {english
                  ? "Personal advice before every treatment"
                  : "Aconselhamento personalizado antes de cada tratamento"}
              </p>
            </div>
          </div>
          <a
            className="plasma-scroll-cue"
            href="#tratamentos"
            aria-label={english ? "Scroll to treatments" : "Descer para tratamentos"}
          >
            <span>{english ? "Discover" : "Descobrir"}</span>
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </section>

        <section id="tratamentos" className="plasma-treatments" aria-labelledby="treatments-title">
          <div className="shell">
            <div className="plasma-section-heading">
              <div>
                <p className="eyebrow">
                  {english ? "Plasma Jet · treatments" : "Tratamentos · Plasma Jet"}
                </p>
                <h2 id="treatments-title">
                  {english ? "Care tailored" : "Cuidado pensado"}
                  <br />
                  <em>{english ? "for each area." : "para cada zona."}</em>
                </h2>
              </div>
              <p>
                {english
                  ? "Every skin is unique. Discover the four treatment areas and get in touch to find out which option may suit you."
                  : "Cada pele é única. Descubra as quatro áreas de tratamento e fale comigo para saber qual poderá ser a mais indicada para si."}
              </p>
            </div>

            <div className="plasma-treatment-grid">
              {treatmentGroups.map((group) => (
                <article className="plasma-treatment-card" id={group.id} key={group.id}>
                  <img
                    className="plasma-treatment-image"
                    src={group.image}
                    alt={english ? group.imageAltEn : group.imageAlt}
                    loading="lazy"
                  />
                  <span className="plasma-number">{group.number}</span>
                  <div className="plasma-card-heading">
                    <h3>{english ? group.titleEn : group.title}</h3>
                  </div>
                  <p className="plasma-treatment-benefit">
                    {english ? group.descriptionEn : group.description}
                  </p>
                  <a
                    className="plasma-card-link"
                    href={whatsapp(
                      english
                        ? group.titleEn.toLowerCase()
                        : group.title.toLocaleLowerCase("pt-PT"),
                      language,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {english ? "Discover treatments" : "Conhecer tratamentos"}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="plasma-method" id="sobre-mim" aria-labelledby="method-title">
          <div className="shell plasma-method-inner">
            <div className="plasma-method-aside">
              <img src={bAestheticLogo} alt="B. aesthetic — Be aesthetic. Be you" loading="lazy" />
            </div>
            <div className="plasma-method-copy">
              <p className="eyebrow">{english ? "A little about me" : "Um pouco sobre mim"}</p>
              <h2 id="method-title">
                {english ? "Care that starts" : "Um cuidado que começa"}
                <br />
                <em>{english ? "with listening." : "por ouvir."}</em>
              </h2>
              <p>
                {english
                  ? "I believe every treatment should begin with a conversation. I take time to understand what matters to you, explain the options and offer personal guidance so you can make an informed choice."
                  : "Acredito que cada tratamento deve começar por uma conversa. Procuro perceber o que é importante para si, explicar as opções e acompanhá-la para que possa escolher com confiança."}
              </p>
              <p>
                {english
                  ? "At B. aesthetic, my approach to Plasma Jet is personal, thoughtful and focused on your individual needs."
                  : "Na B. aesthetic, a minha abordagem ao Plasma Jet é pessoal, ponderada e centrada nas necessidades de cada pessoa."}
              </p>
              <BookingLink
                service={english ? "a Plasma Jet assessment" : "uma avaliação de Plasma Jet"}
                outline
                language={language}
              >
                {english ? "Get in touch" : "Fale comigo"}
              </BookingLink>
            </div>
          </div>
        </section>

        <section
          className="plasma-testimonials"
          id="testemunhos"
          aria-labelledby="testimonials-title"
        >
          <div className="shell">
            <div className="plasma-section-heading">
              <div>
                <p className="eyebrow">
                  {english ? "A thoughtful experience" : "Uma experiência cuidada"}
                </p>
                <h2 id="testimonials-title">
                  {english ? "What matters" : "O que importa"}
                  <br />
                  <em>{english ? "to you." : "para si."}</em>
                </h2>
              </div>
              <p>
                {english
                  ? "Clear information, personal attention and realistic expectations at every step."
                  : "Informação clara, atenção pessoal e expectativas realistas em cada etapa."}
              </p>
            </div>
            <p className="plasma-demo-note">
              {english
                ? "ILLUSTRATIVE EXAMPLES · NOT REAL CUSTOMER REVIEWS"
                : "EXEMPLOS ILUSTRATIVOS · NÃO SÃO TESTEMUNHOS REAIS"}
            </p>
            <div
              className="plasma-testimonial-carousel"
              aria-roledescription={english ? "carousel" : "carrossel"}
              aria-label={english ? "Illustrative testimonials" : "Testemunhos ilustrativos"}
              onPointerEnter={() => setPauseTestimonials(true)}
              onPointerLeave={() => setPauseTestimonials(false)}
              onFocusCapture={() => setPauseTestimonials(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setPauseTestimonials(false);
                }
              }}
            >
              <figure className="plasma-testimonial" aria-live="polite">
                <span className="plasma-testimonial-number">
                  {String(activeTestimonial + 1).padStart(2, "0")}
                </span>
                <blockquote>{testimonialQuotes[activeTestimonial]}</blockquote>
                <figcaption>
                  {english
                    ? "Illustrative example · not a real customer review"
                    : "Exemplo ilustrativo · não é um testemunho real"}
                </figcaption>
              </figure>
              <div className="plasma-testimonial-controls">
                <button
                  type="button"
                  onClick={() => changeTestimonial(-1)}
                  aria-label={english ? "Previous testimonial" : "Testemunho anterior"}
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <span>
                  {String(activeTestimonial + 1).padStart(2, "0")} /{" "}
                  {String(testimonialQuotes.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => changeTestimonial(1)}
                  aria-label={english ? "Next testimonial" : "Testemunho seguinte"}
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="plasma-contact" id="contactos" aria-labelledby="contact-title">
          <div className="shell plasma-contact-inner">
            <div>
              <p className="eyebrow">B. aesthetic · Lagos</p>
              <h2 id="contact-title">
                {english ? "Let's talk" : "Vamos conversar"}
                <br />
                <em>{english ? "about your skin?" : "sobre a sua pele?"}</em>
              </h2>
              <p className="plasma-contact-intro">
                {english
                  ? "Send me a message to find out more or arrange your assessment."
                  : "Envie-me uma mensagem para saber mais ou combinar a sua avaliação."}
              </p>
              <div className="plasma-contact-details">
                <p>
                  <MapPin size={17} aria-hidden="true" />
                  {english ? "Rua José Afonso, 3D" : "Rua José Afonso, 3D"}
                  <br />
                  8600-601 Lagos
                </p>
                <a href="tel:+351916075728">
                  <Phone size={17} aria-hidden="true" />
                  +351 916 075 728
                </a>
                <a
                  href="https://www.instagram.com/b.aesthetic.lagos/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={17} aria-hidden="true" />
                  @b.aesthetic.lagos
                </a>
              </div>
              <div className="plasma-contact-actions">
                <BookingLink language={language}>
                  {english ? "Book via WhatsApp" : "Marcar por WhatsApp"}
                </BookingLink>
                <Button asChild variant="salonOutline">
                  <a href="tel:+351916075728">
                    {english ? "Call" : "Ligar"} <Phone aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="plasma-map-wrap">
              <iframe
                className="plasma-map"
                src="https://www.google.com/maps?q=Rua+Jos%C3%A9+Afonso+3D%2C+8600-601+Lagos%2C+Portugal&output=embed"
                title={
                  english
                    ? "Interactive map to B. aesthetic in Lagos"
                    : "Mapa interativo para a B. aesthetic em Lagos"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="plasma-map-caption">
                <span>
                  <MapPin size={14} aria-hidden="true" /> Rua José Afonso, 3D · Lagos
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Afonso+3D%2C+8600-601+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {english ? "Open in Maps" : "Abrir no Maps"}{" "}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="plasma-footer">
        <div className="shell plasma-footer-inner">
          <BrandMark english={english} />
          <p>© {new Date().getFullYear()} B. aesthetic · Lagos</p>
          <a
            href="https://www.instagram.com/b.aesthetic.lagos/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da B. aesthetic"
          >
            <Instagram size={17} aria-hidden="true" />
          </a>
        </div>
      </footer>
      <a
        className="plasma-whatsapp-float"
        href={whatsapp(undefined, language)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          english
            ? "Message B. aesthetic on WhatsApp"
            : "Enviar mensagem à B. aesthetic pelo WhatsApp"
        }
      >
        <MessageCircle aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

export default PlasmaLanding;
