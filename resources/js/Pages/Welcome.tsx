import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { JSX, SVGProps, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ClientSlider from './SliderClients';
import { ThemeToggle } from '@/Components/ThemeToggle';

export default function Welcome({ auth }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const text = "Valorizando cada doce com precisão".split(" ");
    const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const inViews = sectionRefs.map(ref => useInView(ref, { once: true }));

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="SweetPricer" />
            <div className="flex flex-col min-h-[100dvh] bg-custom-50 dark:bg-dark-custom-50">
                <header className={`fixed top-0 left-0 w-full px-4 lg:px-6 h-14 flex items-center bg-custom-50 ${scrolled ? 'shadow-md' : ''} z-50 transition-shadow duration-300`}>
                    <Link href="/" className="flex items-center justify-center">
                        <h2 className='text-2xl text-custom-700 dark:text-dark-custom-200'>SweetPricer</h2>
                    </Link>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-transparent hover:bg-custom-400 dark:hover:bg-dark-custom-400 text-custom-700 dark:text-dark-custom-200 font-semibold hover:text-white py-2 px-4 border border-custom-400 dark:border-dark-custom-400 hover:border-transparent rounded"
                            >
                                Precificações
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="bg-transparent text-custom-700 dark:text-dark-custom-200 font-semibold py-2 px-4 border border-custom-400 dark:border-dark-custom-400 hover:border-custom-700 dark:hover:border-dark-custom-700 rounded"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-custom-400 dark:bg-dark-custom-400 hover:bg-custom-500 dark:hover:bg-dark-custom-500 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded"
                                >
                                    Criar Conta
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex-1">
                    {["Valorizando cada doce com precisão", "Nossos Clientes", "Nossas Ferramentas", "Planos"].map((title, index) => (
                        <motion.section
                            key={index}
                            ref={sectionRefs[index]}
                            className="w-full pt-12 md:pt-24 lg:pt-32"
                            initial={{ opacity: 0, y: 50 }}
                            animate={inViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="container space-y-10 xl:space-y-16">
                                {index === 0 && (
                                    <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16 items-center justify-center">
                                        <h1 className="lg:leading-tighter text-custom-700 dark:text-dark-custom-200 text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                            {text.map((el, i) => (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: i / 5,
                                                    }}
                                                    key={i}
                                                >
                                                    {el}{" "}
                                                </motion.span>
                                            ))}
                                        </h1>
                                        <motion.div
                                            className="flex flex-col items-center space-y-4"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <img
                                                src="/images/cake-shop-amico.svg"
                                                width="550"
                                                height="300"
                                                alt="cake-shop"
                                                className="mx-auto object-cover"
                                            />
                                        </motion.div>
                                    </div>
                                )}
                                {index === 1 && (
                                    <div className="container px-4 md:px-6">
                                        <ClientSlider />
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="container px-4 md:px-6">
                                        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                                            <div className="space-y-2">
                                                <div className="inline-block rounded-lg bg-custom-100 dark:bg-dark-custom-100 px-3 py-1 text-sm text-custom-700 dark:text-dark-custom-200">Nossas Ferramentas</div>
                                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-custom-700 dark:text-dark-custom-200">{title}</h2>
                                                <p className="max-w-[600px] text-custom-600 dark:text-dark-custom-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                                    Feito pensando nas suas necessidades e da sua equipe.
                                                </p>
                                            </div>
                                            <FeatureList />
                                        </div>
                                    </div>
                                )}
                                {index === 3 && (
                                    <div className="container px-4 md:px-6">
                                        <PricingSection />
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    ))}
                </main>
                <Footer />
            </div>
        </>
    );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

function FeatureList() {
    const features = [
        { title: "Precificação", description: "Define o preço de venda considerando custos dos ingredientes e margens de lucros." },
        { title: "Histórico", description: "Armazena todas as suas precificações feitas anteriormente, podendo editar ou excluir." },
    ];

    return (
        <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-2">
                {features.map((feature, index) => (
                    <li key={index}>
                        <div className="flex items-center gap-2">
                            <CheckIcon className="h-4 w-4 text-custom-600 dark:text-dark-custom-300" />
                            <h3 className="text-lg font-semibold text-custom-700 dark:text-dark-custom-200">{feature.title}</h3>
                        </div>
                        <p className="text-custom-600 dark:text-dark-custom-300">{feature.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PricingSection() {
    const plans = [
        { title: "Básico", description: "Perfeito para Pequenos Negócios", price: "R$ 29,90", features: ["Precificação", "Histórico"], available: true },
        { title: "Pró", description: "Perfeito para você e poucos funcionários", price: "R$ 39,90", features: ["Precificação", "Histórico", "Cadastro de Receitas (Máximo de 10 receitas)"], available: false },
        { title: "Master", description: "O Plano mais Completo", price: "R$ 89,90", features: ["Precificação", "Histórico", "Cadastro de Receitas", "Controle de Estoque", "Relatório de Vendas"], available: false },
    ];

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {plans.map((plan, index) => (
                <Card className={`flex flex-col ${!plan.available ? 'relative' : ''}`} key={index}>
                    {!plan.available && (
                        <div className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            Indisponível no Momento
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-custom-700 dark:text-dark-custom-200">{plan.title}</CardTitle>
                        <CardDescription className="text-custom-600 dark:text-dark-custom-300">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-4xl font-bold text-custom-700 dark:text-dark-custom-200">
                                {plan.price}
                            </div>
                            <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-custom-600 dark:text-dark-custom-300">
                                        <CheckIcon className="h-4 w-4" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-custom-100 dark:bg-dark-custom-100 py-4 text-center text-custom-600 dark:text-dark-custom-300">
            <p>&copy; 2024 SweetPricer. Todos os direitos reservados.</p>
        </footer>
    );
}
