    import React, { useEffect, useState, FormEventHandler } from "react";
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
    import { Head, useForm, usePage, Link } from "@inertiajs/react";
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
    import { Button } from "@/Components/ui/button";
    import { Input } from "@/Components/ui/input";
    import { Label } from "@/Components/ui/label";
    import { toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
    import ConfirmModal from "@/Components/ConfirmDeleteIngredient";

    interface Pricing {
        id: number;
        name_pricing: string;
        user_id: string;
        id_pricing_details?: number;
    }

    interface Ingredient {
        name: string;
        quantity: number | string;
        quantity_used: number | string;
        cost: number | string;
    }

    interface CustomPageProps {
        pricing_id: number;
        user_id: number;
        ingredients: Ingredient[];
        list_pricings: Pricing[];
        pricing_name: string;
    }

    interface PageProps extends CustomPageProps {
        [key: string]: any;
    }

    interface FormData {
        total_ingredients_cost: string;
        additional_costs: string;
        profit_and_labor_cost: string;
        units_yield: string;
        price_per_unit: string;
        packaging_cost: string;
        final_price_per_unit: string;
        pricing_id: string;
        user_id: string;
        ingredients: Ingredient[];
    }

    export default function CalculateAndRegisterPricing({ auth, pricing }: PageProps) {
        const { props } = usePage<PageProps>();
        const { pricing_id, user_id, ingredients } = props;

        const [usedGrams, setUsedGrams] = useState<{ [key: number]: number }>({});
        const [profitMarginMultiplier, setProfitMarginMultiplier] = useState<number>(3);
        const [unitsYield, setUnitsYield] = useState<number>(1);
        const [packagingCost, setPackagingCost] = useState<number>(0);
        const [ingredientList, setIngredientList] = useState<Ingredient[]>(ingredients || [{ name: "", quantity: "", quantity_used: "", cost: "" }]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [ingredientToRemove, setIngredientToRemove] = useState<number | null>(null);


        const calculateCostBasedOnUsedGrams = (ingredient: Ingredient, gramsUsed: number) => {
            const cost = typeof ingredient.cost === "number" ? ingredient.cost : parseFloat(ingredient.cost.replace('R$ ', ''));
            const gramsPerPackage = Number(ingredient.quantity);
            return ((cost / gramsPerPackage) * gramsUsed).toFixed(2);
        };

        const handleGramsUsedChange = (index: number, value: string) => {
            const sanitizedValue = value.replace(/^0+/, '') || '0';
            const grams = parseFloat(sanitizedValue);
            const updatedIngredients = [...ingredientList];
            updatedIngredients[index].quantity_used = isNaN(grams) ? 0 : grams;
            setIngredientList(updatedIngredients);
        };


        const totalIngredientsCost = ingredientList.reduce((sum, ingredient) => {
            const gramsUsed = Number(ingredient.quantity_used);
            const cost = parseFloat(calculateCostBasedOnUsedGrams(ingredient, gramsUsed));
            return sum + cost;
        }, 0);

        const additionalCosts = totalIngredientsCost * 0.25;
        const profitAndLaborCost = (totalIngredientsCost + additionalCosts) * profitMarginMultiplier;
        const pricePerUnit = unitsYield ? profitAndLaborCost / unitsYield : 0;
        const finalPricePerUnit = pricePerUnit + packagingCost;

        const { data, setData, post, processing, errors } = useForm<FormData>({
            total_ingredients_cost: '',
            additional_costs: '',
            profit_and_labor_cost: '',
            units_yield: '',
            price_per_unit: '',
            packaging_cost: '',
            final_price_per_unit: '',
            pricing_id: '',
            user_id: '',
            ingredients: []
        });

        useEffect(() => {
            setData(prev => ({
                ...prev,
                total_ingredients_cost: totalIngredientsCost.toFixed(2),
                additional_costs: additionalCosts.toFixed(2),
                profit_and_labor_cost: profitAndLaborCost.toFixed(2),
                units_yield: unitsYield.toString(),
                price_per_unit: pricePerUnit.toFixed(2),
                packaging_cost: packagingCost.toFixed(2),
                final_price_per_unit: finalPricePerUnit.toFixed(2),
                pricing_id: pricing_id ? pricing_id.toString() : '',
                user_id: user_id ? user_id.toString() : '',
                ingredients: ingredientList.map((ingredient) => ({
                    ...ingredient
                }))
            }));
        }, [totalIngredientsCost, additionalCosts, profitAndLaborCost, unitsYield, pricePerUnit, packagingCost, finalPricePerUnit, pricing_id, user_id, ingredientList]);

        const handleChangeIngredient = (index: number, field: keyof Ingredient, value: string) => {
            const newIngredients = [...ingredientList];

              newIngredients[index][field] = (value);

            setIngredientList(newIngredients);
            setUsedGrams((prev) => ({ ...prev, [index]: 0 }));
          };

        const addIngredient = () => {
            setIngredientList((prevList) => [
                ...prevList,
                { name: '', quantity: 0, cost: 0, quantity_used: 0 }
            ]);
        };

        const removeIngredient = (index: number) => {
            setIngredientToRemove(index);
            setIsModalOpen(true);
        };

        const handleConfirmRemove = () => {
            if (ingredientToRemove !== null) {
                const newIngredients = [...ingredientList];
                newIngredients.splice(ingredientToRemove, 1);
                setIngredientList(newIngredients);
                setUsedGrams((prev) => {
                    const newUsedGrams = { ...prev };
                    delete newUsedGrams[ingredientToRemove];
                    return newUsedGrams;
                });
                setIngredientToRemove(null);
            }
            setIsModalOpen(false);
        };

        const submit: FormEventHandler = (e) => {
            e.preventDefault();
            post(route("pricing_details.store"), {
                onSuccess: () => {
                    toast.success('Precificação salva com sucesso!');
                },
                onError: () => {
                    console.error(errors);
                    toast.error('Ocorreu um erro ao salvar a precificação.');
                }
            });
        };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
            />
            <Head title="Precificação" />
            <div className="max-w-4xl mx-auto px-4 md:px-0 mb-10 mt-10">

                <h1 className="text-5xl font-bold mb-8 text-custom-300 text-center">
                    Precificação: {pricing.name_pricing}
                </h1>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-custom-300 pl-5">Registro de Ingredientes</h2>
                        <div className="grid gap-6">
                            {ingredientList.map((ingredient, index) => (
                                <Card key={index} className="border border-custom-200 bg-custom-50">
                                    <CardHeader className="bg-custom-100">
                                        <CardTitle className="text-2xl text-custom-700">Ingrediente {index + 1}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4">
                                            <Label className="text-1xl text-custom-800">Nome</Label>
                                            <Input
                                                value={ingredient.name}
                                                onChange={(e) => handleChangeIngredient(index, "name", e.target.value)}
                                                className="bg-custom-50 border-custom-300"
                                            />
                                            <Label className="text-1xl text-custom-800">Quantidade em g/embalagem</Label>
                                            <Input
                                                type="number"
                                                value={ingredient.quantity}
                                                onChange={(e) => handleChangeIngredient(index, "quantity", e.target.value)}
                                                className="bg-custom-50 border-custom-300"
                                            />
                                            <Label className="text-1xl text-custom-800">Custo</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">R$</span>
                                                <Input
                                                    type="number"
                                                    value={typeof ingredient.cost === 'string' ? ingredient.cost.replace(/[^0-9.]/g, '') : ''}
                                                    onChange={(e) => handleChangeIngredient(index, "cost", e.target.value)}
                                                    className="pl-10 bg-custom-50 border-custom-300"
                                                />
                                            </div>
                                            <Label className="text-1xl text-custom-800">Quantidade utilizada (g)</Label>
                                            <Input
                                                type="number"
                                                value={ingredient.quantity_used}
                                                onChange={(e) => handleChangeIngredient(index, "quantity_used", e.target.value)}
                                                className="bg-custom-50 border-custom-300"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <Button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="bg-custom-400 hover:bg-custom-500 text-white rounded-xl"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={addIngredient}
                                            className="bg-custom-400 hover:bg-custom-500 text-white rounded-xl"
                                        >
                                            <PlusCircleIcon className="h-5 w-5" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={addIngredient}
                            className="bg-custom-400 hover:bg-custom-500 text-white rounded-xl"
                        >
                            Adicionar Ingrediente
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-custom-300 pl-5">Cálculo de Preço</h2>
                        <div className="space-y-6">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center border-b border-gray-200 pb-3">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Custo Total dos Ingredientes</Label>
                                        <div className="relative w-1/2">
                                            <Input
                                                type="text"
                                                value={totalIngredientsCost.toFixed(2)}
                                                readOnly
                                                className="w-full pl-10 bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">R$</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200 pb-3">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Adiciona 25% (custos incalculáveis, gás, luz, etc)   </Label>
                                        <div className="relative w-1/2">
                                            <Input
                                                type="text"
                                                value={additionalCosts.toFixed(2)}
                                                readOnly
                                                className="w-full pl-10 bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">R$</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200 pb-3">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Custo Total com Lucro e Mão de Obra</Label>
                                        <div className="relative w-1/2">
                                            <Input
                                                type="text"
                                                value={profitAndLaborCost.toFixed(2)}
                                                readOnly
                                                className="w-full pl-10 bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">R$</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200 pb-3">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Rendimento / quantas unidades</Label>
                                        <div className="w-1/2">
                                            <Input
                                                type="number"
                                                value={unitsYield}
                                                onChange={(e) => setUnitsYield(parseFloat(e.target.value) || 0)}
                                                className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200 pb-3">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Preço por Unidade</Label>
                                        <div className="relative w-1/2">
                                            <Input
                                                type="text"
                                                value={pricePerUnit.toFixed(2)}
                                                readOnly
                                                className="w-full pl-10 bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">R$</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center border-b border-gray-200 pb-3">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Custo de Embalagem</Label>
                                        <div className="relative w-1/2">
                                            <Input
                                                type="number"
                                                value={packagingCost}
                                                onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                                                className="w-full pl-10 bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">R$</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Label className="text-lg text-gray-700 w-1/2 font-medium">Preço Final por Unidade</Label>
                                        <div className="relative w-1/2">
                                            <Input
                                                type="text"
                                                value={finalPricePerUnit.toFixed(2)}
                                                readOnly
                                                className="w-full pl-10 bg-gray-100 border border-gray-300 rounded-md p-3 text-right text-gray-800 placeholder-gray-400"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">R$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardFooter>
                        <Button type="submit" disabled={processing} className="bg-custom-500 hover:bg-custom-600 text-white rounded-xl">
                            {processing ? 'Salvando...' : 'Salvar Precificação'}
                        </Button>
                    </CardFooter>
                </form>
                <ConfirmModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmRemove}
                />
            </div>
        </>
    );
}
