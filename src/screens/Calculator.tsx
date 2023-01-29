import { VStack } from "native-base"
import { useEffect, useState } from "react"
import { DisplayResult } from "../components/DisplayResult"
import { isArithmeticOp, isCommand, isNumber, Keyboard, Term, } from "../components/Keyboard"
import { Amount, Currency, flipCurrencies, mkAmount } from "../model/Currency"
import * as math from 'mathjs'
import { exp } from 'mathjs'

//import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

export function Calculator() {
  const [mainCurrency, setMainCurrency] = useState<Currency>('EUR')
  const [expression, setExpression] = useState<Term[]>([])
  const [result, setResult] = useState<Amount>(mkAmount(0, mainCurrency))

  const calculateResult = () => {
    const last = expression[expression.length - 1]
    if (expression.length === 0) {
      setResult(mkAmount(0, mainCurrency))
    } else if (isNumber(last) || last === Term.Decimal) {
      setResult(mkAmount(math.evaluate(expression.join("")), mainCurrency))
    }
  }

  const reduceExpression = () => setExpression([result.mainCurrency.amount])

  const clearExpression = () => {
    setExpression([])
    setResult(mkAmount(0, mainCurrency))
  }

  const erase = () => {
    if (expression.length === 0) return

    const last = expression[expression.length-1]
    if(isNumber(last)) {
      const newNumber = parseInt(last.toString().slice(0, -1))
      if (!isNaN(newNumber)) {
        setExpression(expression.slice(0, -1).concat(newNumber))
        return
      }
    }
    setExpression(expression.slice(0, -1))
  }

  const flipCurrency = () => {
    setMainCurrency(mainCurrency === 'EUR' ? 'HRK' : 'EUR')
    setResult(flipCurrencies(result))
  }

  const cleanupTrailingOps = () => {
    if (isArithmeticOp(expression[expression.length - 1]) && expression.length > 0) {
      setExpression(expression.slice(0, expression.length-1))
      cleanupTrailingOps()
    }
  }

  const inputDecimalPoint = () => {
    const last = expression[expression.length-1]
    const penultimate = expression[expression.length-2]
    if (isNumber(last) && penultimate !== Term.Decimal) {
      setExpression(expression.concat(Term.Decimal))
    }
  }

  const inputNumber = (number: number) => {
    const last = expression[expression.length-1]
    if (isNumber(last)) {
      setExpression(expression.slice(0, -1).concat(math.evaluate(`${last}${number}`)))
    } else {
      setExpression(expression.concat(number))
    }
  }

  const inputArithmeticOp = (operation: Term) => {
    if (isNumber(expression[expression.length-1])) {
      setExpression(expression.concat(operation))
    }
  }

  const handleButtonPress = async (term: Term) => {
    if (
        expression.length >= 15 && !isCommand(term)
    ) return

    switch (term) {
      case Term.Clear:
        clearExpression()
        break
      case Term.Erase:
        erase()
        break
      case Term.Reduce:
        reduceExpression()
        break
      case Term.CurrencyFlip:
        flipCurrency()
        break
      case Term.Decimal:
        inputDecimalPoint()
        break
      default:
        if (isNumber(term)) inputNumber(term)
        else if (isArithmeticOp(term)) inputArithmeticOp(term)
        break
    }
  }

  useEffect(() => {
    calculateResult()
  }, [expression])

  return (
      <VStack flex={1} bg="background.900" safeArea justifyContent="flex-end">
        {/* <BannerAd
        size={BannerAdSize.FULL_BANNER}
        unitId={TestIds.BANNER}
        onAdFailedToLoad={error => console.log(error)}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
        <DisplayResult
            expression={expression}
            result={result}
        />
        <Keyboard
            onButtonPress={handleButtonPress}
        />
      </VStack>
  )
}
