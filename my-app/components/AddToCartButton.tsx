// components/AddToCartButton.tsx
import { useState } from "react";

interface AddToCartButtonProps {
  productName: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productName }) => {
  const [isNotified, setIsNotified] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleAddToCart = () => {
    setNotificationMessage(`"${productName}" добавлен в корзину`);
    setIsNotified(true);

    // Скрыть уведомление через 3 секунды
    setTimeout(() => {
      setIsNotified(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Иконка корзины (замените на вашу иконку) */}
      <div className="flex items-center">
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
            />
          </svg>
        </button>
      </div>

      {/* Уведомление */}
      {isNotified && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-green-500 text-white rounded-lg shadow-lg transition-opacity"
          style={{ opacity: isNotified ? 1 : 0 }}
        >
          {notificationMessage}
          <button
            onClick={() => setIsNotified(false)}
            className="float-right text-white hover:underline"
          >
            ×
          </button>
        </div>
      )}

      {/* Кнопка "В корзину" */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        В корзину
      </button>
    </div>
  );
};

export default AddToCartButton;
