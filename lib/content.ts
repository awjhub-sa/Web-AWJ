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
  /**
   * WhatsApp in the international form wa.me expects: country code, no `+`,
   * no leading zero. Local 0567310842 → 966567310842.
   */
  whatsapp: "966567310842",
  whatsappDisplay: "+966 56 731 0842",
  /**
   * The 2026 identity. Both lockups carry the Arabic and the Latin wordmark
   * together, so unlike the old mark there is nothing to swap per language.
   * `light` is the white-on-navy cut; `dark` is the navy-on-white one.
   */
  logo: {
    wideLight: { src: "/assets/awj-wide-light.svg", width: 795, height: 181 },
    wideDark: { src: "/assets/awj-wide-dark.svg", width: 795, height: 181 },
    stackedLight: {
      src: "/assets/awj-stacked-light.svg",
      width: 1131,
      height: 1010,
    },
    stackedDark: {
      src: "/assets/awj-stacked-dark.svg",
      width: 1131,
      height: 1010,
    },
  },
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
  /**
   * Short factual chips — platform, sector. Only ever things stated elsewhere
   * on the site or in the Schema.org record, never a claim invented here.
   */
  tags?: string[];
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
  /**
   * The proof strip. Every figure here restates something the site already
   * commits to elsewhere — the contracted delivery window, the reply time in
   * the FAQ, the four process steps, the ownership answer. Nothing is an
   * estimate, so nothing here can drift out of step with the rest of the page.
   */
  stats: {
    aria: string;
    items: {
      /** Counts up from zero. Omit for a value that is not a single figure. */
      count?: number;
      suffix?: string;
      /** Shown as-is when there is no `count`, e.g. a range. */
      display?: string;
      label: string;
    }[];
  };
  services: { eyebrow: string; title: string; body: string; items: Service[] };
  projects: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    cta: string;
    /** Labels the tab strip; only rendered once there is more than one project. */
    tablistAria: string;
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
  whatsapp: {
    aria: string;
    tooltip: string;
    /** Pre-filled first message, so the visitor does not start from a blank chat. */
    prefill: string;
  };
  /**
   * The two standalone documents. Their wording describes what this site
   * actually does — no cookies, no analytics, one form that emails a Zoho
   * inbox — so it has to be revisited whenever that changes, not copied from
   * a template that describes some other site.
   */
  legal: {
    updatedLabel: string;
    updated: string;
    backHome: string;
    navAria: string;
    privacy: LegalDoc;
    terms: LegalDoc;
  };
};

type LegalDoc = {
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
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
  stats: {
    aria: "أرقام تلخّص طريقة عملنا",
    items: [
      {
        display: `${delivery.min}–${delivery.max}`,
        label: "أسابيع من اعتماد النطاق حتى الإطلاق، مكتوبة في العقد",
      },
      { count: 1, label: "يوم عمل واحد نردّ فيه على طلبك" },
      { count: 4, label: "مراحل من أول جلسة إلى نظام يعمل" },
      {
        count: 100,
        suffix: "٪",
        label: "من الكود والبيانات ملك للعميل عند التسليم",
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
    tablistAria: "اختر مشروعًا",
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
        tags: ["منصة ويب", "تطبيق iOS وأندرويد", "قطاع الحج"],
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
  whatsapp: {
    aria: "تواصل معنا عبر واتساب",
    tooltip: "راسلنا على واتساب",
    prefill: "السلام عليكم، تواصلت معكم من موقع أوج لحلول الأعمال.",
  },
  legal: {
    updatedLabel: "آخر تحديث",
    updated: "٩ سبتمبر ٢٠٢٦",
    backHome: "العودة إلى الصفحة الرئيسية",
    navAria: "روابط نظامية",
    privacy: {
      title: "سياسة الخصوصية",
      metaDescription:
        "كيف يتعامل موقع أوج لحلول الأعمال مع بياناتك: لا ملفات ارتباط ولا تحليلات، والبيانات الوحيدة التي نجمعها هي ما تكتبه في نموذج التواصل.",
      intro:
        "تشرح هذه السياسة ما الذي يجمعه موقع أوج لحلول الأعمال (awjhub.com) وما لا يجمعه، وأين تذهب بياناتك، وما حقوقك حيالها. وهي تصف الموقع كما هو مبني فعليًا اليوم، لا نموذجًا عامًا.",
      sections: [
        {
          heading: "ما لا نجمعه",
          body: "نبدأ بهذا لأنه الأهم: هذا الموقع لا يتتبّعك.",
          list: [
            "لا نضع أي ملفات ارتباط (Cookies) على جهازك — ولا حتى ملفات «ضرورية».",
            "لا نستخدم Google Analytics ولا أي أداة تحليلات أو قياس أو إعلانات.",
            "لا نستخدم التخزين المحلي في المتصفّح ولا بصمة الجهاز.",
            "خط الموقع مستضاف على خوادمنا، فلا يُرسَل أي طلب إلى جوجل أو غيرها عند فتح الصفحة.",
            "لا نبيع بياناتك ولا نشاركها لأغراض تسويقية، ولا نستخدمها في أي إعلان.",
          ],
        },
        {
          heading: "البيانات التي نجمعها",
          body: "البيانات الوحيدة التي نجمعها منك هي ما تكتبه بنفسك في نموذج التواصل وترسله باختيارك:",
          list: [
            "الاسم — مطلوب",
            "البريد الإلكتروني — مطلوب",
            "الجهة أو الشركة — اختياري",
            "رقم الجوال — اختياري",
            "الخدمة المطلوبة — اختياري",
            "تفاصيل احتياجك — اختياري",
            "لغة الصفحة التي راسلتنا منها، لنردّ عليك بلغتك",
          ],
        },
        {
          heading: "الغرض من جمعها",
          body: "نستخدم هذه البيانات لغرض واحد: الرد على طلبك ومناقشة مشروعك. الأساس النظامي لذلك هو موافقتك الصريحة عند إرسال النموذج، وتنفيذ خطوات ما قبل التعاقد بناءً على طلبك. ولا نستخدمها لأي غرض آخر دون إذنك.",
        },
        {
          heading: "أين تذهب بياناتك",
          body: "لا يملك هذا الموقع قاعدة بيانات، ولا تُخزَّن رسالتك فيه. عند الإرسال تُحوَّل الرسالة مباشرة إلى بريد إلكتروني يصل إلى صندوقنا على info@awjhub.com، ويُنقل عبر خدمة ZeptoMail التابعة لشركة Zoho. وإن لم يكن الإرسال المباشر متاحًا لأي سبب، يفتح الموقع برنامج البريد على جهازك بالرسالة جاهزة — فتبقى الرسالة عندك ولا تمرّ بنا حتى ترسلها بنفسك.",
        },
        {
          heading: "مزوّدو الخدمة",
          body: "نستعين بمزوّدين اثنين فقط، وكلٌّ منهما يعالج البيانات نيابة عنا:",
          list: [
            "Cloudflare — استضافة الموقع وتقديمه. وبصفتها مشغّل البنية التحتية، تعالج بيانات تقنية لكل طلب مثل عنوان IP ونوع المتصفّح، لأغراض التشغيل والحماية من الهجمات.",
            "Zoho (ZeptoMail وZoho Mail) — إرسال رسالة النموذج واستقبالها في صندوق بريدنا.",
          ],
        },
        {
          heading: "مدة الاحتفاظ",
          body: "تبقى رسالتك في صندوق بريدنا ما دامت هناك حاجة للتعامل مع طلبك أو الالتزام بمتطلبات نظامية أو محاسبية. ويمكنك أن تطلب حذفها في أي وقت.",
        },
        {
          heading: "الروابط والخدمات الخارجية",
          body: "يحتوي الموقع على روابط إلى واتساب وLinktree. وعند الضغط عليها تنتقل إلى منصات خارجية لا نتحكم فيها، وتخضع لسياسات الخصوصية الخاصة بها. ولا يُرسَل أي شيء إلى هذه المنصات إلا عندما تضغط الرابط بنفسك.",
        },
        {
          heading: "حقوقك",
          body: "بموجب نظام حماية البيانات الشخصية في المملكة العربية السعودية، لك الحق في:",
          list: [
            "معرفة البيانات التي لدينا عنك والاطّلاع عليها",
            "طلب تصحيحها أو تحديثها",
            "طلب حذفها",
            "سحب موافقتك في أي وقت",
            "الاعتراض على معالجتها أو تقييدها",
            "الحصول على نسخة منها بصيغة مقروءة",
          ],
        },
        {
          heading: "كيف تمارس حقوقك",
          body: "أرسل طلبك إلى info@awjhub.com موضّحًا ما تريده، ونتعامل معه خلال مدة معقولة. وإذا رأيت أن طلبك لم يُعالَج كما ينبغي، فلك حق التقدّم بشكوى إلى الجهة المختصة بحماية البيانات الشخصية في المملكة.",
        },
        {
          heading: "أمن البيانات",
          body: "يُقدَّم الموقع بالكامل عبر اتصال مشفّر (HTTPS)، ومفاتيح خدمة البريد محفوظة كأسرار مشفّرة لدى مزوّد الاستضافة ولا تظهر في شفرة الموقع. ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت آمنة بصورة مطلقة، فنرجو عدم إرسال معلومات بالغة الحساسية عبر النموذج.",
        },
        {
          heading: "خصوصية الأطفال",
          body: "هذا الموقع موجَّه إلى الجهات والأفراد الباحثين عن حلول أعمال، ولا نقصد جمع بيانات من دون سنّ الثامنة عشرة. وإن وصلتنا بيانات كهذه، نحذفها عند علمنا بها.",
        },
        {
          heading: "التعديلات على هذه السياسة",
          body: "قد نحدّث هذه السياسة كلما تغيّر ما يفعله الموقع فعليًا. وتاريخ آخر تحديث مذكور أعلى الصفحة، ونسري التعديل من تاريخ نشره.",
        },
        {
          heading: "التواصل",
          body: "لأي سؤال عن هذه السياسة أو عن بياناتك، راسلنا على info@awjhub.com.",
        },
      ],
    },
    terms: {
      title: "الشروط والأحكام",
      metaDescription:
        "شروط استخدام موقع أوج لحلول الأعمال: طبيعة الموقع، الملكية الفكرية، حدود المسؤولية، والنظام الواجب التطبيق.",
      intro:
        "تنظّم هذه الشروط استخدامك لموقع أوج لحلول الأعمال (awjhub.com). وباستخدامك الموقع فإنك توافق عليها. وإن لم توافق، نرجو عدم استخدامه.",
      sections: [
        {
          heading: "طبيعة الموقع",
          body: "هذا موقع تعريفي بشركة أوج لحلول الأعمال وخدماتها ومشاريعها. المعلومات المنشورة فيه لأغراض التعريف العام، ولا تُعدّ عرضًا ملزمًا ولا استشارة مهنية.",
        },
        {
          heading: "الملكية الفكرية",
          body: "جميع محتويات الموقع — من نصوص وتصاميم وشعارات وهوية بصرية وشفرة برمجية — مملوكة لشركة أوج لحلول الأعمال أو مرخّصة لها. ولا يجوز نسخها أو إعادة نشرها أو استخدامها تجاريًا دون إذن كتابي مسبق. وتبقى شعارات المشاريع والعلامات التجارية المذكورة ملكًا لأصحابها.",
        },
        {
          heading: "الاستخدام المقبول",
          body: "توافق على عدم القيام بما يلي:",
          list: [
            "استخدام الموقع لأي غرض غير نظامي أو مخالف لأنظمة المملكة العربية السعودية",
            "محاولة الوصول غير المصرّح به إلى الموقع أو أي نظام مرتبط به",
            "تعطيل الموقع أو إثقاله بطلبات آلية أو محاولة تجاوز إجراءاته الأمنية",
            "إرسال محتوى مضلّل أو ضار أو منتحل الصفة عبر نموذج التواصل",
            "استخراج محتوى الموقع آليًا لإعادة نشره أو استخدامه تجاريًا",
          ],
        },
        {
          heading: "نموذج التواصل لا يُنشئ تعاقدًا",
          body: "إرسال النموذج أو التواصل معنا عبر واتساب أو البريد هو استفسار مبدئي فحسب، ولا ينشئ أي التزام تعاقدي على أي من الطرفين. ولا ينشأ التعاقد إلا بعقد مكتوب موقّع من الطرفين يحدّد نطاق العمل والمدة والمقابل المالي.",
        },
        {
          heading: "ما يُذكر عن الخدمات",
          body: "ما يرد في الموقع عن الخدمات ومدد التنفيذ وطريقة العمل هو وصف عام لمنهجيتنا. أما تفاصيل أي مشروع — بما فيها مدة التسليم ونطاقه والمقابل — فتُحدَّد في العقد الخاص به، وهو المرجع عند أي اختلاف مع ما نُشر هنا. وتظل ملكية الشفرة البرمجية والبيانات للعميل وفق ما ينصّ عليه عقده.",
        },
        {
          heading: "الروابط الخارجية",
          body: "قد يحيلك الموقع إلى منصات خارجية مثل واتساب وLinktree. ولا نتحكم في محتواها ولا نتحمّل مسؤولية ما يرد فيها، ويخضع استخدامك لها لشروط تلك المنصات.",
        },
        {
          heading: "توافر الموقع",
          body: "نسعى لإبقاء الموقع متاحًا وصحيح المعلومات، لكننا لا نضمن استمرارية عمله دون انقطاع ولا خلوّه من الأخطاء. وقد نعدّل محتواه أو نوقفه كليًا أو جزئيًا في أي وقت ودون إشعار مسبق.",
        },
        {
          heading: "حدود المسؤولية",
          body: "يُقدَّم الموقع «كما هو». وفي حدود ما يسمح به النظام، لا نتحمّل المسؤولية عن أي ضرر مباشر أو غير مباشر أو تبعي ينشأ عن استخدام الموقع أو تعذّر استخدامه أو عن الاعتماد على معلوماته دون الرجوع إلينا.",
        },
        {
          heading: "الخصوصية",
          body: "تُعدّ سياسة الخصوصية جزءًا لا يتجزأ من هذه الشروط، وتوضّح كيفية تعاملنا مع بياناتك.",
        },
        {
          heading: "تعديل الشروط",
          body: "قد نحدّث هذه الشروط من وقت لآخر، ويسري التعديل من تاريخ نشره على هذه الصفحة. واستمرارك في استخدام الموقع بعد التحديث يُعدّ قبولًا به.",
        },
        {
          heading: "النظام الواجب التطبيق",
          body: "تخضع هذه الشروط لأنظمة المملكة العربية السعودية وتُفسَّر وفقها، وتختص الجهات القضائية في المملكة بالنظر في أي نزاع ينشأ عنها.",
        },
        {
          heading: "التواصل",
          body: "لأي استفسار عن هذه الشروط، راسلنا على info@awjhub.com.",
        },
      ],
    },
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
  stats: {
    aria: "The numbers behind how we work",
    items: [
      {
        display: `${delivery.min}–${delivery.max}`,
        label: "weeks from scope sign-off to launch, written into the contract",
      },
      { count: 1, label: "business day to come back to your request" },
      { count: 4, label: "stages from the first session to a working system" },
      {
        count: 100,
        suffix: "%",
        label: "of the code and the data owned by the client at handover",
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
    tablistAria: "Choose a project",
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
        tags: ["Web platform", "iOS and Android app", "Hajj sector"],
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
  whatsapp: {
    aria: "Chat with us on WhatsApp",
    tooltip: "Message us on WhatsApp",
    prefill: "Hello, I found you through the AWJ HUB website.",
  },
  legal: {
    updatedLabel: "Last updated",
    updated: "9 September 2026",
    backHome: "Back to the home page",
    navAria: "Legal links",
    privacy: {
      title: "Privacy Policy",
      metaDescription:
        "How the AWJ HUB website handles your data: no cookies, no analytics, and the only data collected is what you type into the contact form.",
      intro:
        "This policy explains what the AWJ HUB website (awjhub.com) collects and what it does not, where your data goes, and what rights you have over it. It describes the site as it is actually built today, not a generic template.",
      sections: [
        {
          heading: "What we do not collect",
          body: "This comes first because it matters most: this site does not track you.",
          list: [
            "We set no cookies on your device — not even “essential” ones.",
            "We use no Google Analytics and no other analytics, measurement or advertising tool.",
            "We use no browser storage and no device fingerprinting.",
            "The site's typeface is served from our own servers, so opening a page sends no request to Google or anyone else.",
            "We do not sell your data, share it for marketing, or use it in any advertising.",
          ],
        },
        {
          heading: "What we collect",
          body: "The only data we collect from you is what you type into the contact form and choose to send:",
          list: [
            "Name — required",
            "Email address — required",
            "Organisation or company — optional",
            "Mobile number — optional",
            "Service needed — optional",
            "Details of what you need — optional",
            "The language of the page you wrote from, so we reply in it",
          ],
        },
        {
          heading: "Why we collect it",
          body: "We use this data for one purpose: to answer your enquiry and discuss your project. The lawful basis is your explicit consent when you submit the form, and taking steps at your request before entering a contract. We do not use it for anything else without your permission.",
        },
        {
          heading: "Where your data goes",
          body: "This website has no database, and your message is not stored on it. On submission the message is turned straight into an email that arrives in our inbox at info@awjhub.com, delivered through ZeptoMail, a Zoho service. If direct sending is unavailable for any reason, the site opens the mail app on your own device with the message prepared — so it stays with you and never passes through us until you send it yourself.",
        },
        {
          heading: "Service providers",
          body: "We rely on two providers only, each processing data on our behalf:",
          list: [
            "Cloudflare — hosts and serves the website. As the infrastructure operator it processes technical data for each request, such as IP address and browser type, for operation and protection against attacks.",
            "Zoho (ZeptoMail and Zoho Mail) — delivers the form message and receives it in our inbox.",
          ],
        },
        {
          heading: "How long we keep it",
          body: "Your message stays in our inbox for as long as it is needed to deal with your enquiry or to meet a legal or accounting requirement. You can ask us to delete it at any time.",
        },
        {
          heading: "External links and services",
          body: "The site links to WhatsApp and Linktree. Following those links takes you to external platforms we do not control, each governed by its own privacy policy. Nothing is sent to them unless you click the link yourself.",
        },
        {
          heading: "Your rights",
          body: "Under the Personal Data Protection Law of the Kingdom of Saudi Arabia, you have the right to:",
          list: [
            "Know what data we hold about you and access it",
            "Ask for it to be corrected or updated",
            "Ask for it to be deleted",
            "Withdraw your consent at any time",
            "Object to or restrict its processing",
            "Receive a copy of it in a readable format",
          ],
        },
        {
          heading: "How to exercise your rights",
          body: "Send your request to info@awjhub.com setting out what you want, and we will deal with it within a reasonable period. If you believe your request was not handled properly, you may complain to the competent personal data protection authority in the Kingdom.",
        },
        {
          heading: "Data security",
          body: "The entire site is served over an encrypted connection (HTTPS), and the mail service keys are held as encrypted secrets with the hosting provider and never appear in the site's code. Even so, no method of transmission over the internet is completely secure, so please do not send highly sensitive information through the form.",
        },
        {
          heading: "Children's privacy",
          body: "This site is aimed at organisations and individuals looking for business solutions, and we do not intend to collect data from anyone under eighteen. If such data reaches us, we delete it once we become aware of it.",
        },
        {
          heading: "Changes to this policy",
          body: "We may update this policy whenever what the site actually does changes. The date it was last updated is shown at the top of this page, and any change applies from the date it is published.",
        },
        {
          heading: "Contact",
          body: "For any question about this policy or about your data, write to info@awjhub.com.",
        },
      ],
    },
    terms: {
      title: "Terms and Conditions",
      metaDescription:
        "Terms of use for the AWJ HUB website: the nature of the site, intellectual property, limits of liability, and governing law.",
      intro:
        "These terms govern your use of the AWJ HUB website (awjhub.com). By using the site you agree to them. If you do not agree, please do not use it.",
      sections: [
        {
          heading: "The nature of this site",
          body: "This is an informational site about AWJ for Business Solutions, its services and its projects. What is published here is for general information; it is neither a binding offer nor professional advice.",
        },
        {
          heading: "Intellectual property",
          body: "All content on this site — text, design, logos, visual identity and code — is owned by or licensed to AWJ for Business Solutions. It may not be copied, republished or used commercially without prior written permission. Project logos and any trademarks mentioned remain the property of their respective owners.",
        },
        {
          heading: "Acceptable use",
          body: "You agree not to:",
          list: [
            "Use the site for any unlawful purpose or in breach of the laws of the Kingdom of Saudi Arabia",
            "Attempt unauthorised access to the site or any system connected to it",
            "Disrupt the site, overload it with automated requests, or try to circumvent its security measures",
            "Send misleading, harmful or impersonating content through the contact form",
            "Scrape the site's content for republication or commercial use",
          ],
        },
        {
          heading: "The contact form creates no contract",
          body: "Submitting the form, or contacting us by WhatsApp or email, is an initial enquiry only and creates no contractual obligation on either party. A contract arises only through a written agreement signed by both parties setting out the scope of work, the timeline and the fee.",
        },
        {
          heading: "What is said about our services",
          body: "What the site says about services, delivery windows and how we work is a general description of our approach. The particulars of any project — including its delivery window, scope and fee — are set out in its own contract, which prevails over anything published here in the event of a difference. Ownership of the code and the data remains with the client as that contract provides.",
        },
        {
          heading: "External links",
          body: "The site may direct you to external platforms such as WhatsApp and Linktree. We do not control their content and accept no responsibility for it; your use of them is governed by those platforms' own terms.",
        },
        {
          heading: "Availability",
          body: "We aim to keep the site available and its information accurate, but we do not warrant uninterrupted operation or freedom from error. We may change, suspend or withdraw any part of it at any time without prior notice.",
        },
        {
          heading: "Limits of liability",
          body: "The site is provided “as is”. To the extent permitted by law, we accept no liability for any direct, indirect or consequential loss arising from use of the site, from being unable to use it, or from relying on its information without checking with us.",
        },
        {
          heading: "Privacy",
          body: "Our Privacy Policy forms an integral part of these terms and explains how we handle your data.",
        },
        {
          heading: "Changes to these terms",
          body: "We may update these terms from time to time, and a change applies from the date it is published on this page. Continuing to use the site after an update means you accept it.",
        },
        {
          heading: "Governing law",
          body: "These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, and the courts of the Kingdom have jurisdiction over any dispute arising from them.",
        },
        {
          heading: "Contact",
          body: "For any question about these terms, write to info@awjhub.com.",
        },
      ],
    },
  },
};

export function getContent(locale: Locale): Content {
  return locale === "en" ? en : ar;
}
