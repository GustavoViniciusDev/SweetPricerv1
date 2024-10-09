import { FaWhatsapp } from "react-icons/fa";

const WhatsappIcon = () => {
    const handleWhatsappClick = () => {
        const message = "Olá! Preciso de ajuda.";
        const phoneNumber = "5541998258351";
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
    return (
        <div>
            <div
                className="fixed bottom-20 right-5 bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl cursor-pointer shadow-lg hover:bg-green-700 transition"
                onClick={handleWhatsappClick}
            >
                <FaWhatsapp />
            </div>
        </div>
    );
};

export default WhatsappIcon;
