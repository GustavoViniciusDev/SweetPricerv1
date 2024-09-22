import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import NewPricing from "./Pricing/NewPricing";
import ListPricings from "./Pricing/ListPricings";

interface DashboardProps extends PageProps {
    list_pricings: {
        id: number;
        name_pricing: string;
        user_id: string;
        ingredients: {
            name: string;
            quantity: number;
            cost: number;
        }[];
    }[];
}

export default function Dashboard({ auth, list_pricings }: DashboardProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-custom-600 dark:text-dark-custom-300 leading-tight">Precificação</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-6">
                <NewPricing />
            </div>

            <div className="mt-5">
                <ListPricings list_pricings={list_pricings} />
            </div>
        </AuthenticatedLayout>
    );
}
