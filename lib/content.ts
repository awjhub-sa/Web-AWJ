/**
 * Every string on the site lives here, in both languages, so copy can be
 * edited without touching layout.
 *
 * Arabic is the source language — the design was drawn RTL and English is a
 * second face on the same structure, not a separate site. `Content` is derived
 * from the Arabic object and the English one is annotated with it, so a key
 * added to one language fails the build until it exists in the other.
 *
 * Source of truth for the Arabic copy: AWJHUB_introduction_V1.pptx (الرؤية،
 * الرسالة، الأهداف، الخدمات، المشاريع) — wording kept as written in the deck.
 */

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

/** Where each language lives. Arabic keeps the bare domain. */
export const localePath: Record<Locale, string> = { ar: "/", en: "/en" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Language-independent facts. One place to change an account or a domain. */
export const site = {
  nameAr: "أوج لحلول الأعمال",
  nameEn: "AWJ HUB",
  shortAr: "أوج",
  taglineAr: "من التعقيد إلى البساطة",
  taglineEn: "Complex operations, made simple",
  domain: "awjhub.com",
  email: "info@awjhub.com",
  handle: "@awjhub",
  /** All social accounts live behind one link instead of three dead ones. */
  linktree: "https://linktr.ee/awjhub",
};

/**
 * The delivery window quoted across the site. The numbers are language-neutral;
 * the unit and the caveat are translated below.
 */
export const delivery = { min: 2, max: 6 };

type Service = {
  id: string;
  title: string;
  body: string;
  /** Key into `serviceIcons` in components/Icons.tsx. */
  icon: "build" | "web" | "support";
  points: string[];
};

type Project = {
  id: string;
  name: string;
  subtitle: string;
  status: string;
  logoLight: string;
  logoDark: string;
  summary: string;
  /** Line introducing the feature list, ending in a colon. */
  lead: string;
  features: string[];
};

export type Content = {
  dir: "rtl" | "ltr";
  /** The other language, for the header switch. */
  alternate: { locale: Locale; label: string; aria: string };
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogLocale: string;
    keywords: string[];
    /** Schema.org Organization description. */
    orgDescription: string;
  };
  /** Wordmark for this language: Arabic script or Latin. */
  logo: string;
  header: {
    homeAria: string;
    startProject: string;
    openMenu: string;
    closeMenu: string;
    mainNavAria: string;
    mobileNavAria: string;
    skipToContent: string;
  };
  nav: { href: string; label: string }[];
  delivery: { unit: string; note: string };
  pillars: string[];
  hero: {
    badge: string;
    /** The headline is two lines; only the last words carry the gradient. */
    titleTop: string;
    titleBottomLead: string;
    titleBottomHighlight: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cards: { title: string; body: string; extra?: string }[];
  };
  services: { eyebrow: string; title: string; body: string; items: Service[] };
  projects: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    cta: string;
    items: Project[];
  };
  why: {
    eyebrow: string;
    title: string;
    body: string;
    items: { title: string; body: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    deliveryLabel: string;
    steps: { step: string; title: string; body: string; duration: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    body: string;
    items: { q: string; a: string }[];
  };
  cta: { titleTop: string; titleBottom: string; body: string; button: string };
  contact: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    body: string;
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    phone: string;
    phonePlaceholder: string;
    service: string;
    servicePlaceholder: string;
    serviceOther: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    status: {
      sending: string;
      sent: string;
      handoff: string;
      error: string;
    };
    /** Labels for the plain-text message handed to the visitor's mail client. */
    mail: { subject: string; name: string; company: string; email: string; phone: string; service: string };
  };
  footer: {
    tagline: string;
    links: string;
    services: string;
    projects: string;
    contact: string;
    allAccounts: string;
    rights: string;
  };
};

const ar: Content = {
  dir: "rtl",
  alternate: { locale: "en", label: "English", aria: "Switch to English" },
  meta: {
    title: "أوج لحلول الأعمال | AWJ HUB",
    titleTemplate: "%s | أوج لحلول الأعمال",
    description:
      "أوج لحلول الأعمال — البيت التقني الذي تُبنى فيه حلول الأعمال. نصمّم الحل الرقمي، ونشغّله، ونبقى معك بعد التسليم. تنفيذ المواقع والتطبيقات خلال 2 إلى 6 أسابيع.",
    ogLocale: "ar_SA",
    keywords: [
      "أوج",
      "أوج لحلول الأعمال",
      "AWJ HUB",
      "awjhub",
      "حلول رقمية",
      "تطوير مواقع",
      "تطوير تطبيقات",
      "أتمتة العمليات",
      "نصاب",
      "NSAB",
      "حلول الإعاشة",
    ],
    orgDescription:
      "البيت التقني الذي تُبنى فيه حلول الأعمال: تصميم وتطبيق الحلول الرقمية، إنشاء التطبيقات والمواقع الإلكترونية، والدعم الفني.",
  },
  logo: "/assets/awj-ar-light.svg",
  header: {
    homeAria: `${site.nameAr} — الصفحة الرئيسية`,
    startProject: "ابدأ مشروعك",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    mainNavAria: "رئيسية",
    mobileNavAria: "جوال",
    skipToContent: "تخطَّ إلى المحتوى",
  },
  nav: [
    { href: "#home", label: "الرئيسية" },
    { href: "#about", label: "من نحن" },
    { href: "#services", label: "خدماتنا" },
    { href: "#projects", label: "مشاريعنا" },
    { href: "#process", label: "كيف نعمل" },
    { href: "#contact", label: "تواصل معنا" },
  ],
  delivery: {
    unit: "أسابيع",
    note: "من اعتماد النطاق حتى الإطلاق، حسب حجم النظام وجاهزية المحتوى.",
  },
  pillars: [
    "تصميم وتطبيق الحلول",
    "إنشاء تطبيقات ومواقع إلكترونية",
    "الدعم الفني",
  ],
  hero: {
    badge: "البيت التقني لحلول الأعمال",
    titleTop: "من التعقيد",
    titleBottomLead: "إلى",
    titleBottomHighlight: "البساطة",
    lead: "نحوّل العمليات المعقّدة إلى أنظمة واضحة قابلة للقياس والمساءلة. نصمّم الحل الرقمي، ونشغّله، ونبقى معك بعد التسليم.",
    ctaPrimary: "ابدأ مشروعك",
    ctaSecondary: "شاهد مشاريعنا",
  },
  about: {
    eyebrow: "من نحن",
    title: "أوج لحلول الأعمال",
    body: "شركة سعودية تبني الأنظمة التي تُدار بها الأعمال — من التحليل والتصميم، إلى التنفيذ والإطلاق، ثم التشغيل والدعم.",
    cards: [
      {
        title: "رؤيتنا",
        body: "أن نكون البيت التقني الذي تُبنى فيه حلول الأعمال بمعايير واحدة من الإتقان.",
        extra: "نصنع أنظمة تُدار بها الأعمال الحقيقية، لا نماذج تُعرض وتُنسى.",
      },
      {
        title: "رسالتنا",
        body: "نحوّل العمليات المعقّدة إلى أنظمة واضحة قابلة للقياس والمساءلة.",
      },
      {
        title: "أهدافنا",
        body: "نضع بين يدي كل منشأة أدوات تجعل عملياتها أوضح وقرارها مسنودًا ببيانات.",
      },
    ],
  },
  services: {
    eyebrow: "خدماتنا",
    title: "ما نقدمه لك",
    body: "نصمّم الحل الرقمي، ونشغّله، ونبقى معك بعد التسليم.",
    items: [
      {
        id: "build",
        title: "تصميم وتطبيق الحلول",
        body: "حلول رقمية للأفراد والشركات، من الفكرة والتحليل حتى التنفيذ والإطلاق.",
        icon: "build",
        points: [
          "تحليل العملية الحالية وتحديد ما يستحق الأتمتة فعلًا",
          "تصميم تجربة الاستخدام والواجهات قبل كتابة أي سطر برمجي",
          "بناء الموقع أو التطبيق وإطلاقه على بيئة تشغيل حقيقية",
        ],
      },
      {
        id: "web",
        title: "إنشاء تطبيقات ومواقع إلكترونية",
        body: "مواقع وتطبيقات تُبنى من الصفر بهوية عملك، سريعة على كل شاشة وجاهزة لمحرّكات البحث.",
        icon: "web",
        points: [
          "مواقع تعريفية ومتاجر إلكترونية ولوحات تحكم بواجهة عربية سليمة الاتجاه",
          "تطبيقات جوال تعمل على iOS وأندرويد من قاعدة واحدة",
          "سرعة التحميل وتهيئة محرّكات البحث مقيسة قبل التسليم لا بعده",
        ],
      },
      {
        id: "support",
        title: "الدعم الفني",
        body: "فريق يستقبل البلاغات ويعالج الأعطال ويضمن استمرارية الخدمة دون انقطاع.",
        icon: "support",
        points: [
          "قناة بلاغات واحدة بأوقات استجابة متفق عليها",
          "معالجة الأعطال الحرجة أولًا وفق أولوية واضحة",
          "تدريب فريقك على النظام حتى يستغني عن الدعم في المهام اليومية",
        ],
      },
    ],
  },
  projects: {
    eyebrow: "مشاريعنا",
    titleLead: "أنظمة بنيناها،",
    titleHighlight: "وتعمل اليوم فعلًا",
    cta: "اطلب عرضًا لمشروع مشابه",
    items: [
      {
        id: "nsab",
        name: "منصة نِصاب",
        subtitle: "لحلول الإعاشة",
        status: "قيد التشغيل",
        logoLight: "/assets/nsab-light.svg",
        logoDark: "/assets/nsab-dark.svg",
        summary:
          "منصة تخدم شركات الحج خلال الموسم عبر أتمتة إعاشة الحجاج في المخيمات.",
        lead: "منصة تخدم شركات الحج خلال الموسم عبر أتمتة إعاشة الحجاج في المخيمات، وتمكّنهم من:",
        features: [
          "ربط شركة الحج بالمتعهد داخل نظام واحد",
          "تنظيم مواعيد الوجبات ومتابعة مراحل تنفيذها",
          "رفع البلاغات الميدانية من موقع الحدث عبر التطبيق",
          "متابعة طلبات الإسناد من خلال المنصة",
          "إنشاء التقارير بشكل سهل وسريع",
          "مؤشرات أداء تكشف إنتاجية كل مركز وسرعة تنفيذه — لحظة بلحظة",
        ],
      },
    ],
  },
  why: {
    eyebrow: "لماذا أوج",
    title: "ما الذي يميّز طريقتنا",
    body: "نصنع أنظمة تُدار بها الأعمال الحقيقية، لا نماذج تُعرض وتُنسى.",
    items: [
      {
        title: "نظام يعمل، لا عرض تقديمي",
        body: "المخرج النهائي عندنا نظام يدخله موظفوك ويعتمدون عليه في يومهم — لا نموذج جميل يُعرض مرة ثم يُنسى.",
      },
      {
        title: "قابل للقياس والمساءلة",
        body: "كل عملية نبنيها تخرج ببيانات ومؤشرات، فتعرف أين يتأخر العمل ومن ينجزه ومتى — بدل التقدير والاجتهاد.",
      },
      {
        title: "لا نختفي بعد التسليم",
        body: "التشغيل والدعم جزء من الخدمة لا إضافة عليها: نتابع الأداء، ونحدّث، ونستقبل البلاغات بعد الإطلاق.",
      },
      {
        title: "مدة تسليم معلومة مسبقًا",
        body: `الموقع أو التطبيق يُسلَّم خلال ${delivery.min} إلى ${delivery.max} أسابيع من اعتماد النطاق — مدة مكتوبة في العقد لا وعد شفهي.`,
      },
    ],
  },
  process: {
    eyebrow: "كيف نعمل",
    title: "من أول جلسة إلى نظام يعمل",
    deliveryLabel: "مدة تنفيذ الموقع أو التطبيق.",
    steps: [
      {
        step: "01",
        title: "الاستكشاف",
        body: "جلسة نفهم فيها عمليتك الحالية، وأين يضيع الوقت، وما الذي يستحق الأتمتة قبل غيره.",
        duration: "٣ – ٥ أيام",
      },
      {
        step: "02",
        title: "التصميم",
        body: "تحديد نطاق العمل ورسم الواجهات ومسار المستخدم، واعتماده معك قبل بدء التنفيذ.",
        duration: "أسبوع تقريبًا",
      },
      {
        step: "03",
        title: "التنفيذ والإطلاق",
        body: "بناء النظام على دفعات تراها أولًا بأول، ثم اختباره وإطلاقه على بيئة تشغيل حقيقية.",
        duration: "أسبوعان – ٤ أسابيع",
      },
      {
        step: "04",
        title: "التشغيل والدعم",
        body: "متابعة الأداء، تحديثات دورية، واستقبال البلاغات — لضمان استمرارية الخدمة بعد التسليم.",
        duration: "مستمر",
      },
    ],
  },
  faq: {
    eyebrow: "أسئلة متكررة",
    title: "ما يسأل عنه العملاء عادة",
    body: "لم تجد سؤالك؟ اكتب لنا وسنرد خلال يوم عمل واحد.",
    items: [
      {
        q: "كم يستغرق تنفيذ الموقع أو التطبيق؟",
        a: `من ${delivery.min} إلى ${delivery.max} أسابيع من اعتماد النطاق حتى الإطلاق. المدة داخل هذا النطاق تتحدد بحجم النظام وعدد الشاشات وجاهزية المحتوى والمتطلبات لديك.`,
      },
      {
        q: "هل تعملون مع الأفراد أم الشركات فقط؟",
        a: "الاثنان. نقدّم حلولًا رقمية للأفراد والشركات — من فكرة فردية تحتاج منصة، إلى منشأة تريد أتمتة عملية قائمة.",
      },
      {
        q: "ماذا يحدث بعد التسليم؟",
        a: "التشغيل والدعم جزء من خدمتنا: نتولّى تشغيل النظام ومتابعة أدائه وتحديثه وحفظ بياناته، مع فريق يستقبل البلاغات ويعالج الأعطال.",
      },
      {
        q: "هل تبنون أنظمة من الصفر أم تطوّرون القائم؟",
        a: "كلاهما. نبدأ من التحليل: إن كان لديك نظام قائم نطوّره أو نربطه، وإن لم يكن نبنيه من الصفر بما يناسب عمليتك.",
      },
      {
        q: "من يملك النظام والبيانات؟",
        a: "أنت. الكود والبيانات ملك للعميل، وتُسلَّم كاملة مع وثائق التشغيل عند نهاية التعاقد.",
      },
    ],
  },
  cta: {
    titleTop: "جاهزون لمناقشة احتياجك",
    titleBottom: "وتحويله إلى نظام يعمل",
    body: "جلسة أولى نفهم فيها عمليتك، ونخرج منها بنطاق عمل واضح ومدة تنفيذ ملتزم بها.",
    button: "احجز جلسة",
  },
  contact: {
    eyebrow: "تواصل معنا",
    titleLead: "احكِ لنا عن",
    titleHighlight: "العملية التي تُتعبك",
    body: `أرسل تفاصيل احتياجك وسنعود إليك بنطاق عمل مبدئي وتقدير للمدة والتكلفة. التنفيذ عادة بين ${delivery.min} و${delivery.max} أسابيع.`,
    name: "الاسم",
    namePlaceholder: "اسمك الكامل",
    company: "الجهة / الشركة",
    companyPlaceholder: "اسم المنشأة (اختياري)",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    phonePlaceholder: "05xxxxxxxx (اختياري)",
    service: "الخدمة المطلوبة",
    servicePlaceholder: "اختر الخدمة",
    serviceOther: "غير ذلك",
    message: "تفاصيل الاحتياج",
    messagePlaceholder:
      "ما العملية التي تريد أتمتتها؟ من يستخدمها؟ وما الموعد المستهدف؟",
    submit: "أرسل الطلب",
    status: {
      sending: "جارٍ الإرسال…",
      sent: "وصلنا طلبك — نعود إليك خلال يوم عمل واحد.",
      handoff: "تم تجهيز رسالتك — أكمل الإرسال من برنامج البريد لديك.",
      error: "تعذّر الإرسال. جرّب مرة أخرى أو راسلنا مباشرة على البريد أعلاه.",
    },
    mail: {
      subject: "طلب مشروع",
      name: "الاسم",
      company: "الجهة",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      service: "الخدمة",
    },
  },
  footer: {
    tagline: `${site.taglineAr} — نحوّل العمليات المعقّدة إلى أنظمة واضحة قابلة للقياس والمساءلة.`,
    links: "روابط",
    services: "خدماتنا",
    projects: "مشاريعنا",
    contact: "تواصل",
    allAccounts: "كل حساباتنا",
    rights: "جميع الحقوق محفوظة.",
  },
};

const en: Content = {
  dir: "ltr",
  alternate: { locale: "ar", label: "العربية", aria: "التبديل إلى العربية" },
  meta: {
    title: "AWJ HUB | Business Solutions",
    titleTemplate: "%s | AWJ HUB",
    description:
      "AWJ HUB — the technical house where business solutions are built. We design the digital solution, run it, and stay with you after delivery. Sites and apps delivered in 2 to 6 weeks.",
    ogLocale: "en_US",
    keywords: [
      "AWJ",
      "AWJ HUB",
      "awjhub",
      "business solutions Saudi Arabia",
      "digital solutions",
      "web development",
      "mobile app development",
      "process automation",
      "NSAB",
      "catering platform",
    ],
    orgDescription:
      "The technical house where business solutions are built: solution design and delivery, web and mobile app development, and technical support.",
  },
  logo: "/assets/awj-en-light.svg",
  header: {
    homeAria: `${site.nameEn} — home`,
    startProject: "Start your project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavAria: "Main",
    mobileNavAria: "Mobile",
    skipToContent: "Skip to content",
  },
  nav: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ],
  delivery: {
    unit: "weeks",
    note: "From scope sign-off to launch — where you land depends on the size of the system and how ready your content is.",
  },
  pillars: [
    "Solution design and delivery",
    "Web and mobile app development",
    "Technical support",
  ],
  hero: {
    badge: "The technical house for business solutions",
    titleTop: "From complexity",
    titleBottomLead: "to",
    titleBottomHighlight: "simplicity",
    lead: "We turn complex operations into clear systems you can measure and hold to account. We design the digital solution, run it, and stay with you after delivery.",
    ctaPrimary: "Start your project",
    ctaSecondary: "See our work",
  },
  about: {
    eyebrow: "About us",
    title: "AWJ for Business Solutions",
    body: "A Saudi company building the systems businesses actually run on — from analysis and design, to delivery and launch, then operation and support.",
    cards: [
      {
        title: "Our vision",
        body: "To be the technical house where business solutions are built to a single standard of craft.",
        extra:
          "We build systems that run real businesses — not prototypes shown once and forgotten.",
      },
      {
        title: "Our mission",
        body: "We turn complex operations into clear systems that can be measured and held to account.",
      },
      {
        title: "Our goals",
        body: "To put in every organisation's hands the tools that make its operations clearer and its decisions backed by data.",
      },
    ],
  },
  services: {
    eyebrow: "Our services",
    title: "What we do for you",
    body: "We design the digital solution, run it, and stay with you after delivery.",
    items: [
      {
        id: "build",
        title: "Solution design and delivery",
        body: "Digital solutions for individuals and companies, from idea and analysis through to build and launch.",
        icon: "build",
        points: [
          "Mapping your current process and deciding what is genuinely worth automating",
          "Designing the experience and the interfaces before a line of code is written",
          "Building the site or app and launching it on real production infrastructure",
        ],
      },
      {
        id: "web",
        title: "Web and mobile app development",
        body: "Sites and apps built from scratch in your brand, fast on every screen and ready for search engines.",
        icon: "web",
        points: [
          "Company sites, online stores and dashboards — including full right-to-left Arabic interfaces",
          "Mobile apps running on iOS and Android from a single codebase",
          "Load speed and search-engine readiness measured before handover, not after",
        ],
      },
      {
        id: "support",
        title: "Technical support",
        body: "A team that takes your reports, clears faults, and keeps the service running without interruption.",
        icon: "support",
        points: [
          "One reporting channel with agreed response times",
          "Critical faults handled first, on a clear order of priority",
          "Training your team on the system until daily work needs no support",
        ],
      },
    ],
  },
  projects: {
    eyebrow: "Our projects",
    titleLead: "Systems we built,",
    titleHighlight: "running in production today",
    cta: "Ask for a quote on a similar project",
    items: [
      {
        id: "nsab",
        name: "NSAB Platform",
        subtitle: "for catering solutions",
        status: "In production",
        logoLight: "/assets/nsab-light.svg",
        logoDark: "/assets/nsab-dark.svg",
        summary:
          "A platform serving Hajj companies through the season by automating pilgrim catering in the camps.",
        lead: "A platform serving Hajj companies through the season by automating pilgrim catering in the camps. It lets them:",
        features: [
          "Connect the Hajj company and the caterer inside one system",
          "Schedule meal times and track each stage of delivery",
          "File field reports from the scene through the app",
          "Follow up assignment requests through the platform",
          "Produce reports quickly and easily",
          "See performance indicators exposing each centre's output and speed — moment by moment",
        ],
      },
    ],
  },
  why: {
    eyebrow: "Why AWJ",
    title: "What makes our approach different",
    body: "We build systems that run real businesses — not prototypes shown once and forgotten.",
    items: [
      {
        title: "A working system, not a slide deck",
        body: "What you get is a system your staff log into and rely on every day — not a handsome mockup shown once and then forgotten.",
      },
      {
        title: "Measurable and accountable",
        body: "Every process we build produces data and indicators, so you know where work stalls, who moved it and when — instead of guessing.",
      },
      {
        title: "We do not disappear after handover",
        body: "Operation and support are part of the service, not an add-on: we watch performance, ship updates, and take your reports after launch.",
      },
      {
        title: "A delivery window known upfront",
        body: `Your site or app is delivered within ${delivery.min} to ${delivery.max} weeks of scope sign-off — a figure written into the contract, not a verbal promise.`,
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "From the first session to a working system",
    deliveryLabel: "Delivery time for a site or an app.",
    steps: [
      {
        step: "01",
        title: "Discovery",
        body: "A session to understand your current process, where time is lost, and what deserves automating before anything else.",
        duration: "3 – 5 days",
      },
      {
        step: "02",
        title: "Design",
        body: "Setting the scope, drawing the interfaces and the user journey, and signing it off with you before the build starts.",
        duration: "About a week",
      },
      {
        step: "03",
        title: "Build and launch",
        body: "Building the system in increments you see as they land, then testing it and launching on real production infrastructure.",
        duration: "2 – 4 weeks",
      },
      {
        step: "04",
        title: "Operation and support",
        body: "Performance monitoring, regular updates, and an open reporting channel — so the service keeps running after handover.",
        duration: "Ongoing",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "What clients usually ask",
    body: "Did not find your question? Write to us and we will answer within one business day.",
    items: [
      {
        q: "How long does a site or an app take?",
        a: `${delivery.min} to ${delivery.max} weeks from scope sign-off to launch. Where you land in that range depends on the size of the system, the number of screens, and how ready your content and requirements are.`,
      },
      {
        q: "Do you work with individuals or only with companies?",
        a: "Both. We build digital solutions for individuals and companies alike — from one person's idea that needs a platform, to an organisation automating a process it already runs.",
      },
      {
        q: "What happens after handover?",
        a: "Operation and support are part of our service: we run the system, watch its performance, update it and keep its data safe, with a team that takes your reports and clears faults.",
      },
      {
        q: "Do you build from scratch or develop what already exists?",
        a: "Both. We start from analysis: if you already have a system we extend or integrate it, and if you do not, we build one that fits your process.",
      },
      {
        q: "Who owns the system and the data?",
        a: "You do. The code and the data belong to the client, handed over in full with operating documentation at the end of the engagement.",
      },
    ],
  },
  cta: {
    titleTop: "Ready to talk through what you need",
    titleBottom: "and turn it into a working system",
    body: "A first session to understand your process, ending with a clear scope and a delivery window we commit to.",
    button: "Book a session",
  },
  contact: {
    eyebrow: "Contact us",
    titleLead: "Tell us about",
    titleHighlight: "the process that wears you down",
    body: `Send us the details and we will come back with an initial scope and an estimate of time and cost. Delivery usually takes ${delivery.min} to ${delivery.max} weeks.`,
    name: "Name",
    namePlaceholder: "Your full name",
    company: "Organisation / company",
    companyPlaceholder: "Company name (optional)",
    email: "Email address",
    phone: "Mobile number",
    phonePlaceholder: "+966 5x xxx xxxx (optional)",
    service: "Service needed",
    servicePlaceholder: "Choose a service",
    serviceOther: "Something else",
    message: "What you need",
    messagePlaceholder:
      "Which process do you want to automate? Who uses it? And what is your target date?",
    submit: "Send request",
    status: {
      sending: "Sending…",
      sent: "We have your request — we will come back to you within one business day.",
      handoff: "Your message is ready — finish sending it from your mail app.",
      error:
        "Could not send. Try again, or email us directly at the address above.",
    },
    mail: {
      subject: "Project enquiry",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Mobile",
      service: "Service",
    },
  },
  footer: {
    tagline: `${site.taglineEn} — we turn complex operations into clear systems you can measure and hold to account.`,
    links: "Links",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    allAccounts: "All our accounts",
    rights: "All rights reserved.",
  },
};

export function getContent(locale: Locale): Content {
  return locale === "en" ? en : ar;
}
