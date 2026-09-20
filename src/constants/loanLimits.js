
const LOAN_LIMITS = {
  personal: {
    minAmount: 50000,
    maxAmount: 1000000,
    minTenure: 12,
    maxTenure: 60,
  },
  home: {
    minAmount: 50000,
    maxAmount: 10000000,
    minTenure: 60,
    maxTenure: 360,
  },
  business: {
    minAmount: 50000,
    maxAmount: 5000000,
    minTenure: 12,
    maxTenure: 120,
  },
};

export function getLoanLimits(loanType) {
  return LOAN_LIMITS[loanType] ?? null;
}

export default LOAN_LIMITS;
