import { HStack, VStack } from "native-base"
import { Button } from "./Button"

export enum Term {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Decimal = '.',
  Plus = '+',
  Minus = '-',
  Divide = '/',
  Multiply = '*',
  Percentage = '%',

  Reduce = '=',
  Clear = 'C',
  Erase = '⌫',
  CurrencyFlip = "€/kn"
}

const ArithmeticOps = new Set([Term.Percentage, Term.Divide, Term.Multiply, Term.Minus, Term.Plus])
const Commands = new Set([Term.Clear, Term.Erase, Term.Reduce])
export interface IKeyboardProps {
  onButtonPress: (value: Term) => void
}

export const isNumber = (term: Term): term is number => typeof term === 'number'

export const isArithmeticOp = (term: Term): boolean => ArithmeticOps.has(term)

export const isCommand = (term: Term): boolean => Commands.has(term)

export function Keyboard({ onButtonPress }: IKeyboardProps) {
  return (
      <VStack p={4} borderTopColor="background.800" borderTopWidth={2}>
        <HStack justifyContent="space-evenly" w="full">
          <Button
              type="clear"
              text="C"
              onPress={() => onButtonPress(Term.Clear)}
          />
          <Button
              type="operator"
              text="%"
              onPress={() => onButtonPress(Term.Percentage)}
          />
          <Button
              type="operator"
              text="÷"
              onPress={() => onButtonPress(Term.Divide)}
          />
          <Button
              type="operator"
              text="x"
              onPress={() => onButtonPress(Term.Multiply)}
          />
        </HStack>

        <HStack justifyContent="space-evenly" w="full" mt={2}>
          <Button
              type="default"
              text="7"
              onPress={() => onButtonPress(Term.Seven)}
          />
          <Button
              type="default"
              text="8"
              onPress={() => onButtonPress(Term.Eight)}
          />
          <Button
              type="default"
              text="9"
              onPress={() => onButtonPress(Term.Nine)}
          />
          <Button
              type="operator"
              text="—"
              onPress={() => onButtonPress(Term.Minus)}
          />
        </HStack>

        <HStack justifyContent="space-evenly" w="full" mt={2}>
          <Button
              type="default"
              text="4"
              onPress={() => onButtonPress(Term.Four)}
          />
          <Button
              type="default"
              text="5"
              onPress={() => onButtonPress(Term.Five)}
          />
          <Button
              type="default"
              text="6"
              onPress={() => onButtonPress(Term.Six)}
          />
          <Button
              type="operator"
              text="+"
              onPress={() => onButtonPress(Term.Plus)}
          />
        </HStack>

        <HStack justifyContent="space-evenly" w="full" mt={2}>
          <Button
              type="default"
              text="1"
              onPress={() => onButtonPress(Term.One)}
          />
          <Button
              type="default"
              text="2"
              onPress={() => onButtonPress(Term.Two)}
          />
          <Button
              type="default"
              text="3"
              onPress={() => onButtonPress(Term.Three)}
          />
          <Button
              type="clear"
              text="⌫"
              onPress={() => onButtonPress(Term.Erase)}
          />
        </HStack>

        <HStack justifyContent="space-evenly" w="full" mt={2}>
          <Button
              type="default"
              text="€/kn"
              onPress={() => onButtonPress(Term.CurrencyFlip)}
          />
          <Button
              type="default"
              text="0"
              onPress={() => onButtonPress(Term.Zero)}
          />
          <Button
              type="default"
              text="."
              onPress={() => onButtonPress(Term.Decimal)}
          />
          <Button
              type="equal"
              text="="
              onPress={() => onButtonPress(Term.Reduce)}
          />
        </HStack>
      </VStack>
  )
}
