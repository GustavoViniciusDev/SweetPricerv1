import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

interface Subscription {
    stripe_status: string;
    type: string;
    created_at: string;
    ends_at: string | null;
}

interface Props extends PageProps {
    subscription?: Subscription;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, loading }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; loading: boolean; }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Confirmar Cancelamento</h2>
                <p className="mt-2">Tem certeza que deseja cancelar sua assinatura? Você precisará pagar novamente se quiser usar o plano novamente.</p>
                <div className="mt-4 flex justify-end">
                    <button className="mr-2 text-gray-500" onClick={onClose}>Cancelar</button>
                    <button
                        className={`bg-red-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Cancelando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ChosePlan({ subscription }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const isSubscribed = subscription && subscription.stripe_status === 'active';

    const handleCancel = async () => {
        if (!subscription) {
            setError("Assinatura não encontrada.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.post('/cancel_plan', { subscription_type: subscription.type });
            window.location.reload();
        } catch (error) {
            console.log("Erro ao realizar o cancelamento do plano:", error);
            setLoading(false);
        }
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-custom-700 dark:text-dark-custom-200">
                    {isSubscribed ? 'Seu Plano Atual' : 'Faça um Upgrade'}
                </h2>
                <p className="mt-1 text-lx text-custom-500 dark:text-dark-custom-400">
                    {isSubscribed
                        ? `Você está inscrito no ${subscription.type} desde ${new Date(subscription.created_at).toLocaleDateString()}`
                        : 'Comece a precificar agora mesmo.'}
                </p>
                {subscription && subscription.ends_at && (
                    <p className="text-red-600">
                        A data limite de acesso ao sistema é até: {new Date(subscription.ends_at).toLocaleDateString()}
                    </p>
                )}
            </header>
            <div className="flex items-center gap-4 mt-3">
                {!isSubscribed ? (
                    <Link
                        href={`/choose_plan`}
                        className="inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2 border border-custom-500 dark:border-dark-custom-500 rounded-xl"
                    >
                        Escolher Plano
                    </Link>
                ) : (
                    <>
                        {!subscription.ends_at && (
                            <button
                                onClick={() => setModalOpen(true)}
                                disabled={loading}
                                className={`inline-block bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 border border-red-600 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Cancelando...' : 'Cancelar Plano'}
                            </button>
                        )}
                        {error && <p className="text-red-600">{error}</p>}
                    </>
                )}
            </div>



            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleCancel}
                loading={loading}
            />
        </section>
    );
}
