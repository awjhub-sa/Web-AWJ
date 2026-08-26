"use client";

import { useEffect } from "react";

/**
 * شريط أدوات إمكانية الوصول (ranbuch/accessibility، رخصة MIT).
 *
 * المكتبة تلمس `document` و`window` وقت الإنشاء، فتُحمَّل ديناميكيًا داخل
 * useEffect بعد الإماهة — لا شيء منها يدخل حزمة الخادم. المظهر مثبّت في
 * globals.css عبر متغيّرات `--_access-*`، والنصوص كلّها عربية هنا.
 */

const labels = {
  resetTitle: "إعادة الضبط",
  closeTitle: "إغلاق",
  menuTitle: "خيارات إمكانية الوصول",
  increaseText: "تكبير حجم النص",
  decreaseText: "تصغير حجم النص",
  increaseTextSpacing: "زيادة تباعد الحروف",
  decreaseTextSpacing: "تقليل تباعد الحروف",
  increaseLineHeight: "زيادة تباعد الأسطر",
  decreaseLineHeight: "تقليل تباعد الأسطر",
  invertColors: "عكس الألوان",
  grayHues: "تدرّجات رمادية",
  underlineLinks: "تسطير الروابط",
  bigCursor: "مؤشّر كبير",
  readingGuide: "مسطرة القراءة",
  textToSpeech: "قراءة النص صوتيًا",
  speechToText: "الإملاء الصوتي",
  disableAnimations: "إيقاف الحركات",
  hotkeyPrefix: "اختصار: ",
};

/** Ctrl+Alt+<حرف> — نفس افتراضيات المكتبة، مكتوبة صراحةً لتبقى موثّقة. */
const hotkeys = {
  enabled: true,
  helpTitles: true,
  keys: {
    toggleMenu: ["ctrlKey", "altKey", 65], // A
    invertColors: ["ctrlKey", "altKey", 73], // I
    grayHues: ["ctrlKey", "altKey", 71], // G
    underlineLinks: ["ctrlKey", "altKey", 85], // U
    bigCursor: ["ctrlKey", "altKey", 67], // C
    readingGuide: ["ctrlKey", "altKey", 82], // R
    textToSpeech: ["ctrlKey", "altKey", 84], // T
    speechToText: ["ctrlKey", "altKey", 83], // S
    disableAnimations: ["ctrlKey", "altKey", 81], // Q
  },
};

export default function AccessibilityWidget() {
  useEffect(() => {
    let cancelled = false;
    let instance: { destroy?: () => void } | null = null;

    import("accessibility")
      .then(({ Accessibility }) => {
        // StrictMode يشغّل التأثير مرّتين في التطوير — لا تبنِ أداة ثانية.
        if (cancelled) return;
        instance = new Accessibility({
          labels,
          hotkeys,
          textToSpeechLang: "ar-SA",
          speechToTextLang: "ar-SA",
          // مسطرة القراءة بلون العلامة بدل الأخضر الفاقع الافتراضي.
          guide: { cBorder: "#14C48A", cBackground: "#101010", height: "14px" },
          // كل مقاسات النص في الموقع بالبكسل، فتكبير جذر الصفحة لا يؤثّر فيها.
          textPixelMode: true,
          textSizeFactor: 2,
          // تبقى اختيارات الزائر بعد إعادة تحميل الصفحة.
          session: { persistent: true },
        });
      })
      .catch(() => {
        // فشل تحميل الحزمة لا يجوز أن يكسر الصفحة — الموقع يعمل بدونها.
      });

    return () => {
      cancelled = true;
      instance?.destroy?.();
    };
  }, []);

  return null;
}
