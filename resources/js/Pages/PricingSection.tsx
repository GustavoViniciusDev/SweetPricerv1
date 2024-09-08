import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import React from "react";
import { JSX, SVGProps } from "react";

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

const PricingSection = () => {
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);

    const plans = [
        { title: "Básico", description: "Perfeito para Pequenos Negócios", price: "R$ 29,90", features: ["Precificação", "Histórico"], available: true },
        { title: "Pró", description: "Perfeito para você e poucos funcionários", price: "R$ 39,90", features: ["Precificação", "Histórico", "Cadastro de Receitas (Máximo de 10 receitas)"], available: false },
        { title: "Master", description: "O Plano mais Completo", price: "R$ 89,90", features: ["Precificação", "Histórico", "Cadastro de Receitas", "Controle de Estoque", "Relatório de Vendas"], available: false },
    ];

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-16 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {plans.map((plan, index) => (
                <Card
                    key={index}
                    className={`relative transition-transform duration-300 ease-in-out transform hover:scale-105 ${clickedIndex === index ? 'scale-105 shadow-xl' : 'shadow-md'} ${clickedIndex === null ? '' : 'filter blur-sm'}`}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onMouseLeave={() => setFocusedIndex(null)}
                    onClick={() => setClickedIndex(index)}
                >
                    {clickedIndex === index && (
                        <div
                            className="absolute inset-0 bg-black/40 z-10 rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                    {!plan.available && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                            Indisponível
                        </div>
                    )}
                    <CardHeader className="text-center py-4">
                        <CardTitle className="text-lg font-semibold text-custom-800 dark:text-dark-custom-100">
                            {plan.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-custom-500 dark:text-dark-custom-400">
                            {plan.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6 text-center">
                            <div className="text-4xl font-extrabold text-custom-900 dark:text-dark-custom-100">
                                {plan.price}
                            </div>
                            <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center justify-center gap-2 text-custom-600 dark:text-dark-custom-300">
                                        <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                                        <span className="text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PricingSection;
