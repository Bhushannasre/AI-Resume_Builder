import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import Banner from "../components/Home/Banner";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonial";
import CallToAction from "../components/Home/CallToAction";
import Footer from "../components/Home/Footer";
import AnimatedSection from "./AnimatedSection";

function Home() {
    return (
        // Page fade-in on mount
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Banner slides down from top */}
            <AnimatedSection direction="down" delay={0}>
                <Banner />
            </AnimatedSection>

            {/* Hero fades up — the star of the page, no delay */}
            <AnimatedSection direction="up" delay={0.3}>
                <Hero />
            </AnimatedSection>

            {/* Features slides up slightly later */}
            <AnimatedSection direction="up" delay={0.2}>
                <Features />
            </AnimatedSection>

            {/* Testimonials fades in from left */}
            <AnimatedSection direction="left" delay={0.2}>
                <Testimonials />
            </AnimatedSection>

            {/* CTA pulses in from below */}
            <AnimatedSection direction="up" delay={0.2}>
                <CallToAction />
            </AnimatedSection>

            {/* Footer fades in subtly */}
            <AnimatedSection direction="up" delay={0.2}>
                <Footer />
            </AnimatedSection>
        </motion.div>
    );
}

export default Home;