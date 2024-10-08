import { useState, PropsWithChildren, ReactNode } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="bg-custom-50 dark:bg-dark-custom-800">
            <nav className="bg-custom-100 dark:bg-dark-custom-700 border-b border-custom-200 dark:border-dark-custom-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('dashboard')}>
                                    <img
                                        src="/images/logo_simples.png"
                                        width="150"
                                        height="40"
                                        alt="cake-shop"
                                        className="mt-3 mx-auto object-cover"
                                    />
                                     {/* <img
                                        src="/images/icon_logo.png"
                                        width="80"
                                        height="40"
                                        alt="cake-shop"
                                        className="mx-auto object-cover"
                                    /> */}
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                                    Precificação
                                </NavLink>
                            </div>
                            {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('pricing-history')} active={route().current('pricing-history')} className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                                    Histórico
                                </NavLink>
                            </div> */}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-custom-300 dark:border-dark-custom-300 text-sm leading-4 font-medium rounded-md text-custom-500 dark:text-dark-custom-200 bg-custom-50 dark:bg-dark-custom-800 hover:text-custom-800 dark:hover:text-dark-custom-100 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')} className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                                            Sair
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-custom-500 dark:text-dark-custom-200 hover:text-custom-800 dark:hover:text-dark-custom-100 hover:bg-custom-100 dark:hover:bg-dark-custom-700 focus:outline-none focus:bg-custom-100 dark:focus:bg-dark-custom-700 focus:text-custom-800 dark:focus:text-dark-custom-100 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')} className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-custom-200 dark:border-dark-custom-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-custom-600 dark:text-dark-custom-300">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-custom-500 dark:text-dark-custom-200">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-custom-600 dark:text-dark-custom-300 hover:text-custom-800 dark:hover:text-dark-custom-100">
                                Sair
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-custom-100 dark:bg-dark-custom-700 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
