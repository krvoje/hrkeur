const EXCHANGE_RATE_HRK_TO_EUR = 7.53450

type Currency = 'EUR' | 'HRK'

interface Money {
  amount: number,
  currency: Currency
}

interface Amount {
  mainCurrency: Money
  otherCurrency: Money
}

function roundUp(amount: number, decimalPlaces: number): number {
  const minorUnitFactor = 10 ** decimalPlaces
  return Math.ceil(amount * minorUnitFactor) / minorUnitFactor
}

function flipMoney(money: Money): Money {
  if (money.currency === 'EUR') {
    return {
      amount: roundUp(money.amount * EXCHANGE_RATE_HRK_TO_EUR, 2),
      currency: 'HRK'
    }
  }
  return {
    amount: roundUp(money.amount / EXCHANGE_RATE_HRK_TO_EUR, 2),
    currency: 'EUR'
  }
}

const mkDualCurrencyAmount = (money: Money): Amount => ({
  mainCurrency: money,
  otherCurrency: flipMoney(money),
})

const mkAmount = (amount: number, mainCurrency: Currency): Amount => mkDualCurrencyAmount({
  amount: roundUp(amount, 2),
  currency: mainCurrency
})

const flipCurrencies = (amount: Amount): Amount => mkAmount(amount.mainCurrency.amount, amount.otherCurrency.currency)

export {
  flipCurrencies,
  mkAmount,
  roundUp,
  Currency,
  Amount,
}