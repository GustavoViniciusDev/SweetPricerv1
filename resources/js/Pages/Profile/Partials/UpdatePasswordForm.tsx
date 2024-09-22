import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-custom-700">Mudar Senha</h2>

                <p className="mt-1 text-sm text-custom-500">
                    Certifique-se de que sua conta utilize uma senha forte.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Senha Atual" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2 text-custom-500 dark:text-dark-custom-300" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Nova Senha" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2 text-custom-500 dark:text-dark-custom-300" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Nova Senha" />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-custom-500 dark:text-dark-custom-300" />
                </div>

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
