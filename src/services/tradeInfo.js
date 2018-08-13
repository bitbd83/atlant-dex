import store from '@/store';

export const getFee = (curr, isDeposit) => {
  let result = 0;
  store.state.user.transactionFees.forEach((el) => {
    if (el.name == curr) result = isDeposit ? el.depositFee : el.withdrawFee;
  });
  return result;
};

export const getBalance = (curr) => {
  let result = 0;
  store.state.user.portfolio.balances.forEach((el) => {
    if (el.currency == curr) result = el.availableFunds;
  });
  return result;
};
