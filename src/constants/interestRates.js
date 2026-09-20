
const INTEREST_RATES = {
  personal: 10.5,
  home: 8.5,
  business: 14,
};

export function getInterestRate(loanType) {
  return INTEREST_RATES[loanType] ?? null;
}

export default INTEREST_RATES;
