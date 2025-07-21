"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function OrderForm() {
  const [orders, setOrders] = useState([{ name: "", artwork: "" }]);

  const handleChange = (index, field, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index][field] = value;
    setOrders(updatedOrders);
  };

  const addRow = () => {
    setOrders([...orders, { name: "", artwork: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("الطلبات:", orders);
    alert("تم إرسال الطلب بنجاح!");
  };

  return (
    <>
      <Head>
        <title>طلب لوحة</title>
        <meta name="description" content="نموذج طلب لوحة فنية" />
      </Head>

      <div className="max-w-2xl mx-auto mt-28 px-4 text-center font-sans rtl">
        <h2 className="text-2xl font-bold mb-6">نموذج طلب لوحة فنية</h2>

        <Link href="/products" className="text-blue-600 hover:underline mb-6 block">
          ← العودة للصفحة الرئيسية
        </Link>

        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100 text-right">
                <th className="border p-2">اسم الزبون</th>
                <th className="border p-2">اسم اللوحة</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={order.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      required
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={order.artwork}
                      onChange={(e) => handleChange(index, "artwork", e.target.value)}
                      required
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        
          <br />

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
          >
            إرسال الطلب
          </button>
        </form>
      </div>
    </>
  );
}
