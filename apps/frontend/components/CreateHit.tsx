import { Box, Button, Center, Stack, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ActionModal from './ActionModal';
import { useState } from 'react';

/**
 * @description Skeleten Item component used to allow users to create new items
 */
export function CreateHit(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hit, setHit] = useState({});

  return (
    <Box borderStyle='dashed' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Center>
        <Button
            rightIcon={<AddIcon />}
            colorScheme='teal'
            variant='outline'
            m='10'
            onClick={onOpen}
          >
          Create
        </Button>
      </Center>

      <ActionModal isOpen={isOpen} onClose={onClose} hit={hit} action='create' />
    </Box>
  )
}
export default CreateHit;