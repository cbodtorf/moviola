import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerHeader, DrawerFooter, DrawerBody, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
// import { AccordionIcon } from '@chakra-ui/icons';
import RefinementAccordian from './RefinementAccordian';

export function RefinementDrawer({ isOpen, onClose }) {

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter & Sort</DrawerHeader>

          <DrawerBody>
            <RefinementAccordian allowToggle defaultIndex={[0]}/>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default RefinementDrawer;