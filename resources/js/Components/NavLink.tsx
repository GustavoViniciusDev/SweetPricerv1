import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-custom-600 text-custom-700 focus:border-custom-700 '
                    : 'border-transparent text-custom-500 hover:text-custom-800 hover:border-custom-300 focus:text-custom-800 focus:border-custom-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
