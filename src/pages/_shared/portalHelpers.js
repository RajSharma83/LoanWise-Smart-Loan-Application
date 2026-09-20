
export const LOAN_LABELS = {
  personal: "Personal Loan",
  home: "Home Loan",
  business: "Business Loan",
  education: "Education Loan",
  car: "Car Loan",
};

export function loanLabel(loanType) {
  return LOAN_LABELS[loanType] || "Loan Application";
}

export const EMPLOYMENT_LABELS = {
  salaried: "Salaried",
  selfEmployed: "Self-Employed",
  businessOwner: "Business Owner",
  student: "Student",
  retired: "Retired / Pensioner",
};

export function employmentLabel(value) {
  if (!value) return "";
  return EMPLOYMENT_LABELS[value] || value;
}

export function formatMoney(value) {
  const numeric = Number(String(value ?? "").replace(/[^\d.]/g, ""));

  if (!numeric) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numeric);
}

export function formatDate(value) {
  if (!value) return "—";

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function fullName(app) {
  return [app?.firstName, app?.lastName].filter(Boolean).join(" ");
}

export function initialsOf(name) {
  const clean = String(name || "").trim();

  if (!clean) return "L";

  return clean.charAt(0).toUpperCase();
}

export function formatAddress(address) {
  if (!address) return "";

  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pinCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}
