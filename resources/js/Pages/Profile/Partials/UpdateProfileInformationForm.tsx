import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button }from '@/Components/ui/button';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-custom-700">Informações do Perfil</h2>

                <p className="mt-1 text-sm text-custom-500">
                    Atualize informações do seu perfil e seu endereço de email.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2 text-custom-500 dark:text-dark-custom-300" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-custom-500 dark:text-dark-custom-300" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-custom-700">
                            Seu endereço de Email não foi verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-custom-500 hover:text-custom-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500"
                            >
                                Clique aqui para verificar seu email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Foi enviado no para seu email um link para verificação.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing} className="inline-block bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold px-4 py-2  border border-custom-500 dark:border-dark-custom-500 rounded-xl">
                        Salvar
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-custom-500">Salvo.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
