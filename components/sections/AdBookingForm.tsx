"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { adPackages, formatNaira, PAYSTACK_PUBLIC_KEY } from "@/lib/paystack";
import { CheckCircle2, ChevronRight, ChevronLeft, CreditCard, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// VALIDATION HELPERS
// ============================================================
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidName   = (v: string) => v.trim().length >= 2 && v.trim().length <= 100;
const isValidBiz    = (v: string) => v.trim().length >= 2 && v.trim().length <= 200;

type FieldErrors = { name?: string; email?: string; businessName?: string };

function validateStep2(data: { name: string; email: string; businessName: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!isValidName(data.name))    errors.name         = 'Please enter a valid name (2-100 characters).';
  if (!isValidEmail(data.email))  errors.email        = 'Please enter a valid email address.';
  if (!isValidBiz(data.businessName)) errors.businessName = 'Please enter a valid business name.';
  return errors;
}

// ============================================================
// COMPONENT
// ============================================================
export default function AdBookingForm() {
  const [step, setStep]           = useState(1);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    packageId: 'bronze',
  });

  const selectedPackage = adPackages.find((p) => p.id === formData.packageId)!;

  const config = {
    // Unique reference using crypto.randomUUID for collision safety
    reference:  typeof crypto !== 'undefined' ? crypto.randomUUID() : Date.now().toString(),
    email:      formData.email.trim(),
    amount:     selectedPackage.price * 100, // kobo
    publicKey:  PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        { display_name: 'Business Name', variable_name: 'business_name', value: formData.businessName.trim() },
        { display_name: 'Package',       variable_name: 'package',       value: selectedPackage.name },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  // Called ONLY after Paystack confirms payment on the client side.
  // We ALSO verify server-side to prevent spoofing.
  const onSuccess = async (reference: { reference: string }) => {
    setIsVerifying(true);
    setServerError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:               formData.name.trim(),
          email:              formData.email.trim(),
          businessName:       formData.businessName.trim(),
          packageId:          formData.packageId,
          paystackReference:  reference.reference,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error ?? 'Verification failed. Please contact support.');
        return;
      }

      setStep(4); // success
    } catch {
      setServerError('Network error during verification. Please contact support with your payment reference.');
    } finally {
      setIsVerifying(false);
    }
  };

  const onClose = () => {
    // Payment modal closed — no action needed
  };

  const handleNext = () => {
    if (step === 2) {
      const errors = validateStep2(formData);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear per-field error on edit
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="bg-orisun-deep border border-orisun-gold/20 p-8 md:p-12 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className={cn('w-full h-1 transition-all duration-500', step >= s ? 'bg-orisun-gold' : 'bg-orisun-gold/10')} />
        ))}
      </div>

      {/* STEP 1 — Package Selection */}
      {step === 1 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Choose Your Reach</h3>
          <div className="grid grid-cols-1 gap-4">
            {adPackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setField('packageId', pkg.id)}
                className={cn(
                  'flex items-center justify-between p-6 border transition-all',
                  formData.packageId === pkg.id
                    ? 'bg-orisun-gold border-orisun-gold text-orisun-deep'
                    : 'bg-orisun-gold/5 border-orisun-gold/20 text-orisun-ivory hover:border-orisun-gold/60',
                )}
              >
                <div className="text-left">
                  <p className="font-unbounded text-xs uppercase tracking-widest font-bold">{pkg.name}</p>
                  <p className="text-2xl font-fraunces mt-1 italic">{formatNaira(pkg.price)}</p>
                </div>
                {formData.packageId === pkg.id && <CheckCircle2 size={24} />}
              </button>
            ))}
          </div>
          <button onClick={handleNext} className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest flex items-center justify-center gap-2">
            NEXT STEP <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 2 — Business Details */}
      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Business Details</h3>
          <div className="space-y-6">
            {(['name', 'email', 'businessName'] as const).map((field) => (
              <div key={field} className="space-y-1">
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Business Name'}
                  autoComplete={field === 'email' ? 'email' : 'off'}
                  maxLength={field === 'businessName' ? 200 : 100}
                  className={cn(
                    'w-full bg-transparent border-b py-4 outline-none text-orisun-ivory font-dm-sans',
                    fieldErrors[field] ? 'border-red-500' : 'border-orisun-gold/40 focus:border-orisun-gold',
                  )}
                  value={formData[field]}
                  onChange={(e) => setField(field, e.target.value)}
                />
                {fieldErrors[field] && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {fieldErrors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={handleBack} className="p-4 border border-orisun-gold/40 text-orisun-gold"><ChevronLeft size={20} /></button>
            <button onClick={handleNext} className="flex-1 py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest">
              REVIEW & PAY
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Confirm & Pay */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Confirm Booking</h3>
          <div className="bg-orisun-gold/5 p-8 border border-orisun-gold/20 space-y-4">
            <div className="flex justify-between">
              <span className="text-orisun-ivory/60 font-dm-sans">Package:</span>
              <span className="text-orisun-gold font-unbounded text-xs">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orisun-ivory/60 font-dm-sans">Business:</span>
              <span className="text-orisun-ivory font-dm-sans">{formData.businessName.trim()}</span>
            </div>
            <div className="pt-4 border-t border-orisun-gold/10 flex justify-between items-end">
              <span className="text-orisun-ivory font-fraunces text-xl">Total Due:</span>
              <span className="text-orisun-gold font-fraunces text-3xl italic">{formatNaira(selectedPackage.price)}</span>
            </div>
          </div>

          {serverError && (
            <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/50 rounded">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-red-300 text-sm font-dm-sans">{serverError}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button onClick={handleBack} className="p-4 border border-orisun-gold/40 text-orisun-gold"><ChevronLeft size={20} /></button>
            <button
              disabled={isVerifying}
              onClick={() => initializePayment({ onSuccess, onClose })}
              className="flex-1 py-4 bg-orisun-crimson text-white font-unbounded font-bold text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <CreditCard size={16} />
              {isVerifying ? 'VERIFYING...' : 'SECURE PAYMENT'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Success */}
      {step === 4 && (
        <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-orisun-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-orisun-deep" />
          </div>
          <h3 className="text-4xl font-fraunces text-orisun-ivory italic">Booking Confirmed!</h3>
          <p className="text-orisun-ivory/60 font-dm-sans max-w-sm mx-auto">
            E kaasan! Our advertising team will contact you within 24 hours to finalise your creative material and schedule.
          </p>
          <button onClick={() => { setStep(1); setServerError(null); }} className="px-8 py-3 border border-orisun-gold text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">
            BOOK ANOTHER
          </button>
        </div>
      )}
    </div>
  );
}
