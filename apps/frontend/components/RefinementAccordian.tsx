import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
// import { AccordionIcon } from '@chakra-ui/icons';
import { RefinementList } from '../components/RefinementList';
import RangeInput from './RangeInput';

export function RefinementAccordian(props) {
  return (
    <Accordion {...props} >
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Genre
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <RefinementList attribute="genre" />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Year
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <RangeInput attribute="year" min={1888} max={2088} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
export default RefinementAccordian;
