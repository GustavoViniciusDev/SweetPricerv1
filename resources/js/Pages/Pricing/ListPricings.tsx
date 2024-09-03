import { Link } from '@inertiajs/react';

interface Pricing {
    id: number;
    name_pricing: string;
    user_id: string;
    id_pricing_details?: number;
}

interface ListPricingsProps {
    list_pricings: Pricing[];
}

export default function ListPricings({ list_pricings }: ListPricingsProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-custom-600 dark:text-dark-custom-300 text-center">
                Lista de Precificações
            </h1>
            {list_pricings.length === 0 ? (
                <p className="text-center text-custom-500 dark:text-dark-custom-100 text-2xl font-semibold py-4">
                    Nenhuma precificação criada
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list_pricings.map((pricing) => (
                    <div key={pricing.id} className="rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 p-6 shadow-md flex flex-col justify-between">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold text-custom-600 dark:text-dark-custom-300">{pricing.name_pricing}</h2>
                            <p className="mb-4 text-custom-500 dark:text-dark-custom-100">
                                Description or additional details about the pricing can be added here.
                            </p>
                        </div>
                        <div className="flex justify-between mt-auto">
                            <Link
                                href={`/pricing-details/${pricing.id_pricing_details ?? pricing.id}`}
                                className="inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2 border border-custom-500 dark:border-dark-custom-500 rounded-xl"
                            >
                                Ver Preço
                            </Link>
                            <Link
                                href={`/edit-pricing/${pricing.id}`}
                                className="inline-block text-custom-500 dark:text-dark-custom-200 border-custom-300 dark:border-dark-custom-300 px-4 py-2 rounded-xl"
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
