import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import RefinementAccordian from './RefinementAccordian';

/**
 * @description Refinement drawer that display our accordian component. Used for mobile
 */
export function RefinementDrawer({ isOpen, onClose }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter & Sort</DrawerHeader>

          <DrawerBody>
            <RefinementAccordian allowToggle defaultIndex={[0]} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default RefinementDrawer;
