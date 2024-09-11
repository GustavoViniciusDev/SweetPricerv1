import { Link, useForm } from '@inertiajs/react';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [showIncompleteModal, setShowIncompleteModal] = useState<number | null>(null); // Track incomplete pricing modal
    const { delete: destroy } = useForm();

    const handleDelete = (pricingId: number) => {
        destroy(`/pricing/${pricingId}`, {
            onSuccess: () => {
                toast.success('Precificação excluída com sucesso!');
                setConfirmDelete(null);
            },
            onError: () => {
                toast.error("Ocorreu um erro ao tentar excluir a precificação.");
            },
        });
    };

    const handleIncompletePricing = (pricingId: number) => {
        setShowIncompleteModal(pricingId);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-custom-600 dark:text-dark-custom-300 text-center">
                Histórico de Precificações
            </h1>
            {list_pricings.length === 0 ? (
                <p className="text-center text-custom-500 dark:text-dark-custom-100 text-2xl font-semibold py-4">
                    Nenhuma precificação criada
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {list_pricings.map((pricing) => (
                        <div key={pricing.id} className="rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 p-6 shadow-md flex flex-col justify-between space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold text-custom-600 dark:text-dark-custom-300">
                                        Precificação: {pricing.name_pricing}
                                    </h2>
                                    <p className="text-custom-500 dark:text-dark-custom-100">
                                        Precificação criada
                                    </p>
                                </div>
                                <button
                                    onClick={() => setConfirmDelete(pricing.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    title="Excluir precificação"
                                >
                                    <FaTrash className="text-2xl" />
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-auto">
                                {pricing.id_pricing_details ? (
                                    <Link
                                        href={`/pricing-details/${pricing.id_pricing_details}`}
                                        className="inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2 rounded-xl transition-colors"
                                    >
                                        Ver Preço
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleIncompletePricing(pricing.id)}
                                        className="inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2 rounded-xl transition-colors"
                                    >
                                        Ver Preço
                                    </button>
                                )}
                                <Link
                                    href={`/edit-pricing/${pricing.id}`}
                                    className="inline-block text-custom-500 dark:text-dark-custom-200 border border-custom-300 dark:border-dark-custom-300 px-4 py-2 rounded-xl transition-colors"
                                >
                                    Editar
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            )}

            {confirmDelete && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-dark-custom-50 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-red-600">
                            Você tem certeza que deseja excluir essa precificação?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                onClick={() => handleDelete(confirmDelete)}
                            >
                                Excluir
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                onClick={() => setConfirmDelete(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showIncompleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-dark-custom-50 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-custom-600">
                            Você não finalizou sua precificação.
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <Link
                                href={`/edit-pricing/${showIncompleteModal}`}
                                className="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 rounded"
                            >
                                Clique aqui para finalizar
                            </Link>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                onClick={() => setShowIncompleteModal(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
