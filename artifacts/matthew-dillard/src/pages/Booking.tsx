import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Layout from "@/components/Layout";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: "haircut", icon: "✂", name: "Haircut & Style", duration: "60 min", price: "From $65", desc: "Precision cut + blowout tailored to your face shape and lifestyle." },
  { id: "balayage", icon: "◈", name: "Balayage / Ombré", duration: "2.5–3 hrs", price: "From $175", desc: "Hand-painted sun-kissed color that grows out effortlessly." },
  { id: "color", icon: "❋", name: "Full Color", duration: "2 hrs", price: "From $145", desc: "All-over rich color from roots to ends with expert formulation." },
  { id: "highlights", icon: "✦", name: "Highlights", duration: "2.5 hrs", price: "From $155", desc: "Face-framing or full-head highlights for dimension and depth." },
  { id: "blonde", icon: "◯", name: "Blonde Specialist", duration: "3+ hrs", price: "From $185", desc: "Platinum to honey — every shade of blonde executed flawlessly." },
  { id: "keratin", icon: "❃", name: "Keratin Treatment", duration: "2.5 hrs", price: "From $225", desc: "Smooth, frizz-free results with bond-building precision that lasts months." },
  { id: "bridal", icon: "◇", name: "Bridal Styling", duration: "Varies", price: "From $250", desc: "Full trial + day-of styling. Bridal party packages available." },
  { id: "mens", icon: "◉", name: "Men's Cut & Style", duration: "45 min", price: "From $50", desc: "Classic and modern cuts with expert consultation and style." },
] as const;
type Service = typeof SERVICES[number];

const ALL_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const BOOKED_SLOTS: Record<string, string[]> = {
  "2026-05-19": ["9:00 AM", "11:00 AM", "4:00 PM"],
  "2026-05-20": ["10:00 AM", "2:00 PM", "3:00 PM"],
  "2026-05-22": ["9:00 AM", "10:00 AM", "1:00 PM", "5:00 PM"],
  "2026-05-23": ["11:00 AM", "12:00 PM", "4:00 PM"],
  "2026-05-24": ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"],
  "2026-05-26": ["3:00 PM", "4:00 PM", "5:00 PM"],
  "2026-05-28": ["9:00 AM", "10:00 AM"],
  "2026-05-30": ["2:00 PM", "5:00 PM"],
  "2026-05-31": ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"],
  "2026-06-07": ["9:00 AM", "2:00 PM", "3:00 PM"],
  "2026-06-14": ["10:00 AM", "11:00 AM", "4:00 PM"],
};

const TODAY = "2026-05-18";
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isDayAvailable(dateStr: string): boolean {
  const d = new Date(dateStr + "T12:00:00");
  if (d.getDay() === 0) return false;
  if (dateStr <= TODAY) return false;
  const booked = BOOKED_SLOTS[dateStr] ?? [];
  return booked.length < ALL_TIMES.length;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
const STEP_LABELS = ["Service", "Date & Time", "Your Info", "Confirmed"];
function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mt-8 mb-2">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: i <= step ? "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))" : "rgba(255,255,255,0.06)",
                border: i === step ? "2px solid rgba(201,168,76,0.8)" : i < step ? "2px solid transparent" : "2px solid rgba(255,255,255,0.1)",
                boxShadow: i <= step ? "0 0 16px rgba(201,168,76,0.35)" : "none",
              }}
            >
              {i < step ? (
                <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span style={{ fontSize: 11, fontWeight: 600, color: i <= step ? "#000" : "rgba(255,255,255,0.3)" }}>{i + 1}</span>
              )}
            </div>
            <span className="hidden sm:block transition-colors duration-300" style={{ fontSize: 8.5, letterSpacing: "0.25em", textTransform: "uppercase", color: i <= step ? "rgba(201,168,76,0.75)" : "rgba(255,255,255,0.2)" }}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className="w-12 md:w-20 h-px mx-2 mb-5 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.07)" }} />
              <motion.div
                className="absolute inset-y-0 left-0"
                animate={{ width: i < step ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), hsl(35,72%,42%))" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 0: Service Selection ─────────────────────────────────────────────────
function ServiceStep({ selected, onSelect, onNext }: { selected: Service | null; onSelect: (s: Service) => void; onNext: () => void }) {
  return (
    <div className="max-w-5xl mx-auto px-5 pb-16">
      <div className="text-center mb-10">
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>
          Choose the service you'd like to book. We'll find the perfect time for you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((svc, i) => {
          const isSelected = selected?.id === svc.id;
          return (
            <motion.button
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelect(svc)}
              className="relative text-left p-6 group cursor-pointer overflow-hidden transition-all duration-300 focus:outline-none"
              style={{
                background: isSelected
                  ? "linear-gradient(145deg, hsl(28,22%,12%), hsl(26,18%,10%))"
                  : "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                border: `1px solid ${isSelected ? "rgba(201,168,76,0.55)" : "rgba(201,168,76,0.09)"}`,
                boxShadow: isSelected ? "0 0 30px rgba(201,168,76,0.12), inset 0 0 20px rgba(201,168,76,0.04)" : "none",
              }}
            >
              {/* Hover/Selected glow */}
              <div className={`absolute inset-0 transition-opacity duration-400 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08), transparent 65%)" }}
                aria-hidden="true" />
              <div className={`absolute top-0 inset-x-0 h-px transition-transform duration-400 origin-left ${isSelected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
                aria-hidden="true" />
              {/* Selected checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))" }}
                  >
                    <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative z-10">
                <span className={`text-2xl mb-4 block transition-colors duration-300 ${isSelected ? "text-yellow-400/80" : "text-yellow-600/40 group-hover:text-yellow-400/65"}`}>{svc.icon}</span>
                <h3 className="font-serif font-semibold mb-1.5 transition-colors duration-300"
                  style={{ fontSize: 13.5, color: isSelected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)" }}>
                  {svc.name}
                </h3>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", lineHeight: 1.6, marginBottom: 12 }}>{svc.desc}</p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{svc.duration}</span>
                  <span className="font-semibold" style={{ fontSize: 11, color: "rgba(201,168,76,0.75)" }}>{svc.price}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: selected ? 1.03 : 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => selected && onNext()}
          className="relative overflow-hidden px-12 py-4 font-medium transition-all duration-300"
          style={{
            background: selected ? "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))" : "rgba(255,255,255,0.06)",
            border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
            cursor: selected ? "pointer" : "not-allowed",
            boxShadow: selected ? "0 4px 24px rgba(201,168,76,0.3)" : "none",
          }}
          disabled={!selected}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: selected ? "#000" : "rgba(255,255,255,0.3)", fontWeight: 600 }}>
            {selected ? `Continue — ${selected.name}` : "Select a Service to Continue"}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
function Calendar({ value, onChange }: { value: string | null; onChange: (d: string) => void }) {
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(4); // 0-indexed: 4 = May

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonth = () => { if (viewMonth === 4) return; setViewMonth(m => m - 1); }; // Can't go before May 2026
  const nextMonth = () => { if (viewMonth === 7) return; setViewMonth(m => m + 1); }; // Limit to Aug 2026

  const cells: (number | null)[] = [...Array(firstDayOfWeek).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center transition-colors hover:text-yellow-400"
          style={{ color: viewMonth === 4 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="font-serif font-medium" style={{ fontSize: 15, color: "rgba(255,255,255,0.82)" }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center transition-colors hover:text-yellow-400"
          style={{ color: viewMonth === 7 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center py-1" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: d === "Su" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.32)" }}>
            {d}
          </div>
        ))}
      </div>
      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const mm = String(viewMonth + 1).padStart(2, "0");
          const dd = String(day).padStart(2, "0");
          const dateStr = `${viewYear}-${mm}-${dd}`;
          const available = isDayAvailable(dateStr);
          const selected = value === dateStr;
          const isSunday = new Date(dateStr + "T12:00:00").getDay() === 0;
          const isPast = dateStr <= TODAY;
          return (
            <button
              key={idx}
              disabled={!available}
              onClick={() => available && onChange(dateStr)}
              className="aspect-square flex items-center justify-center rounded-sm text-sm transition-all duration-200 relative group"
              style={{
                fontSize: 12,
                fontWeight: selected ? 700 : 400,
                cursor: available ? "pointer" : "not-allowed",
                background: selected ? "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))" : available ? "transparent" : "transparent",
                color: selected ? "#000" : isSunday || isPast ? "rgba(255,255,255,0.12)" : available ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)",
                boxShadow: selected ? "0 0 14px rgba(201,168,76,0.4)" : "none",
              }}
            >
              {!selected && available && (
                <span className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(201,168,76,0.1)" }} aria-hidden="true" />
              )}
              <span className="relative z-10">{day}</span>
              {available && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "rgba(201,168,76,0.5)" }} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Date & Time ───────────────────────────────────────────────────────
function DateTimeStep({ date, time, onDateChange, onTimeChange, onNext, onPrev }:
  { date: string | null; time: string | null; onDateChange: (d: string) => void; onTimeChange: (t: string) => void; onNext: () => void; onPrev: () => void }) {
  const booked = date ? (BOOKED_SLOTS[date] ?? []) : [];
  const slots = ALL_TIMES.map(t => ({ t, isBooked: booked.includes(t) }));

  return (
    <div className="max-w-4xl mx-auto px-5 pb-16">
      <div className="text-center mb-10">
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>Select your preferred date and time. Available slots are shown in gold.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="p-7" style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.09)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 16 }}>Select Date</p>
          <Calendar value={date} onChange={onDateChange} />
        </div>
        {/* Time Slots */}
        <div className="p-7" style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.09)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 16 }}>Select Time</p>
          {!date ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "rgba(201,168,76,0.4)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>Please select a date first</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map(({ t, isBooked }) => {
                const selected = time === t;
                return (
                  <button
                    key={t}
                    disabled={isBooked}
                    onClick={() => !isBooked && onTimeChange(t)}
                    className="py-2.5 px-1 text-center transition-all duration-200 group relative overflow-hidden"
                    style={{
                      fontSize: 11,
                      cursor: isBooked ? "not-allowed" : "pointer",
                      background: selected ? "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))" : isBooked ? "rgba(255,255,255,0.03)" : "rgba(201,168,76,0.06)",
                      border: `1px solid ${selected ? "rgba(201,168,76,0.6)" : isBooked ? "rgba(255,255,255,0.05)" : "rgba(201,168,76,0.18)"}`,
                      color: selected ? "#000" : isBooked ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.65)",
                      fontWeight: selected ? 600 : 400,
                      textDecoration: isBooked ? "line-through" : "none",
                      boxShadow: selected ? "0 0 12px rgba(201,168,76,0.35)" : "none",
                    }}
                  >
                    {!selected && !isBooked && (
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(201,168,76,0.08)" }} aria-hidden="true" />
                    )}
                    <span className="relative z-10">{t}</span>
                  </button>
                );
              })}
            </div>
          )}
          {date && !slots.some(s => !s.isBooked) && (
            <p className="mt-4 text-center" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>No availability — please choose another date.</p>
          )}
        </div>
      </div>
      {/* Nav */}
      <div className="flex items-center justify-between mt-8">
        <button onClick={onPrev} className="flex items-center gap-2 transition-colors hover:text-yellow-400" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Back
        </button>
        <button
          disabled={!date || !time}
          onClick={() => date && time && onNext()}
          className="px-10 py-4 font-medium transition-all duration-300"
          style={{
            background: date && time ? "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))" : "rgba(255,255,255,0.06)",
            fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase",
            color: date && time ? "#000" : "rgba(255,255,255,0.25)",
            cursor: date && time ? "pointer" : "not-allowed",
            boxShadow: date && time ? "0 4px 22px rgba(201,168,76,0.3)" : "none",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Your Info ─────────────────────────────────────────────────────────
function InfoStep({ form, onChange, onNext, onPrev }:
  { form: { name: string; email: string; phone: string; notes: string }; onChange: (k: string, v: string) => void; onNext: () => void; onPrev: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => { if (validate()) onNext(); };

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Jane Smith", required: true },
    { key: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "(972) 000-0000", required: true },
  ];

  return (
    <div className="max-w-xl mx-auto px-5 pb-16">
      <div className="text-center mb-10">
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>Almost there. Fill in your details and we'll confirm your appointment.</p>
      </div>
      <div className="p-8 md:p-10" style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.09)" }}>
        <div className="flex flex-col gap-8">
          {fields.map(f => (
            <div key={f.key} className="relative group">
              <label style={{ fontSize: 8.5, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", display: "block", marginBottom: 8 }}>
                {f.label} {f.required && <span style={{ color: "rgba(201,168,76,0.5)" }}>*</span>}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={e => onChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-transparent pb-2.5 outline-none transition-colors duration-300"
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.82)",
                  borderBottom: `1px solid ${errors[f.key] ? "rgba(220,80,80,0.6)" : "rgba(201,168,76,0.2)"}`,
                }}
                onFocus={e => { e.target.style.borderBottomColor = "rgba(201,168,76,0.65)"; }}
                onBlur={e => { e.target.style.borderBottomColor = errors[f.key] ? "rgba(220,80,80,0.6)" : "rgba(201,168,76,0.2)"; }}
              />
              {errors[f.key] && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 10, color: "rgba(220,90,90,0.85)", marginTop: 5 }}>
                  {errors[f.key]}
                </motion.p>
              )}
            </div>
          ))}
          <div className="relative">
            <label style={{ fontSize: 8.5, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", display: "block", marginBottom: 8 }}>
              Special Requests <span style={{ color: "rgba(255,255,255,0.2)" }}>(optional)</span>
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={e => onChange("notes", e.target.value)}
              placeholder="Allergies, hair history, inspo pics reference..."
              className="w-full bg-transparent pb-2.5 outline-none resize-none transition-colors duration-300"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
              onFocus={e => { e.target.style.borderBottomColor = "rgba(201,168,76,0.5)"; }}
              onBlur={e => { e.target.style.borderBottomColor = "rgba(201,168,76,0.15)"; }}
            />
          </div>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
            By confirming, you agree to our cancellation policy. We require 24-hour notice for cancellations.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button onClick={onPrev} className="flex items-center gap-2 transition-colors hover:text-yellow-400" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={submit}
          className="px-10 py-4 font-medium"
          style={{
            background: "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))",
            fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#000", fontWeight: 600,
            boxShadow: "0 4px 22px rgba(201,168,76,0.35)",
          }}
        >
          Confirm Appointment
        </motion.button>
      </div>
    </div>
  );
}

// ─── Step 3: Confirmation ──────────────────────────────────────────────────────
function ConfirmStep({ service, date, time, name }: { service: Service; date: string; time: string; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const refNum = useRef(`MD-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`);

  const dateObj = new Date(date + "T12:00:00");
  const dateLabel = dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div ref={ref} className="max-w-xl mx-auto px-5 pb-20 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{
          background: "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))",
          boxShadow: "0 0 60px rgba(201,168,76,0.4), 0 0 120px rgba(201,168,76,0.15)",
        }}
      >
        <motion.svg
          className="w-9 h-9 text-black"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginBottom: 12 }}>Appointment Confirmed</p>
        <h2 className="font-serif mb-2" style={{ fontSize: 28, color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>
          You're all set, {name.split(" ")[0]}!
        </h2>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
          We'll send a confirmation to your email. We look forward to seeing you.
        </p>

        {/* Summary card */}
        <div className="p-8 mb-8 text-left" style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.15)" }}>
          <div className="flex items-start justify-between mb-6 pb-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: 6 }}>Service</p>
              <p className="font-serif font-semibold" style={{ fontSize: 16, color: "rgba(255,255,255,0.88)" }}>{service.name}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{service.duration} · {service.price}</p>
            </div>
            <span className="text-2xl" style={{ color: "rgba(201,168,76,0.5)" }}>{service.icon}</span>
          </div>
          {[
            { label: "Date", value: dateLabel },
            { label: "Time", value: time },
            { label: "Location", value: "2281 E University Dr Suite 101, Prosper TX 75078" },
            { label: "Stylist", value: "Matthew Dillard" },
            { label: "Booking Ref", value: refNum.current },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-4 mb-4 last:mb-0">
              <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", width: 72, flexShrink: 0, paddingTop: 2 }}>{row.label}</p>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{row.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${date.replace(/-/g,"")}T${time.includes("PM") && !time.startsWith("12") ? String(parseInt(time.split(":")[0]) + 12) : time.split(":")[0]}0000%0ASUMMARY:${encodeURIComponent(service.name)} at Matthew Dillard%0ALOCATION:2281 E University Dr Suite 101, Prosper TX 75078%0AEND:VEVENT%0AEND:VCALENDAR`}
            download="matthew-dillard-appointment.ics"
            className="px-8 py-3.5 transition-all duration-300 hover:scale-[1.02]"
            style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            Add to Calendar
          </a>
          <Link href="/">
            <button
              className="px-8 py-3.5 font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg,hsl(43,68%,50%),hsl(35,72%,42%))",
                fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#000", fontWeight: 600,
              }}
            >
              Return Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const pageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "50%" : "-50%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-50%" : "50%", opacity: 0 }),
};

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const goNext = () => { setDirection(1); setStep(s => s + 1); };
  const goPrev = () => { setDirection(-1); setStep(s => s - 1); };
  const updateForm = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden" style={{ paddingTop: "70px" }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(201,168,76,0.05), transparent 60%)" }} aria-hidden="true" />

        {/* Page header */}
        <div className="relative z-10 text-center py-12 px-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(201,168,76,0.62)" }}>Matthew Dillard Hair Salons</span>
              <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
            </div>
            <h1 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 46px)", color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>
              Book Your <span className="shimmer-text italic">Appointment</span>
            </h1>
          </motion.div>
          <StepIndicator step={step < 3 ? step : 3} />
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-12" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }} />

        {/* Step content */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div key="step0" custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <ServiceStep selected={service} onSelect={setService} onNext={goNext} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <DateTimeStep date={date} time={time} onDateChange={d => { setDate(d); setTime(null); }} onTimeChange={setTime} onNext={goNext} onPrev={goPrev} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <InfoStep form={form} onChange={updateForm} onNext={goNext} onPrev={goPrev} />
              </motion.div>
            )}
            {step === 3 && service && date && time && (
              <motion.div key="step3" custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <ConfirmStep service={service} date={date} time={time} name={form.name || "Guest"} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
