import { FormEventHandler, useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

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
            <GuestLayout>
                <Head title="Entrar" />
                <div className="mb-10">
                    <header className={`fixed top-0 left-0 w-full px-4 lg:px-6 h-14 flex items-center ${scrolled ? 'shadow-md' : ''} z-50 transition-shadow duration-300`}>
                        <Link href="/" className="flex items-center justify-center">
                            <h2 className='text-2xl text-custom-700 dark:text-dark-custom-200'>SweetPricer</h2>
                        </Link>
                        <nav className="ml-auto flex gap-4 sm:gap-6">
                                <Link
                                    href="/"
                                    className="bg-transparent text-custom-700 dark:text-dark-custom-200 font-semibold py-2 px-4 border border-custom-400 dark:border-dark-custom-400 hover:border-custom-700 dark:hover:border-dark-custom-700 rounded"
                                >
                                    Voltar
                                </Link>
                            <Link
                                href={route('register')}
                                className="bg-custom-400 dark:bg-dark-custom-400 hover:bg-custom-500 dark:hover:bg-dark-custom-500 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded"
                            >
                                Criar Conta
                            </Link>
                        </nav>
                    </header>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Senha" />

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border border-custom-400 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-8">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-custom-500 dark:text-dark-custom-100 hover:text-custom-600 dark:hover:text-dark-custom-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500 dark:focus:ring-dark-custom-500"
                            >
                                Esqueceu sua senha?
                            </Link>
                        )}

                        <Button type="submit" className="ms-4 bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded-xl" disabled={processing}>
                            Entrar
                        </Button>
                    </div>
                </form>
            </GuestLayout>
        </>

    );
}
