import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Locale } from "@/lib/content";

/** The page itself. Both languages render the same sections in the same order. */
export default function Site({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
        <Projects locale={locale} />
        <WhyUs locale={locale} />
        <Process locale={locale} />
        <Faq locale={locale} />
        <CtaBand locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  );
}
