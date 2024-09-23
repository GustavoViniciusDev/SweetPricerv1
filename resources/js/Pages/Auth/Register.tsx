import { FormEventHandler, useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
        <GuestLayout>
            <Head title="Criar Conta" />

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <h2 className="text-center text-custom-700 dark:text-dark-custom-200 text-2xl font-bold mb-4">Crie sua conta</h2>

                    <InputLabel htmlFor="name" value="Nome de Usuário" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <InputLabel htmlFor="password" value="Senha" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </span>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />

                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <span onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </span>
                    </div>

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-custom-500 dark:text-dark-custom-100 hover:text-custom-600 dark:hover:text-dark-custom-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500 dark:focus:ring-dark-custom-500"
                    >
                        Já possui conta? Clique aqui.
                    </Link>

                    <Button type="submit" className="ms-4 bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded-xl" disabled={processing}>
                        Criar Conta
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
