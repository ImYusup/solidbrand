// src/components/CheckoutForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import PaypalButton from "@/components/PaypalButton";

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
  | "card"
  | "crypto";

type OrderItem = {
  productId: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  weight: number;
};

type OrderData = {
  order_id: string;
  items: OrderItem[];
  subtotal: number;
};

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [orderError, setOrderError] = useState("");

  // Billing
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
  const [weight, setWeight] = useState(0);
  const [notes, setNotes] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Shipping & Payment
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [shippingCosts, setShippingCosts] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isManualShipping, setIsManualShipping] = useState(false);

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
    // { id: "qris", title: "QRIS", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/qris.png"], desc: "Scan QRIS: DANA, GoPay, ShopeePay, dll." },
    // { id: "bca_va", title: "BCA Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/bca_va.png"], desc: "Bayar via ATM/mBanking BCA." },
    // { id: "bri_va", title: "BRI Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/bri_va.png"], desc: "Transfer ke BRI VA." },
    // { id: "mandiri_va", title: "Mandiri Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/echannel.png"], desc: "Gunakan VA Mandiri." },
    // { id: "bni_va", title: "BNI Virtual Account", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/bni_va.png"], desc: "Bayar via BNI." },
    { id: "crypto", title: "Cryptocurrency USDT (TRC20)", icons: ["/icons/usdt.svg"], desc: "TFmZHeEjR9P2jjCp1NhKzXLicwdrAXfCFN" },
    { id: "card", title: "Credit/Debit Card", icons: ["https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/cc_visa.png", "https://wellborncompany.com/wp-content/plugins/midtrans-woocommerce/public/images/payment-methods/cc_master.png"], desc: "VISA, MasterCard, JCB, Amex." },
  ];

  // Fetch provinces
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
      if (!res.ok) throw new Error("Failed to load cities");
      const data = await res.json();
      if (data.success && Array.isArray(data.cities)) {
        setCities(data.cities);
      } else {
        setCities([]);
      }
    } catch (e) {
      console.error(e);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const getShippingCosts = async () => {
    if (!cityId || !weight) return;
    setLoading(true);

    try {
      // 👉 Konversi ke kg dan bulatkan ke atas
      const weightForShipping = Math.ceil(weight / 1000) * 1000; // JNE pakai gram, tapi dibulatkan 1kg, 2kg, dst

      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: 23,
          destination: cityId,
          weight: weightForShipping,  // 💥 PENTING
        }),
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
        setIsManualShipping(false);
        if (filtered.length > 0) {
          setSelectedShipping(`JNE-${filtered[0].service}`);
        }
      } else {
        setShippingCosts([]);
        setIsManualShipping(true); // AKTIFKAN SHIPPING MANUAL
        setSelectedShipping("Manual"); // Set shipping ke manual
      }
    } catch (e) {
      console.error(e);
      setShippingCosts([]);
      setIsManualShipping(true);     // fallback manual shipping
      setSelectedShipping("Manual");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityId && weight) getShippingCosts();
  }, [cityId, weight]);

  // 🔥 AUTO HITUNG BERAT SETIAP orderItems BERUBAH
  useEffect(() => {
    if (orderItems.length > 0) {
      const totalWeight = orderItems.reduce(
        (sum, item) => sum + item.quantity * (item.weight || 0),
        0
      );
      setWeight(totalWeight);
    }
  }, [orderItems]);


  useEffect(() => {
    if (!orderId) {
      setOrderError("Tidak ada Order ID.");
      setLoadingOrder(false);
      return;
    }

    const saved = localStorage.getItem(`order_${orderId}`);

    if (!saved) {
      setOrderError("Order tidak ditemukan. Silakan checkout ulang dari keranjang.");
      setLoadingOrder(false);
      return;
    }

    try {
      const data: OrderData = JSON.parse(saved);

      if (!data?.items || data.items.length === 0) {
        setOrderError("Keranjang kosong. Silakan tambah produk lagi.");
        setLoadingOrder(false);
        return;
      }

      // LANGSUNG PAKAI — KARENA KITA SUDAH BERSIHIN ORDER LAMA DI CARTSIDEBAR
      setOrderItems(data.items);
    } catch (err) {
      console.error("Parse order failed:", err);
      setOrderError("Data order rusak. Silakan checkout ulang.");
    } finally {
      setLoadingOrder(false);
    }
  }, [orderId]);

  // Jika mode manual shipping aktif -> shippingCost = 0
  const shippingCost = isManualShipping
    ? 0
    : shippingCosts.find(c => `JNE-${c.service}` === selectedShipping)?.cost || 0;

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  // ==== VALIDATION ====
  const isFormValid =
    email.includes("@") &&
    firstName.trim() &&
    lastName.trim() &&
    street.trim() &&
    phone.trim() &&
    provinceId !== 0 &&
    agreeTerms &&
    total > 0 &&
    orderItems.length > 0 &&
    (
      // Jika lokal Indonesia → wajib cityId & postalCode
      (provinceId !== -1 && cityId > 0 && postalCode.trim())

      // Jika International / Manual shipping → tidak wajib cityId & postalCode
      || (provinceId === -1 && isManualShipping)
    );

  // const showPaypal = selectedPayment === "card" && isFormValid;
  const [paypalPaid, setPaypalPaid] = useState(false);
  const [paypalOrder, setPaypalOrder] = useState(null);

  const handlePaypalPaid = (order: any) => {
    setPaypalPaid(true);
    setPaypalOrder(order);
  };

  useEffect(() => {
    setEmailError(email.includes("@") || email === "" ? "" : "Email harus mengandung @");
  }, [email]);

  const isButtonDisabled =
    !selectedPayment ||
    (!selectedShipping && !isManualShipping) ||
    (!isManualShipping && shippingCosts.length === 0) ||
    emailError !== "" ||
    !email.includes("@") ||
    !firstName ||
    !lastName ||
    !street ||
    !postalCode ||
    !phone ||
    !provinceId ||
    !cityId ||
    !agreeTerms ||
    orderItems.length === 0;

  // Clear Cart
  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(() => {
      const saved = localStorage.getItem(`order_${orderId}`);
      if (!saved || !JSON.parse(saved)?.items?.length) {
        setOrderItems([]);
        setOrderError("Your cart has been emptied.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [orderId]);

  const handlePlaceOrder = () => {
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
      items: orderItems,
      subtotal,
      shipping: isManualShipping
        ? { method: "Manual", cost: 0 }
        : { method: selectedShipping, cost: shippingCost },
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

  if (loadingOrder) return <div className="text-center py-10">Loading order...</div>;
  if (orderError) return <div className="text-center py-10 text-red-600">{orderError}</div>;

  const handleCopyAddress = async () => {
    const address = "TFmZHeEjR9P2jjCp1NhKzXLicwdrAXfCFN";

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        return;
      } catch (err) {
        console.warn("Clipboard API failed:", err);
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = address;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    try {
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      const success = document.execCommand("copy");
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } else {
        throw new Error();
      }
    } catch {
      alert(`Silakan copy manual:\n\n${address}`);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const orderDataObject = {
    orderId,
    date: new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    items: orderItems,
    subtotal,
    shipping: { method: selectedShipping, cost: shippingCost },
    total,
    payment: selectedPayment,
    billing: {
      email,
      firstName,
      lastName,
      company: company || "none",
      street,
      apartment: apartment || "",
      province: provinces.find((p) => p.id === provinceId)?.name || "",
      city: cities.find((c) => c.id === cityId)?.name || "",
      postalCode,
      phone,
    },
    notes,
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
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company name (optional)</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="none" className="w-full px-4 py-2 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street address *</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="House number and street name" className="w-full px-4 py-2 border rounded-md mb-2" required />
              <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="Apartment, suite, unit, etc. (optional)" className="w-full px-4 py-2 border rounded-md" />
            </div>

            {/* === PROVINCE === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Province / Region *</label>
              <select
                value={provinceId}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setProvinceId(id);

                  if (id === -1) {
                    // OUTSIDE INDONESIA SELECTED
                    setIsManualShipping(true);
                    setCityId(0);
                    setPostalCode("");
                    setShippingCosts([]);
                  } else {
                    // LOCAL INDONESIA
                    setIsManualShipping(false);
                    loadCities(id);
                    setCityId(0);
                  }
                }}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value={0}>Select Province</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
                <option value={-1}>🌎 Other / Outside Indonesia</option>
              </select>
            </div>

            {/* === CITY === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <select
                value={cityId}
                onChange={(e) => setCityId(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md"
                disabled={!provinceId || provinceId === -1}
              >
                <option value={0}>Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              {provinceId === -1 && (
                <p className="text-sm text-blue-700 mt-1">
                  ✈️ International address detected. Shipping cost will be calculated manually by admin after payment.
                </p>
              )}
            </div>

            {/* === POSTAL CODE === */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                  disabled={provinceId === -1}
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

            <label className="block text-sm font-medium">Weight (grams)</label>
            <input
              type="number"
              value={weight}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
            <p className="text-sm text-gray-600 mt-1">
              Calculated as: <strong>{Math.ceil(weight / 1000)} kg</strong> (rounded up)
            </p>

            {loading && <p className="text-blue-600">Calculating JNE shipping cost...</p>}

            {shippingCosts.length > 0 && (
              <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Pilih Layanan JNE:</p>
                {shippingCosts.map((cost, i) => (
                  <label key={i} className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-blue-100">
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
                No JNE shipping service available for {weight / 1000}kg. Please contact admin.
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

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1" required />
              <span className="text-sm text-gray-700">
                I have read and agree to the website <a href="#" className="text-blue-600 underline">terms and conditions</a> *
              </span>
            </label>
          </form>
        </div>

        {/* RIGHT: YOUR ORDER */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">YOUR ORDER</h2>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            {/* GANTI BAGIAN INI DI CheckoutForm.tsx */}
            {orderItems.map((item, i) => {
              const product = products.find(p => p.id === item.productId);
              const variant = product?.variants?.find(v => v.id === item.variantId);

              return (
                <div key={i} className="flex justify-between border-b pb-2">
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    {variant?.color && (
                      <p className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                        Color: <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: variant.colorCode || "#ccc" }} /> {variant.color}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} × Rp {item.price.toLocaleString()}
                      {item.weight > 0 && ` • ${item.quantity * item.weight}g`}
                    </p>
                  </div>
                  <p className="font-medium">Rp {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              );
            })}

            <div className="text-sm text-gray-600 mt-3 pt-3 border-t">
              Total Weight: <strong>{weight} grams</strong> → rounded up to{" "}
              <strong>{Math.ceil(weight / 1000)} kg</strong> for shipping calculation
            </div>

            {/* Ongkir / Cost Shipping */}
            {isManualShipping ? (
              <div className="flex justify-between border-b pb-2 text-sm text-yellow-800">
                <span>Shipping</span>
                <span>To be calculated after payment</span>
              </div>
            ) : (
              shippingCost > 0 && (
                <div className="flex justify-between border-b pb-2">
                  <span>Ongkir ({selectedShipping})</span>
                  <span className="font-medium">Rp {shippingCost.toLocaleString()}</span>
                </div>
              )
            )}

            <div className="flex justify-between text-lg font-bold pt-2">
              <span>TOTAL</span>
              <span className="text-blue-600">Rp {total.toLocaleString()}</span>
            </div>

            <div className="space-y-3 mt-6">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${selectedPayment === method.id ? "border-black bg-gray-100" : "border-gray-300"}`}
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

                    {selectedPayment === method.id && method.id !== "crypto" && method.id !== "card" && (
                      <p className="mt-2 text-sm text-gray-600">{method.desc}</p>
                    )}

                    {/* USDT CRYPTO SECTION - FULL FIXED */}
                    {selectedPayment === method.id && method.id === "crypto" && (
                      <div className="mt-3 space-y-3 p-4 bg-gray-100 border rounded-lg">
                        {/* TITLE */}
                        <p className="font-semibold text-gray-800">USDT (TRC20) Wallet Address</p>

                        {/* QR CODE */}
                        <div className="flex justify-center">
                          <img
                            src="/payment/usdt-trc20.png"
                            alt="USDT TRC20 QR Code"
                            className="w-44 h-44 object-contain bg-white border rounded-lg p-2 shadow-sm"
                            title="Scan QR to send USDT"
                          />
                        </div>

                        {/* WALLET + COPY */}
                        <div className="flex items-center justify-between bg-white p-3 rounded-md border font-mono text-sm">
                          <span className="flex-1 break-all select-all pr-2 text-gray-800" title="Click to select">
                            TFmZHeEjR9P2jjCp1NhKzXLicwdrAXfCFN
                          </span>
                          <button
                            onClick={handleCopyAddress}
                            className={`px-3 py-1 text-xs rounded font-medium transition-all duration-200 ${copied
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-blue-600 hover:bg-blue-700"
                              } text-white shadow-sm`}
                            title="Copy to clipboard"
                          >
                            {copied ? "✓ Copied!" : "Copy"}
                          </button>
                        </div>

                        {/* WARNING */}
                        <div className="bg-red-50 border border-red-200 rounded p-2">
                          <p className="text-xs text-red-700">
                            <strong>⚠️ WARNING:</strong> Only send on <b>TRC20 network (USDT)</b>. Wrong network = funds lost forever.
                          </p>
                          <p className="text-xs text-red-700 mt-1">
                            Exact amount: <strong>Rp {total.toLocaleString()}</strong> ≈ <strong>${(total / 16000).toFixed(2)} USDT</strong>
                          </p>
                        </div>

                        {/* INSTRUCTIONS */}
                        <div className="text-xs text-gray-600 space-y-1">
                          <p><strong>Steps:</strong></p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Copy wallet address or scan QR code</li>
                            <li>Open your TRC20 wallet (Trust Wallet, Binance, etc.)</li>
                            <li>Send exact amount: Rp {total.toLocaleString()}</li>
                            <li>Include Order ID: <strong>{orderId}</strong> in memo</li>
                            <li>Confirmation will be processed within 30 minutes</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {/* PAYPAL SECTION - HANYA TAMPILKAN BUTTON */}
                    {method.id === "card" && selectedPayment === "card" && (
                      <div className="mt-4 p-4 bg-white border rounded-lg shadow-sm">
                        {isFormValid ? (
                          paypalPaid ? (
                            <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 font-medium text-center">
                              Payment successful! You can now confirm your order below.
                            </div>
                          ) : (
                            <PaypalButton
                              amount={total}
                              orderData={orderDataObject}
                              onPaid={(order) => {
                                setPaypalPaid(true);
                                setPaypalOrder(order);
                              }}
                            />
                          )
                        ) : (
                          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-800 text-sm">
                            Please complete all required fields and agree to the terms before paying.
                          </div>
                        )}
                      </div>
                    )}

                    {/* {method.id === "card" && selectedPayment === "card" && !isFormValid && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-400 rounded-lg text-sm">
                        Please complete all required information and check the "I agree to the terms and conditions" box before paying with a card.                      </div>
                    )} */}
                  </div>
                </label>
              ))}
            </div>

            {/* CONFIRM BUTTON - UNIVERSAL FOR ALL METHODS */}
            <button
              onClick={handlePlaceOrder}
              disabled={
                !isFormValid ||
                !selectedPayment ||
                (selectedPayment === "card" && !paypalPaid) ||
                loading
              }
              className={`w-full mt-8 py-5 rounded-lg font-bold text-white text-lg transition-all shadow-lg ${isFormValid && selectedPayment && (selectedPayment !== "card" || paypalPaid)
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed opacity-70"
                }`}
            >
              {selectedPayment === "card" && !paypalPaid ? (
                <span className="tracking-wider">
                  PLEASE COMPLETE PAYPAL PAYMENT ABOVE FIRST
                </span>
              ) : (
                <span className="tracking-wide">
                  CONFIRM ORDER - Rp {total.toLocaleString("id-ID")}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
