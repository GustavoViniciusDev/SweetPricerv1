import React, { FormEventHandler, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { TbProgressHelp } from "react-icons/tb";
import { useForm } from '@inertiajs/react';
import { Button } from '../ui/button';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline'

const HelpMeIcon = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const { data, setData, post } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (data.name === '' || data.email === '' || data.message === '') {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        post('/help-me', {
            onSuccess: () => {
                toast.success('Mensagem enviada com sucesso!');
                setData({ name: '', email: '', message: '' });
                toggleModal();
            },
            onError: () => {
                toast.error('Erro ao enviar a mensagem. Verifique os campos.');
            }
        });
    }

    return (
        <div>
            <div
                className="fixed bottom-2 right-5 bg-custom-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl cursor-pointer shadow-lg hover:bg-custom-700 transition md:w-16 md:h-16 md:text-3xl"

                onClick={toggleModal}
            >
                <TbProgressHelp />
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Como podemos te ajudar?</h2>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Nome de Usuário" />
                                <TextInput
                                    id="username"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
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
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="message" value="Mensagem" />
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                                    onChange={(e) => setData('message', e.target.value)}
                                ></Textarea>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-custom-600 text-white py-2 rounded-md hover:bg-custom-700 transition"
                                >
                                    Enviar
                                </Button>
                            </div>
                        </form>
                        <Button
                            className="absolute top-3 right-3 text-custom-600 hover:text-custom-500 transition p-1"
                            onClick={toggleModal}
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpMeIcon;
