"use client"
import { useEffect } from "react"
import Link from "next/link"

export default function LandingPage() {
    useEffect(() => {
        const heroTitle = document.getElementById('hero-title');
        
        const handleScroll = () => {
            const scrollValue = window.scrollY;
            const opacity = Math.max(0, 1 - scrollValue / 400);
            const translateY = scrollValue * 0.4;
            
            if (heroTitle) {
                heroTitle.style.transform = `translateY(-${translateY}px)`;
                heroTitle.style.opacity = opacity.toString();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="custom-scrollbar overflow-x-hidden min-h-screen bg-background">
            <nav className="fixed top-0 w-full z-50 p-4 flex justify-between items-center transition-all">
                <div className="font-headline-sm text-primary text-xl font-bold">Constitutio</div>
                <Link href="/chat" className="px-6 py-2 bg-primary text-on-primary rounded-full font-body-sm font-medium hover:bg-primary/90 transition-colors">
                    Try Constitutio
                </Link>
            </nav>
            
{/*  TopNavBar  */}


{/*  Section 1: Hero  */}
<section className="relative min-h-screen flex flex-col items-center justify-center px-margin-md hero-gradient overflow-hidden">
    <div className="z-10 text-center w-full max-w-6xl space-y-8">
        <h1 id="hero-title" className="font-headline-lg text-headline-lg md:text-[120px] lg:text-[160px] text-primary tracking-tighter leading-none animate-drop-in opacity-0 hero-title-scroll">
            Constitutio
        </h1>
        <div className="space-y-12">
            <p className="font-label-caps text-label-caps tracking-[0.3em] text-on-secondary-container uppercase">
                Precision in Constitutional Law
            </p>
            <div className="pt-12">
                <span className="material-symbols-outlined text-primary text-4xl animate-bounce" data-original-icon="keyboard_double_">
                    keyboard_double_arrow_down
                </span>
            </div>
        </div>
    </div>
</section>

{/*  Section 2: Mission & Accuracy  */}
<section className="py-margin-lg bg-surface-container-lowest px-margin-md">
    <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-margin-lg items-center">
        <div className="space-y-8">
            <div className="inline-block px-3 py-1 bg-surface-variant/30 border border-outline-variant/30 rounded-full font-label-caps text-label-caps text-on-secondary-container">
                INSTITUTIONAL GRADE
            </div>
            <h2 className="font-headline-md text-headline-md text-primary leading-tight">
                Institutional Accuracy grounded in the Supreme Law.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Constitutio bridges the gap between complex legal inquiry and the authoritative text of the Constitution of India. Our system ensures that every insight is not just a response, but a verified citation from the original source of truth.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                <div className="glass p-6 rounded-xl space-y-3">
                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                    <h4 className="font-headline-sm text-headline-sm text-primary">Verified Sources</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Every claim is mapped to specific Articles, Clauses, and Amendments.</p>
                </div>
                <div className="glass p-6 rounded-xl space-y-3">
                    <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
                    <h4 className="font-headline-sm text-headline-sm text-primary">Legal Literacy</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Empowering citizens and professionals with precise constitutional clarity.</p>
                </div>
            </div>
        </div>
        <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent blur-2xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative rounded-xl overflow-hidden glass border border-white/10 aspect-[4/5] md:aspect-square flex items-center justify-center p-gutter">
                <img className="w-full h-full object-cover rounded-lg opacity-80" alt="Preamble interface" src="/landing-image.jpg" />
            </div>
        </div>
    </div>
</section>

{/*  Section 3: The RAG Process  */}
<section className="py-margin-lg bg-background px-margin-md">
    <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary">Our Retrieval Process</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                A sophisticated technical pipeline designed to eliminate hallucinations and prioritize legal rigor.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/*  Retrieval Card  */}
            <div className="group relative p-8 rounded-xl bg-surface-container border border-outline-variant/20 hover:border-primary/40 transition-all duration-500 overflow-hidden"><div className="absolute top-0 right-0 p-4 font-label-caps text-[40px] opacity-10 text-primary">01</div><div className="relative z-10 space-y-6"><div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary">database</span></div><h3 className="font-headline-sm text-headline-sm text-primary">Hybrid Retrieval</h3><p className="font-body-md text-body-md text-on-surface-variant">Combining Dense Vector Search for semantic depth and Sparse Vector Search for keyword precision across the Indian Constitution.</p><div className="pt-4 border-t border-outline-variant/30"><span className="font-label-caps text-label-caps text-secondary-fixed">Semantic &amp; Keyword Precision</span></div></div></div>
            {/*  Contextualization Card  */}
            <div className="group relative p-8 rounded-xl bg-surface-container border border-outline-variant/20 hover:border-primary/40 transition-all duration-500 overflow-hidden"><div className="absolute top-0 right-0 p-4 font-label-caps text-[40px] opacity-10 text-primary">02</div><div className="relative z-10 space-y-6"><div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary">account_tree</span></div><h3 className="font-headline-sm text-headline-sm text-primary">Processing</h3><p className="font-body-md text-body-md text-on-surface-variant">Normalization and Reranking algorithms prioritize the most relevant legal nodes, ensuring judicial interpretations are accurately weighted.</p><div className="pt-4 border-t border-outline-variant/30"><span className="font-label-caps text-label-caps text-secondary-fixed">Reranking Legal Nodes</span></div></div></div>
            {/*  Generation Card  */}
            <div className="group relative p-8 rounded-xl bg-surface-container border border-outline-variant/20 hover:border-primary/40 transition-all duration-500 overflow-hidden"><div className="absolute top-0 right-0 p-4 font-label-caps text-[40px] opacity-10 text-primary">03</div><div className="relative z-10 space-y-6"><div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary">auto_awesome</span></div><h3 className="font-headline-sm text-headline-sm text-primary">Generation</h3><p className="font-body-md text-body-md text-on-surface-variant">Synthesizing the final response grounded in the reranked context, providing conversational clarity backed by literal constitutional citations.</p><div className="pt-4 border-t border-outline-variant/30"><span className="font-label-caps text-label-caps text-secondary-fixed">Grounded Synthesis</span></div></div></div>
        </div>
    </div>
</section>

{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-outline-variant/20 w-full py-margin-md">
    <div className="max-w-container-max mx-auto px-margin-md">
        <div className="mb-8 flex flex-col items-center">
            <div className="font-headline-lg text-[32px] text-primary tracking-[0.5em] uppercase mb-4">CONSTITUTIO</div>
            <div className="h-px w-24 bg-outline-variant/30"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-gutter">
            <div className="space-y-2">
                <div className="font-label-caps text-label-caps text-primary tracking-widest">CONSTITUTIO</div>
                <p className="font-body-sm text-body-sm text-on-tertiary-container">© 2024 Constitutio. Institutional Precision in Legal RAG.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 font-body-sm text-body-sm">
                <a className="text-on-tertiary-container hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="text-on-tertiary-container hover:text-primary transition-colors" href="#">Terms of Service</a>
                <a className="text-on-tertiary-container hover:text-primary transition-colors" href="#">API Documentation</a>
                <a className="text-on-tertiary-container hover:text-primary transition-colors" href="#">Contact Counsel</a>
            </div>
        </div>
    </div>
</footer>


        </main>
    )
}
