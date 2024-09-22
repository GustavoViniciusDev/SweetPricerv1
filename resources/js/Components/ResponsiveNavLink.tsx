import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${active
                    ? 'border-custom-600 text-custom-700 bg-custom-50 focus:text-custom-800 focus:bg-custom-100 focus:border-custom-700'
                    : 'border-transparent text-custom-500 hover:text-custom-800 hover:bg-custom-100 hover:border-custom-300 focus:text-custom-800 focus:bg-custom-100 focus:border-custom-300'
                } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>

    );
}
