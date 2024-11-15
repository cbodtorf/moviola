import { Box, Button, Center, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Mixpanel } from '../util/mixpanel';
import ActionModal from './ActionModal';

/**
 * @description Skeleten Item component used to allow users to create new items
 */
export function CreateHit() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Center>
        <Button
          rightIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          m="10"
          onClick={() => {
            Mixpanel.track('Create Action Modal Open');
            onOpen();
          }}
        >
          Create
        </Button>
      </Center>

      <ActionModal isOpen={isOpen} onClose={onClose} hit={{}} action="create" />
    </Box>
  );
}
export default CreateHit;
