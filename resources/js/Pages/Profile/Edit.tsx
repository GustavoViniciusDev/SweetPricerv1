    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
    import UpdatePasswordForm from './Partials/UpdatePasswordForm';
    import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
    import ChosePlan from './Partials/ChosePlan';
    import { Head } from '@inertiajs/react';


    interface Subscriptions {
        stripe_status: string;
        type: string;
        created_at: string;
        ends_at: string | null;
    }

    interface CustomPageProps {
        mustVerifyEmail: boolean,
        status?: string,
        subscription?: Subscriptions;
    }

    interface PageProps extends CustomPageProps {
        [key: string]: any;
    }


    export default function Edit({ auth, mustVerifyEmail, status, subscription }: PageProps) {
        return (
            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Profile" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-custom-50 dark:bg-dark-custom-50 shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-custom-50 dark:bg-dark-custom-50 shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="p-4 sm:p-8 bg-custom-50 dark:bg-dark-custom-50 shadow sm:rounded-lg">
                            <ChosePlan subscription={subscription} auth={auth} />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
