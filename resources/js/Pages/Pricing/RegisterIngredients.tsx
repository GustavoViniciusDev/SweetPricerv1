import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { JSX, SVGProps } from "react";
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Pricing {
    id: number;
    name_pricing: string;
    user_id: string;
}

interface EditPricingProps extends PageProps {
    pricing: Pricing;
}

type Ingredient = {
    name: string;
    quantity: string;
    cost: string;
};

export default function RegisterIngredients({ auth, pricing }: EditPricingProps) {
    const { setData, post } = useForm({
        pricing_id: pricing.id,
        ingredients: [
            { name: "", quantity: "", cost: "" }
        ],
    });

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { name: "", quantity: "", cost: "" }
    ]);

    const handleChange = (index: number, field: keyof Ingredient, value: string) => {
        const newIngredients = [...ingredients];

        if (field === "cost") {
            value = value.replace(/[^0-9.]/g, '');

            newIngredients[index][field] = value ? `R$ ${value}` : '';
        } else {
            newIngredients[index][field] = value;
        }

        setIngredients(newIngredients);
        setData("ingredients", newIngredients.map(ingredient => ({
            ...ingredient,
            cost: ingredient.cost.replace(/[^0-9.]/g, ''),
        })));
    };

    const addIngredient = () => {
        const newIngredients = [...ingredients, { name: "", quantity: "", cost: "" }];
        setIngredients(newIngredients);
        setData("ingredients", newIngredients);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
        setData("ingredients", newIngredients);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasValidIngredients = ingredients.some(ingredient =>
            ingredient.name.trim() !== "" ||
            ingredient.quantity.trim() !== "" ||
            ingredient.cost.trim() !== ""
        );

        if (!hasValidIngredients) {
            toast.error("Por favor, adicione pelo menos um ingrediente.");
            return;
        }

        const validIngredients = ingredients.every(ingredient =>
            ingredient.name.trim() !== "" &&
            ingredient.quantity.trim() !== "" &&
            ingredient.cost.trim() !== ""
        );

        if (!validIngredients) {
            toast.error("Por favor, preencha todos os campos dos ingredientes.");
            return;
        }

        post(route('ingredients.store'));
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Precificação</h2>}
            ></AuthenticatedLayout>
            <Head title="Precificação" />
            <Card>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <CardHeader>
                        <CardTitle className="text-custom-700 dark:text-dark-custom-700">Custo dos Ingredientes $</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`name-${index}`} className="text-custom-600 dark:text-dark-custom-600">Ingrediente</Label>
                                        <Input
                                            id={`name-${index}`}
                                            value={ingredient.name}
                                            onChange={(e) => handleChange(index, "name", e.target.value)}
                                            className="border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`quantity-${index}`} className="text-custom-600 dark:text-dark-custom-600">Quantidade</Label>
                                        <Input
                                            id={`quantity-${index}`}
                                            value={ingredient.quantity}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                handleChange(index, "quantity", value);
                                            }}
                                            className="border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor={`cost-${index}`} className="text-custom-600 dark:text-dark-custom-600">Custo</Label>
                                        <Input
                                            id={`cost-${index}`}
                                            value={ingredient.cost}
                                            onChange={(e) => handleChange(index, "cost", e.target.value)}
                                            className="border-custom-300 dark:border-dark-custom-300 focus:border-custom-500 dark:focus:border-dark-custom-500"
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeIngredient(index)} className="text-custom-500 hover:text-custom-700 dark:text-dark-custom-500 dark:hover:text-dark-custom-700">
                                        <TrashIcon className="h-5 w-5" />
                                        <span className="sr-only">Remover ingrediente</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="w-full flex justify-center">
                        <Button onClick={addIngredient} className="bg-custom-400 dark:bg-dark-custom-400 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 rounded">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Adicionar Ingrediente
                        </Button>
                    </CardFooter>
                    <div className="flex items-center justify-center mt-4 w-full">
                        <Button type="submit" className="bg-custom-500 dark:bg-dark-custom-500 hover:bg-custom-700 dark:hover:bg-dark-custom-700 text-white font-bold py-2 px-4 rounded">
                            Calcular
                        </Button>
                    </div>
                </form>
            </Card>

        </>
    )
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}
