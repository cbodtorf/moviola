import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import ApiClient from '../util/api-client';

const movieClient = new ApiClient({
  baseURL: 'http://localhost:4200/api/v1/movies',
});

type RemoveResponse = {
  success: boolean;
  taskID: number;
};

/**
 * @description Alert Diaolog for removing items from index
 */
export function DeleteAlert({ isOpen, onClose, hit }) {
  const { refresh } = useInstantSearch();
  const toast = useToast();
  const cancelRef = useRef();

  async function handleDelete() {
    try {
      const res: RemoveResponse = await movieClient.delete(`/${hit.objectID}`);

      console.log(res);
      toast({
        title: `Successfully Removed ${hit.title}.`,
        description: 'It may take a moment for this to show in the results',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: `Something went wrong`,
        status: 'error',
        isClosable: true,
      });
    }

    setTimeout(() => {
      onClose();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 500);

    setTimeout(() => {
      refresh();
    }, 5000);
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Movie
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default DeleteAlert;
