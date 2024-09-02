import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { FormEventHandler, useState } from "react";
import { Head,useForm,usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

interface Ingredient {
    name: string;
    quantity: number;
    cost: number | string;
}

interface CustomPageProps {
    pricing_id: number;
    user_id: number;
    ingredients: Ingredient[];
}

interface PageProps extends CustomPageProps {
    [key: string]: any;
}

export default function CalculatePricing( {auth}: PageProps ) {
    const { props } = usePage<PageProps>();
    const { pricing_id, user_id, ingredients } = props;

    const [usedGrams, setUsedGrams] = useState<{ [key: number]: number }>({});
    const [profitMarginMultiplier, setProfitMarginMultiplier] = useState<number>(3);
    const [unitsYield, setUnitsYield] = useState<number>(10);
    const [packagingCost, setPackagingCost] = useState<number>(0);

    const calculateCostBasedOnUsedGrams = (ingredient: Ingredient, gramsUsed: number) => {
        const cost = typeof ingredient.cost === "number" ? ingredient.cost : parseFloat(ingredient.cost);
        const gramsPerPackage = ingredient.quantity;
        return ((cost / gramsPerPackage) * gramsUsed).toFixed(2);
    };

    const handleGramsUsedChange = (index: number, value: string) => {
        const grams = parseFloat(value) || 0;
        setUsedGrams((prev) => ({ ...prev, [index]: grams }));
    };

    const totalIngredientsCost = ingredients.reduce((sum, ingredient, index) => {
        const gramsUsed = usedGrams[index] || 0;
        const cost = parseFloat(calculateCostBasedOnUsedGrams(ingredient, gramsUsed));
        return sum + cost;
    }, 0);

    const additionalCosts = totalIngredientsCost * 0.25;

    const profitAndLaborCost = (totalIngredientsCost + additionalCosts) * profitMarginMultiplier;

    const pricePerUnit = unitsYield ? profitAndLaborCost / unitsYield : 0;

    const finalPricePerUnit = pricePerUnit + packagingCost;

    const { data, setData, post } = useForm({
        total_ingredients_cost: "",
        additional_cost: "",
        profit_and_labor_cost: "",
        units_yield: "",
        price_per_unit: "",
        packaging_cost: "",
        final_price_per_unit: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setData({
            total_ingredients_cost: totalIngredientsCost.toFixed(2),
            additional_cost: additionalCosts.toFixed(2),
            profit_and_labor_cost: profitAndLaborCost.toFixed(2),
            units_yield: unitsYield.toString(),
            price_per_unit: pricePerUnit.toFixed(2),
            packaging_cost: packagingCost.toFixed(2),
            final_price_per_unit: finalPricePerUnit.toFixed(2),
        });

        post(route("pricing_details.store"), {
            data: {
                ...data,
                pricing_id,
                user_id
            }
        });
    };

    return (
        <>
        <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Precificação</h2>}
            ></AuthenticatedLayout>
            <Head title="Precificação" />
            <div className="grid gap-8 max-w-4xl mx-auto px-4 md:px-0">
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4">
                        <h1 className="text-3xl font-bold">Detalhes da Precificação</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted border-b">
                                    <tr>
                                        <th className="p-4 text-left">Ingredientes</th>
                                        <th className="p-4 text-right">Custo dos Ingredientes</th>
                                        <th className="p-4 text-right">Quantidade em g/ Embalagem Fechada</th>
                                        <th className="p-4 text-right">Gramas Utilizados</th>
                                        <th className="p-4 text-right">Quanto Custou</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.map((ingredient: Ingredient, index: number) => (
                                        <tr className="border-b" key={index}>
                                            <td className="p-4">{ingredient.name}</td>
                                            <td className="p-4 text-right">
                                                R$ {(typeof ingredient.cost === "number" ? ingredient.cost : parseFloat(ingredient.cost)).toFixed(2)}
                                            </td>
                                            <td className="p-4 text-right">{(ingredient.quantity).toFixed(0)} g</td>
                                            <td className="p-4 text-right">
                                                <input
                                                    type="number"
                                                    value={usedGrams[index] || ""}
                                                    onInput={(e) => handleGramsUsedChange(index, (e.target as HTMLInputElement).value)}
                                                    className="border rounded px-2"
                                                />
                                            </td>
                                            <td className="p-4 text-right">
                                                R$ {calculateCostBasedOnUsedGrams(ingredient, usedGrams[index] || 0)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <h1 className="text-3xl font-bold">Resumo da Precificação</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted border-b">
                                    <tr>
                                        <th className="p-4 text-left">Item</th>
                                        <th className="p-4 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-4">Total de Ingredientes</td>
                                        <td className="p-4 text-right">
                                            <input
                                                type="hidden"
                                                value={data.total_ingredients_cost}
                                                name="total_ingredients_cost"
                                                onChange={(e) => setData("total_ingredients_cost", e.target.value)}
                                            />
                                            R$ {totalIngredientsCost.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4">Adiciona 25% (custos incalculáveis, gás, luz, etc)</td>
                                        <td className="p-4 text-right">
                                            <input
                                                type="hidden"
                                                value={data.additional_cost}
                                                name="additional_cost"
                                                onChange={(e) =>setData("additional_cost", e.target.value)}
                                            />
                                            R$ {additionalCosts.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4">Multiplica por 3 (seu lucro e mão de obra)</td>
                                        <td className="p-4 text-right">
                                            <input type="hidden"
                                                value={data.profit_and_labor_cost}
                                                name="profit_and_labor_cost"
                                                onChange={(e) => setData("profit_and_labor_cost", e.target.value)}
                                            />
                                            R$ {profitAndLaborCost.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4">Rendimento / quantas unidades</td>
                                        <td className="p-4 text-right">
                                            <input type="hidden"
                                                value={data.units_yield}
                                                name="units_yield"
                                                onChange={(e) => setData("units_yield", e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                value={unitsYield}
                                                onChange={(e) => setUnitsYield(Number(e.target.value))}
                                                className="border rounded px-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4">Preço Unitário</td>
                                        <td className="p-4 text-right">
                                            <input type="hidden"
                                                value={data.price_per_unit}
                                                onChange={(e) => setData("price_per_unit", e.target.value)}
                                            />
                                            R$ {pricePerUnit.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4">Preço por Embalagem Individual</td>
                                        <td className="p-4 text-right">
                                            <input
                                                type="hidden"
                                                value={data.packaging_cost}
                                                onChange={(e) => setData("packaging_cost", e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                value={packagingCost}
                                                onChange={(e) => setPackagingCost(Number(e.target.value))}
                                                className="border rounded px-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-4">Preço Final</td>
                                        <td className="p-4 text-right">
                                            <input type="hidden" />
                                            R$ {finalPricePerUnit.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded-xl">
                            Criar Precificação
                    </Button>
                </form>
            </div>
        </>

    );
}
