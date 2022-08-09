import { useRange } from 'react-instantsearch-hooks-web';
import {
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Stack
} from '@chakra-ui/react';
import {
  RangeConnectorParams,
  RangeBoundaries
} from 'instantsearch.js/es/connectors/range/connectRange';
import { Mixpanel } from '../util/mixpanel';
import { useState } from 'react';

/**
 * @description Range input for selecting min max values for a facet
 * https://www.algolia.com/doc/api-reference/widgets/range-input/react-hooks/#hook
 */
export function RangeInput(props: RangeConnectorParams) {
  const { start, range, refine } = useRange(props);

  const [rangeBoundaries, setRangeBoundaries] = useState(start);
  const handleChange = (value: RangeBoundaries) => setRangeBoundaries(value);
  const [rangeBoundariesMin, rangeBoundariesMax] = rangeBoundaries;

  return (
    <Stack>
      <NumberInput
        min={range.min}
        max={range.max}
        value={rangeBoundariesMin}
        placeholder="Min"
        onChange={(value) => {
          const newRangeBoundaries: RangeBoundaries = [
            Number(value),
            rangeBoundariesMax
          ];
          handleChange(newRangeBoundaries);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text>To</Text>

      <NumberInput
        min={range.min}
        max={range.max}
        value={rangeBoundariesMax}
        placeholder="Max"
        onChange={(value) => {
          const newRangeBoundaries: RangeBoundaries = [
            rangeBoundariesMin,
            Number(value)
          ];
          handleChange(newRangeBoundaries);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button
        onClick={() => {
          Mixpanel.track('Refinement Range', {
            min: rangeBoundaries[0],
            max: rangeBoundaries[1]
          });
          refine(rangeBoundaries);
        }}
      >
        Go
      </Button>
    </Stack>
  );
}
export default RangeInput;
