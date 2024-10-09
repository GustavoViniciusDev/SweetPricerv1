import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Pricing {
    id: number;
    name_pricing: string;
    user_id: string;
    id_pricing_details?: number;
}

interface PricingDetail {
    id: number;
    pricing_id: number;
    user_id: number;
    ingredients: string[];
    total_ingredients_cost: number | string;
    additional_costs: number | string;
    profit_and_labor_cost: number | string;
    units_yield: number | string;
    price_per_unit: number | string;
    packaging_cost: number | string;
    final_price_per_unit: number | string;
}

interface PricingPageProps extends PageProps {
    pricingDetails: PricingDetail;
    list_pricings: Pricing[];
}

export default function ShowDetailsPricing({ auth, pricingDetails, list_pricings }: PricingPageProps) {
    const toFixed = (value: number | string | null | undefined, decimals: number = 2) => {
        const number = Number(value);
        return isNaN(number) ? '0.00' : number.toFixed(decimals);
    };

    return (
        <>
            <Head title="Detalhes Precificação" />
            <AuthenticatedLayout
                user={auth.user}
            >
            </AuthenticatedLayout>
            <div className="bg-custom-50 dark:bg-dark-custom-50 rounded-lg border border-custom-300 dark:border-dark-custom-300 p-8 w-full max-w-4xl mx-auto mt-6">
                <div className="grid gap-6">
                    <h2 className="text-2xl font-bold text-custom-600 dark:text-dark-custom-300">Detalhes da Precificação</h2>
                    {list_pricings?.map((pricing) => (
                         <Link
                            href={`/edit-pricing/${pricing.id}`}
                            className="inline-block text-custom-500 dark:text-dark-custom-200 border border-custom-300 dark:border-dark-custom-300 px-4 py-2 rounded-xl transition-colors"
                        >
                            Editar
                        </Link>
                    ))}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Custo com Ingredientes</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.total_ingredients_cost)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Adicional de 25% (custos incalculáveis, gás, luz, etc)</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.additional_costs)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Rendimento por unidades</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                {Number(pricingDetails.units_yield).toFixed(0)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Preço Unitário sem embalagem</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.price_per_unit)}
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-custom-600 dark:text-dark-custom-300">Preço da Embalagem</h3>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.packaging_cost)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-custom-600 dark:text-dark-custom-300">Preço Final</h3>
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Preço Final com Embalagem</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.final_price_per_unit)}
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <Link
                            href={route('dashboard')}
                            className="inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2 rounded-xl border border-custom-500 dark:border-dark-custom-500"
                        >
                            Voltar para o Tela Inicial
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}
