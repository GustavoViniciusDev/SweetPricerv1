import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificação de Email" />

            <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4 bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center text-custom-700 dark:text-dark-custom-300">Verificação de Email</h1>

                    <div className="mb-6 text-sm text-custom-600 dark:text-dark-custom-200">
                        Ficamos felizes que tenha criado sua conta conosco! Antes de começar, poderia verificar seu endereço de email clicando no link que acabamos de enviar para você? Se você não recebeu o email, nós enviaremos outro com prazer.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 font-medium text-sm text-green-600">
                            Um novo link de verificação foi enviado para o endereço de email fornecido durante o registro.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex flex-col items-center">
                            <Button
                                type="submit"
                                className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 border border-blue-600"
                                disabled={processing}
                            >
                                Reenviar Email de Verificação
                            </Button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="mt-4 underline text-sm text-custom-600 dark:text-dark-custom-200 hover:text-custom-700 dark:hover:text-dark-custom-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500 dark:focus:ring-dark-custom-500"
                            >
                                Sair
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
