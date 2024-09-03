import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

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
}

export default function ShowDetailsPricing({ auth, pricingDetails }: PricingPageProps) {
    const toFixed = (value: number | string | null | undefined, decimals: number = 2) => {
        const number = Number(value);
        return isNaN(number) ? '0.00' : number.toFixed(decimals);
    };

    return (
        <>
            <Head title="Detalhes Precificação" />
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-custom-600 dark:text-dark-custom-300 leading-tight">Precificação</h2>}
            >
            </AuthenticatedLayout>
            <div className="bg-custom-50 dark:bg-dark-custom-50 rounded-lg border border-custom-300 dark:border-dark-custom-300 p-8 w-full max-w-4xl mx-auto mt-6">
                <div className="grid gap-6">
                    <h2 className="text-2xl font-bold text-custom-600 dark:text-dark-custom-300">Detalhes da Precificação</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Total de Ingredientes</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.total_ingredients_cost)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Adiciona 25% (custos incalculáveis, gás, luz, etc)</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.additional_costs)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Rendimento / quantas unidades</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                {Number(pricingDetails.units_yield).toFixed(0)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Preço Unitário</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.price_per_unit)}
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-custom-600 dark:text-dark-custom-300">Embalagem</h3>
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Embalagem</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.packaging_cost)}
                            </p>
                        </div>
                        <div className="grid gap-2 bg-custom-100 dark:bg-dark-custom-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-custom-600 dark:text-dark-custom-300">Preço Final</h3>
                            <p className="text-sm text-custom-500 dark:text-dark-custom-200">Preço Final Unitário</p>
                            <p className="text-3xl font-bold text-custom-600 dark:text-dark-custom-300">
                                R$ {toFixed(pricingDetails.final_price_per_unit)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
