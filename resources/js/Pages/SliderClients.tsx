import React from 'react';
import './ClientSlider.css'; // Importa o CSS personalizado

const clientLogos = [
    '/images/logos_clients/1.jpg',
    '/images/logos_clients/2.jpg',
    '/images/logos_clients/3.jpg',
    '/images/logos_clients/4.jpg',
    '/images/logos_clients/5.jpg',
    '/images/logos_clients/6.jpg'
];

const ClientSlider: React.FC = () => {
    const extendedClientLogos = [...clientLogos, ...clientLogos]; // Duplicar a lista de imagens para criar um loop contínuo

    return (
        <div className="container px-4 md:px-6">
            <div className="text-center space-y-6 mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-custom-700 dark:text-dark-custom-200">
                    <b>
                        O favorito de diversos usuários em todo o Brasil.
                    </b>
                </h1>
            </div>
            <div className="slider-wrapper">
                <div className="slider-inner">
                    {extendedClientLogos.map((logo, index) => (
                        <div key={index} className="slider-item">
                            <img
                                width="200"
                                height="100"
                                src={logo}
                                alt={`Logo ${index + 1}`}
                                className="rounded-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientSlider;
