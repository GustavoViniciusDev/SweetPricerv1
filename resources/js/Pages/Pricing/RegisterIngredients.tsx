import React, { useEffect, useState, FormEventHandler } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

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
    packaging_quantity: string;
    final_price_per_unit: string;
    pricing_id: string;
    user_id: string;
    ingredients: Ingredient[];
}

export default function CalculateAndRegisterPricing({ auth, pricing }: PageProps) {
    const { props } = usePage<PageProps>();
    const { pricing_id, user_id, ingredients, pricing_name } = props;

    const [usedGrams, setUsedGrams] = useState<{ [key: number]: number }>({});
    const [profitMarginMultiplier, setProfitMarginMultiplier] = useState<number>(3);
    const [unitsYield, setUnitsYield] = useState<number>(10);
    const [packagingCost, setPackagingCost] = useState<number>(0);
    const [packagingQuantity, setPackagingQuantity] = useState<number>(1);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>(ingredients || [{ name: "", quantity: "", quantity_used: "", cost: "" }]);

    const calculateCostBasedOnUsedGrams = (ingredient: Ingredient, gramsUsed: number) => {
        const cost = typeof ingredient.cost === "number" ? ingredient.cost : parseFloat(ingredient.cost.replace('R$ ', ''));
        const gramsPerPackage = Number(ingredient.quantity);
        return ((cost / gramsPerPackage) * gramsUsed).toFixed(2);
    };

    const handleGramsUsedChange = (index: number, value: string) => {
        const grams = parseFloat(value) || 0;
        setUsedGrams((prev) => ({ ...prev, [index]: grams }));
    };

    const totalIngredientsCost = ingredientList.reduce((sum, ingredient, index) => {
        const gramsUsed = usedGrams[index] || 0;
        const cost = parseFloat(calculateCostBasedOnUsedGrams(ingredient, gramsUsed));
        return sum + cost;
    }, 0);


    const additionalCosts = totalIngredientsCost * 0.25;
    const profitAndLaborCost = (totalIngredientsCost + additionalCosts) * profitMarginMultiplier;
    const pricePerUnit = unitsYield ? profitAndLaborCost / unitsYield : 0;
    const totalPackagingCost = packagingCost * packagingQuantity;
    const finalPricePerUnit = pricePerUnit + totalPackagingCost;

    const { data, setData, post, processing, errors } = useForm<FormData>({
        total_ingredients_cost: '',
        additional_costs: '',
        profit_and_labor_cost: '',
        units_yield: '',
        price_per_unit: '',
        packaging_cost: '',
        packaging_quantity: '',
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
            packaging_quantity: packagingQuantity.toString(),
            final_price_per_unit: finalPricePerUnit.toFixed(2),
            pricing_id: pricing_id ? pricing_id.toString() : '',
            user_id: user_id ? user_id.toString() : '',
            ingredients: ingredientList.map((ingredient, index) => ({
                ...ingredient,
                quantity: ingredient.quantity,
                cost: typeof ingredient.cost === 'string' ? ingredient.cost.replace(/[^0-9.]/g, '') : '',
                quantity_used: usedGrams[index] || 0
            }))
        }));
    }, [totalIngredientsCost, additionalCosts, profitAndLaborCost, unitsYield, pricePerUnit, packagingCost, packagingQuantity, finalPricePerUnit, pricing_id, user_id, ingredientList, usedGrams]);


    const handleChangeIngredient = (index: number, field: keyof Ingredient, value: string) => {
        const newIngredients = [...ingredientList];

        if (field === "cost") {
            const numericValue = value.replace(/[^0-9.]/g, '');
            newIngredients[index][field] = numericValue ? `R$ ${numericValue}` : '';
        } else {
            newIngredients[index][field] = value;
        }

        setIngredientList(newIngredients);
        setUsedGrams((prev) => ({ ...prev, [index]: 0 }));
    };

    const addIngredient = () => {
        const newIngredients = [...ingredientList, { name: "", quantity: "", quantity_used: "", cost: "" }];
        setIngredientList(newIngredients);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...ingredientList];
        newIngredients.splice(index, 1);
        setIngredientList(newIngredients);
        setUsedGrams((prev) => {
            const newUsedGrams = { ...prev };
            delete newUsedGrams[index];
            return newUsedGrams;
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("pricing_details.store"), {
            onSuccess: () => {
                toast.success('Precificação salva com sucesso!');
            },
            onError: () => {
                toast.error('Ocorreu um erro ao salvar a precificação.');
            }
        });
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-custom-300 leading-tight">Precificação e Registro de Ingredientes</h2>}
            />
            <Head title="Precificação" />
            <div className="max-w-4xl mx-auto px-4 md:px-0 mb-10">
                <h1 className="text-4xl font-bold mb-8 text-custom-300">Precificação: {pricing.name_pricing}</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-6">
                        <h2 className="text-3xl font-bold text-custom-300">Registro de Ingredientes</h2>
                        {ingredientList.map((ingredient, index) => (
                            <Card key={index} className="border border-custom-200 bg-custom-50">
                                <CardHeader className="bg-custom-100">
                                    <CardTitle className="text-custom-700">Ingrediente {index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4">
                                        <Label className="text-custom-800">Nome</Label>
                                        <Input
                                            value={ingredient.name}
                                            onChange={(e) => handleChangeIngredient(index, "name", e.target.value)}
                                            className="bg-custom-50 border-custom-300"
                                        />
                                        <Label className="text-custom-800">Quantidade em g/embalagem</Label>
                                        <Input
                                            type="number"
                                            value={ingredient.quantity}
                                            onChange={(e) => handleChangeIngredient(index, "quantity", e.target.value)}
                                            className="bg-custom-50 border-custom-300"
                                        />
                                        <Label className="text-custom-800">Custo</Label>
                                        <Input
                                            type="number"
                                            value={typeof ingredient.cost === 'string' ? ingredient.cost.replace(/[^0-9.]/g, '') : ''}
                                            onChange={(e) => handleChangeIngredient(index, "cost", e.target.value)}
                                            className="bg-custom-50 border-custom-300"
                                        />
                                        <Label className="text-custom-800">Quantidade utilizada (g)</Label>
                                        <Input
                                            type="number"
                                            value={usedGrams[index] || ''}
                                            onChange={(e) => handleGramsUsedChange(index, e.target.value)}
                                            className="bg-custom-50 border-custom-300"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <Button
                                        type="button"
                                        onClick={() => removeIngredient(index)}
                                        className="bg-custom-400 hover:bg-custom-500 text-white"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={addIngredient}
                                        className="bg-custom-400 hover:bg-custom-500 text-white"
                                    >
                                        <PlusCircleIcon className="h-5 w-5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-custom-300">Cálculo de Preço</h2>
                        <div className="grid gap-4">
                            <Label className="text-custom-800">Custo Total dos Ingredientes</Label>
                            <Input
                                type="text"
                                value={`R$ ${totalIngredientsCost.toFixed(2)}`}
                                readOnly
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Custos Adicionais</Label>
                            <Input
                                type="text"
                                value={`R$ ${additionalCosts.toFixed(2)}`}
                                readOnly
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Custo Total com Lucro e Mão de Obra</Label>
                            <Input
                                type="text"
                                value={`R$ ${profitAndLaborCost.toFixed(2)}`}
                                readOnly
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Unidades Rendidas</Label>
                            <Input
                                type="number"
                                value={unitsYield}
                                onChange={(e) => setUnitsYield(parseFloat(e.target.value) || 0)}
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Preço por Unidade</Label>
                            <Input
                                type="text"
                                value={`R$ ${pricePerUnit.toFixed(2)}`}
                                readOnly
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Custo de Embalagem</Label>
                            <Input
                                type="number"
                                value={packagingCost}
                                onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Quantidade de Embalagem</Label>
                            <Input
                                type="number"
                                value={packagingQuantity}
                                onChange={(e) => setPackagingQuantity(parseFloat(e.target.value) || 1)}
                                className="bg-custom-50 border-custom-300"
                            />
                            <Label className="text-custom-800">Preço Final por Unidade</Label>
                            <Input
                                type="text"
                                value={`R$ ${finalPricePerUnit.toFixed(2)}`}
                                readOnly
                                className="bg-custom-50 border-custom-300"
                            />
                        </div>
                    </div>

                    <CardFooter>
                        <Button type="submit" disabled={processing} className="bg-custom-500 hover:bg-custom-600 text-white">
                            {processing ? 'Salvando...' : 'Salvar Precificação'}
                        </Button>
                    </CardFooter>
                </form>
            </div>
        </>
    );
}
