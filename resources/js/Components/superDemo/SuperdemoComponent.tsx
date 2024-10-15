// components/SuperDemo.js
import React from 'react';

const SuperDemo = () => {
    return (
        <>
            <div className="text-center space-y-6 mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-custom-700 dark:text-dark-custom-200">
                    <b>
                        Demonstração Prática: Calculando o Preço
                    </b>
                </h1>
            </div>
            <div
                style={{
                    position: 'relative',
                    boxSizing: 'content-box',
                    maxHeight: '80vh',
                    width: '100%',
                    aspectRatio: '2.208588957055215',
                    padding: '40px 0'
                }}
            >
                <iframe
                    src="https://app.supademo.com/embed/cm2awy9fr155cvm5six8u499n?embed_v=2"
                    loading="lazy"
                    title="Com Demo"
                    allow="clipboard-write"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                />


            </div>
        </>
    );
};

export default SuperDemo;
