import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from 'react-toastify';

export default function NewPricing() {
    const { data, setData, post } = useForm({
        name_pricing: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.name_pricing.trim() === "") {
            toast.error("O campo 'Nome da Precificação' não pode estar vazio.");
            return;
        }

        if (data.name_pricing.length < 5) {
            toast.error("O campo 'Nome da Precificação' deve conter pelo menos 5 caracteres.");
            return;
        }

        post(route("pricing.store"));
    };

    return (
        <>
            <Card className="w-full max-w-md mx-auto p-4 bg-gray-100 dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-custom-600 dark:text-dark-custom-300">Criar Nova Precificação</CardTitle>
                    <CardDescription className="text-custom-500 dark:text-dark-custom-100">Adicionar nova precificação ao seu histórico.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-custom-600 dark:text-dark-custom-300">Nome</Label>
                            <Input
                                id="name"
                                value={data.name_pricing}
                                name="name_pricing"
                                onChange={(e) => setData("name_pricing", e.target.value)}
                                className="mt-1 block w-full rounded-xl border border-custom-300 dark:border-dark-custom-300 bg-custom-50 dark:bg-dark-custom-50 focus:border-custom-500 dark:focus:border-dark-custom-500 focus:ring-0 py-2 px-3"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-custom-400 dark:bg-dark-custom-500 hover:bg-custom-600 dark:hover:bg-dark-custom-600 text-white font-bold py-2 px-4 border border-custom-500 dark:border-dark-custom-500 rounded-xl">
                            Criar Precificação
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
