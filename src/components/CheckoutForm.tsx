// src/components/CheckoutForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, Product } from "@/data/products";

type PaymentMethod =
  | "bca_manual"
  | "bri_manual"
  | "mandiri_manual"
  | "seabank_manual"
  | "qris"
  | "bca_va"
  | "bri_va"
  | "mandiri_va"
  | "bni_va"
  | "bank_other"
  | "card"
  | "crypto";

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("product");

  const product: Product | undefined = products.find(p => p.id === productId);
  const selectedProduct = product || products[0];
  const productPrice = selectedProduct.discountPrice || selectedProduct.price;
  const productName = selectedProduct.name;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [provinceId, setProvinceId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState(1000);
  const [notes, setNotes] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [shippingCosts, setShippingCosts] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const bankInfo: Record<string, { bank: string; account: string; name: string }> = {
    bca_manual: { bank: "BCA", account: "7390 7480 13", name: "Yusup Juniadi" },
    bri_manual: { bank: "BRI", account: "7463 0100 7264 505", name: "Yusup Juniadi" },
    mandiri_manual: { bank: "Mandiri", account: "1560016268064", name: "Yusup Juniadi" },
    seabank_manual: { bank: "Sea Bank", account: "9013 5607 9886", name: "Yusup Juniadi" },
  };

  const paymentMethods: { id: PaymentMethod; title: string; icons: string[]; desc: string }[] = [
    { id: "bca_manual", title: "Manual Transfer BCA", icons: ["https://wellborncompany.com/wp-content/plugins/wc-bank-indonesia/img/bca.png"], desc: "Bayar ke rekening BCA kami. Gunakan ID Pesanan sebagai referensi." },
    { id: "bri_manual", title: "Manual Transfer BRI", icons: ["https://wellborncompany.com/wp-content/plugins/wc-bank-indonesia/img/bri.png"], desc: "Transfer ke BRI. Kami cek manual." },
    { id: "mandiri_manual", title: "Manual Transfer Mandiri", icons: ["https://wellborncompany.com/wp-content/plugins/wc-bank-indonesia/img/mandiri.png"], desc: "Bayar ke Mandiri. Sertakan ID Pesanan." },
    { id: "seabank_manual", title: "Manual Transfer Seabank", icons: ["/icons/seabank.svg"], desc: "Transfer via Seabank. Konfirmasi otomatis." },
    { id: "qris", title: "QRIS", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/qris.png"], desc: "Scan QRIS: DANA, GoPay, ShopeePay, dll." },
    { id: "bca_va", title: "BCA Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/bca_va.png"], desc: "Bayar via ATM/mBanking BCA." },
    { id: "bri_va", title: "BRI Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/bri_va.png"], desc: "Transfer ke BRI VA." },
    { id: "mandiri_va", title: "Mandiri Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/echannel.png"], desc: "Gunakan VA Mandiri." },
    { id: "bni_va", title: "BNI Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/bni_va.png"], desc: "Bayar via BNI." },
    { id: "bank_other", title: "Bank Transfer - Other", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/other_va_1.png"], desc: "Permata, CIMB, dll." },
    { id: "card", title: "Credit/Debit Card", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/cc_visa.png", "https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/cc_master.png"], desc: "VISA, MasterCard, JCB, Amex." },
    { id: "crypto", title: "Cryptocurrency USDT/BTC/ETH/BNB/SOL", icons: ["/icons/usdt.svg"], desc: "Bayar dengan USDT, BTC, ETH." },
  ];

  useEffect(() => {
    fetch("/api/shipping/province")
      .then(r => r.json())
      .then(d => {
        if (d.success) setProvinces(d.provinces);
      });
  }, []);

  const loadCities = async (provinceId: number) => {
    if (!provinceId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/shipping/city/${provinceId}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("HTTP Error:", res.status, text);
        setCities([]);
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.cities)) {
        setCities(data.cities);
      } else {
        setCities([]);
      }
    } catch (e: any) {
      console.error("Fetch Error:", e.message);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const getShippingCosts = async () => {
    if (!cityId || !weight) return;
    setLoading(true);
    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin: 23, destination: cityId, weight }),
      });
      const data = await res.json();
      if (data.success && data.costs.length > 0) {
        let filtered = data.costs;

        if (weight < 10000) {
          filtered = filtered.filter((c: any) => c.service === "REG");
        } else if (weight < 100000) {
          filtered = filtered.filter((c: any) => c.service.includes("JTR") && !c.service.includes("130"));
        } else if (weight <= 130000) {
          filtered = filtered.filter((c: any) => c.service.includes("JTR<130"));
        } else {
          setShippingCosts([]);
          setLoading(false);
          return;
        }

        setShippingCosts(filtered);
        if (filtered.length > 0) {
          setSelectedShipping(`JNE-${filtered[0].service}`);
        }
      } else {
        setShippingCosts([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityId && weight) getShippingCosts();
  }, [cityId, weight]);

  const shippingCost = shippingCosts.find(c => `JNE-${c.service}` === selectedShipping)?.cost || 0;
  const total = productPrice + shippingCost;

  useEffect(() => {
    setEmailError(email.includes("@") || email === "" ? "" : "Email harus mengandung @");
  }, [email]);

  const isButtonDisabled =
    !selectedPayment ||
    !selectedShipping ||
    total === productPrice ||
    emailError !== "" ||
    shippingCosts.length === 0 ||
    !email.includes("@") ||
    !firstName ||
    !lastName ||
    !street ||
    !postalCode ||
    !phone ||
    !provinceId ||
    !cityId ||
    !agreeTerms;

  const handlePlaceOrder = () => {
    const orderData = {
      orderId: Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
      product: selectedProduct,
      price: productPrice,
      shipping: { method: selectedShipping, cost: shippingCost },
      total,
      payment: selectedPayment,
      bank: bankInfo[selectedPayment as string] || null,
      billing: {
        email,
        firstName,
        lastName,
        company: company || "none",
        street,
        apartment: apartment || "",
        province: provinces.find(p => p.id === provinceId)?.name || "",
        city: cities.find(c => c.id === cityId)?.name || "",
        postalCode,
        phone,
      },
      notes,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    router.push("/order-complete");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT: BILLING */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">BILLING DETAILS</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${emailError ? "border-red-500" : ""}`}
                required
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            {/* NAMA */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company name (optional)</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="none"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street address *</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="House number and street name"
                className="w-full px-4 py-2 border rounded-md mb-2"
                required
              />
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label>
              <select
                value={provinceId}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setProvinceId(id);
                  loadCities(id);
                  setCityId(0);
                }}
                className="w-full px-4 py-2 border rounded-md max-h-48 overflow-y-auto"
              >
                <option value={0}>Pilih Provinsi</option>
                {provinces.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten *</label>
              <select
                value={cityId}
                onChange={(e) => setCityId(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md max-h-48 overflow-y-auto"
                disabled={!provinceId}
              >
                <option value={0}>Pilih Kota</option>
                {cities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos *</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Berat (gram)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
                className="w-full px-4 py-2 border rounded-md"
                min="1"
              />
            </div>

            {loading && <p className="text-blue-600">Menghitung ongkir JNE...</p>}
            {shippingCosts.length > 0 && (
              <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Pilih Layanan JNE:</p>
                {shippingCosts.map((cost, i) => (
                  <label
                    key={i}
                    className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-blue-100"
                  >
                    <div>
                      <strong>JNE {cost.service}</strong> - {cost.description}
                      <p className="text-xs text-gray-600">{cost.etd} hari</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Rp {cost.cost.toLocaleString()}</p>
                      <input
                        type="radio"
                        name="shipping"
                        value={`JNE-${cost.service}`}
                        checked={selectedShipping === `JNE-${cost.service}`}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                      />
                    </div>
                  </label>
                ))}
              </div>
            )}
            {shippingCosts.length === 0 && cityId > 0 && weight > 0 && (
              <p className="text-red-600 p-4 bg-red-50 rounded-lg">
                Tidak ada layanan JNE untuk berat {weight / 1000}kg. Hubungi admin.
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="w-full px-4 py-2 border rounded-md"
                rows={3}
              />
            </div>

            {/* FIXED: required only */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1"
                required
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the website <a href="#" className="text-blue-600 underline">terms and conditions</a> *
              </span>
            </label>
          </form>
        </div>

        {/* RIGHT: ORDER */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">YOUR ORDER</h2>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>{productName}</span>
              <span className="font-medium">
                {selectedProduct.discountPrice ? (
                  <>
                    <span className="line-through text-gray-500">Rp {selectedProduct.price.toLocaleString()}</span>{" "}
                    <span className="text-green-600 font-bold">Rp {productPrice.toLocaleString()}</span>
                  </>
                ) : (
                  `Rp ${productPrice.toLocaleString()}`
                )}
              </span>
            </div>
            {shippingCost > 0 && (
              <div className="flex justify-between border-b pb-2">
                <span>Ongkir ({selectedShipping})</span>
                <span className="font-medium">Rp {shippingCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>TOTAL</span>
              <span className="text-blue-600">Rp {total.toLocaleString()}</span>
            </div>

            <div className="space-y-3 mt-6">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${selectedPayment === method.id ? "border-black bg-gray-100" : "border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{method.title}</span>
                      {method.icons.map((icon, i) => (
                        <img key={i} src={icon} alt="" className="h-6 object-contain" />
                      ))}
                    </div>
                    {selectedPayment === method.id && (
                      <p className="mt-2 text-sm text-gray-600">{method.desc}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isButtonDisabled}
              className={`w-full mt-6 py-4 rounded-lg font-bold text-white transition-all ${!isButtonDisabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              KONFIRMASI PEMBAYARAN - Rp {total.toLocaleString()}
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}