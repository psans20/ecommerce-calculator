"use client";
import { useState } from 'react';

const currencyCodes: { [key: string]: string } = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'en-EU',
  // Add more currency codes as needed
};

export default function Home() {
  const [productCost, setProductCost] = useState<number>(0.0); // Update initial value
  const [sellPrice, setSellPrice] = useState<number>(0.0); // Update initial value
  const [quantity, setQuantity] = useState<number>(0.0); // Update initial value
  const [currency, setCurrency] = useState<string>('USD');
  const [cardVisible, setCardVisible] = useState<boolean>(false);

  const handleCheck = () => {
    const profit = sellPrice - productCost;
    const revenue = sellPrice * quantity - productCost * quantity;
    const total = productCost + sellPrice * quantity;

    const formattedProfit = formatCurrency(profit);
    const formattedRevenue = formatCurrency(revenue);
    const formatTotal = formatCurrency(total);

    setResult({
      profit: formattedProfit,
      revenue: formattedRevenue,
      total: formatTotal,
    });

    setCardVisible(true);
  };

  const formatCurrency = (value: number): string => {
    const languageCode = currencyCodes[currency] || 'en-US';
    return new Intl.NumberFormat(languageCode, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const [result, setResult] = useState<{ profit: string; revenue: string; total: string }>({
    profit: '',
    revenue: '',
    total: '',
  });

  return (
    <div className="flex flex-col h-screen space-y-4 justify-center items-center bg-gray-100">
      <div>
        <label htmlFor="productCost" className="block text-gray-700 font-semibold">
          Product Cost
        </label>
        <input
    type="number"
    step="0.01"
    id="productCost"
    name="productCost"
    value={productCost}
    onChange={(e) => setProductCost(parseFloat(e.target.value))}
    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
  />
</div>
<div>
  <label htmlFor="sellPrice" className="block text-gray-700 font-semibold">
    Sell Price
  </label>
  <input
    type="number"
    step="0.01"
    id="sellPrice"
    name="sellPrice"
    value={sellPrice}
    onChange={(e) => setSellPrice(parseFloat(e.target.value))}
    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
  />
</div>
<div>
  <label htmlFor="quantity" className="block text-gray-700 font-semibold">
    Quantity
  </label>
  <input
    type="number"
    step="0.01"
    id="quantity"
    name="quantity"
    value={quantity}
    onChange={(e) => setQuantity(parseFloat(e.target.value))}
    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
  />
      </div>
      <div>
        <label htmlFor="currency" className="block text-gray-700 font-semibold">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
        >
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
          {/* Add more currency options as needed */}
        </select>
      </div>
      <button
        type="button"
        onClick={handleCheck}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Check
      </button>
      <div className={`text-3xl font-mono font-bold space-y-2 bg-zinc-800 text-gray-100 shadow-md p-4 m-4 rounded-md text-center ${cardVisible ? 'block' : 'hidden'}`} id='card'>
        <h2>Profit Margin: <span className='text-emerald-500'>{result.profit}</span></h2>
        <h2>Total Profit: <span className='text-emerald-500'>{result.revenue}</span></h2>
        <h2>Revenue: <span className='text-emerald-500'>{result.total}</span></h2>
      </div>
    </div>
  );
}

