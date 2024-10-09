import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import WhatsappIcon from '@/Components/whatsappIcon/PopUpWhatsapp';
import HelpMeIcon from '@/Components/HelpMe/PopUpHelpMe';

interface Subscription {
    stripe_status: string;
    stripe_price: string;
    type: string;
    created_at: string;
}

interface Props extends PageProps {
    subscription?: Subscription;
}

const plans = [
    {
        id: 1,
        name: "Plano Básico",
        price: "R$ 29,90",
        description: "Cálculo de precificação e histórico de precificações.",
        price_id: import.meta.env.VITE_PLAN_BASIC_ID,
        available: true,
    },
    {
        id: 2,
        name: "Plano Intermediário",
        price: "R$ 39,90",
        description: "Inclui tudo do Plano Básico mais relatórios detalhados.",
        price_id: "-",
        available: false,
    },
    {
        id: 3,
        name: "Plano Avançado",
        price: "R$ 89,90",
        description: "Recursos avançados para gestão completa de preços e relatórios personalizados.",
        price_id: "-",
        available: false,
    },
];

export default function PlanSelection({ auth, subscription }: Props) {

    const [loading, setLoading] = useState(false);

    const handleCheckout = async (priceId: string, planName: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`/checkout`, {
                params: {
                    price_id: priceId ?? '',
                    plan_name: planName ?? 'Plano Desconhecido',
                }
            });
            const { checkout_url } = response.data;
            window.location.href = checkout_url;
        } catch (error) {
            console.error("Erro ao redirecionar para o checkout:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-custom-600 dark:text-dark-custom-300 leading-tight">Escolha seu Plano</h2>}
            >
                <Head title="Escolha de Planos" />
                <div className="mx-auto max-w-5xl py-16">
                    {!subscription && (
                        <div className="flex flex-col items-center justify-center mb-8">
                            <h3 className="text-lg font-semibold text-custom-700 dark:text-dark-custom-200">
                                Olá! Parece que você ainda não tem um plano.
                            </h3>
                            <p className="mt-2 text-center text-custom-500 dark:text-dark-custom-400">
                                Para acessar todos os recursos do sistema, escolha um plano que melhor se adapta a você!
                            </p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3">
                        {plans.map((plan) => (
                            <Card
                                key={plan.id}
                                className={`relative transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md`}
                            >
                                {subscription && subscription.stripe_price === plan.price_id ? (
                                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-1 py-1 rounded-md shadow">
                                        Plano Ativo
                                    </div>
                                ) : (
                                    !plan.available && (
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-1 py-1 rounded-md shadow">
                                            Indisponível
                                        </div>
                                    )
                                )}
                                <CardHeader className="text-center py-4">
                                    <CardTitle className="text-lg font-semibold text-custom-800 dark:text-dark-custom-100">
                                        {plan.name}
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
                                        {(!subscription || subscription.stripe_price !== plan.price_id) && plan.available && (
                                            <button
                                                onClick={() => {
                                                    if (plan.price_id && plan.name) {
                                                        handleCheckout(plan.price_id, plan.name);
                                                    } else {
                                                        console.error("Price ID ou Plan Name não estão definidos.");
                                                    }
                                                }}
                                                disabled={loading}
                                                className={`mt-4 inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2 rounded-xl transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {loading ? 'Redirecionando...' : 'Contratar Plano'}
                                            </button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <WhatsappIcon />
                <HelpMeIcon />
            </AuthenticatedLayout>
        </>
    );
}
