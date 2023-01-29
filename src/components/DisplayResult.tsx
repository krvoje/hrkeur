import { Box, Text } from "native-base"
import { Term } from "./Keyboard"
import { Amount } from "../model/Currency"

export interface DisplayResultProps {
  expression: Term[]
  result: Amount
}

export function DisplayResult({
  expression,
  result,
}: DisplayResultProps) {
  function formatExpression(expression: Term[]) {
    return expression
      .join("")
      .replace(/\*/g, "x")
      .replace(/\//g, "÷")
  }

  const formattedExpression = formatExpression(expression)
  return (
    <Box
      w="full"
      h="2/5"
      padding="8"
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Text color="blue.900" fontSize={38}>
        {formattedExpression || "0"}
      </Text>
      <Text color="red.900" fontSize={26} fontWeight="bold">
        {result.mainCurrency.amount} {result.mainCurrency.currency} | {result.otherCurrency.amount} {result.otherCurrency.currency}
      </Text>
    </Box>
  )
}
