import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import TextInput from '@/Components/TextInput';
import { Link, Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
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
            <Head title="Forgot Password" />
            <div className="mb-10">
                <header className={`fixed top-0 left-0 w-full px-4 lg:px-6 h-14 flex items-center ${scrolled ? 'shadow-md' : ''} z-50 transition-shadow duration-300`}>
                    <Link href="/" className="flex items-center justify-center">
                        <h2 className='text-2xl text-custom-700 dark:text-dark-custom-200'>SweetPricer</h2>
                    </Link>
                </header>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                Esqueceu sua senha? não se preocupe. Coloque seu endereço de email cadastrado que enviaremos para você um link para poder criar uma nova senha.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <a href={route('login')} className="underline text-sm text-custom-500 dark:text-dark-custom-100 hover:text-custom-600 dark:hover:text-dark-custom-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500 dark:focus:ring-dark-custom-500">Voltar</a>
                    <Button type="submit" className="ms-4 bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded-xl" disabled={processing}>
                        Redefinir Senha
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
