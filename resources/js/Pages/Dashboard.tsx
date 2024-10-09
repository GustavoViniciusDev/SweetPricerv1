import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import NewPricing from "./Pricing/NewPricing";
import ListPricings from "./Pricing/ListPricings";
import HelpMeIcon from '@/Components/HelpMe/PopUpHelpMe';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhatsappIcon from '@/Components/whatsappIcon/PopUpWhatsapp';

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
        >
            <Head title="Dashboard" />

            <ToastContainer />

            <div className="p-6">
                <NewPricing />
            </div>

            <div className="mt-5">
                <ListPricings list_pricings={list_pricings} />
            </div>
            <WhatsappIcon />
            <HelpMeIcon />
        </AuthenticatedLayout>
    );
}
