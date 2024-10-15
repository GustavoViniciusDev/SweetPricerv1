import { FormEventHandler, useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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
    const [showPassword, setShowPassword] = useState(false);

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

                <div className="flex items-center mb-4">
                    <Link
                        href="/"
                        className="text-custom-500 dark:text-dark-custom-200 hover:text-custom-600 dark:hover:text-dark-custom-300 flex items-center space-x-2"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Voltar para Home</span>
                    </Link>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className="space-y-4">
                    <h2 className="text-center text-custom-700 dark:text-dark-custom-200 text-2xl font-bold mb-4">Entre na sua conta</h2>

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

                    <div className="mt-4 relative">
                        <InputLabel htmlFor="password" value="Senha" />

                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Alternar entre 'text' e 'password'
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border border-custom-400 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        {/* Ícone de exibir/ocultar senha */}
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5 text-custom-500 dark:text-dark-custom-200" />
                            ) : (
                                <EyeIcon className="w-5 h-5 text-custom-500 dark:text-dark-custom-200" />
                            )}
                        </div>

                        <InputError message={errors.password} className="mt-2" />

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-custom-500 dark:text-dark-custom-100 hover:text-custom-600 dark:hover:text-dark-custom-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500 dark:focus:ring-dark-custom-500"
                            >
                                Esqueceu sua senha?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-8">
                        <Link
                            href={route('register')}
                            className="underline text-sm text-custom-500 dark:text-dark-custom-100 hover:text-custom-600 dark:hover:text-dark-custom-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500 dark:focus:ring-dark-custom-500"
                        >
                            Não possui conta? Clique aqui.
                        </Link>

                        <Button type="submit" className="ms-4 bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded-xl" disabled={processing}>
                            Entrar
                        </Button>
                    </div>
                </form>
            </GuestLayout>
        </>
    );
}
