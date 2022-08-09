import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import { Mixpanel } from '../util/mixpanel';
import ApiClient from '../util/api-client';

type RemoveResponse = {
  success: boolean;
  taskID: number;
};

/**
 * @description Alert Diaolog for removing items from index
 */
export function DeleteAlert({ isOpen, onClose, hit }) {
  const movieClient = new ApiClient({
    baseURL: `${process.env.NEXT_PUBLIC_URL}/api/v1/movies`
  });

  const { refresh } = useInstantSearch();
  const toast = useToast();
  const cancelRef = useRef();

  const mixpanelAction = {
    action: 'delete',
    payload: {
      id: hit.objectID
    }
  };

  async function handleDelete() {
    try {
      const res: RemoveResponse = await movieClient.delete(`/${hit.objectID}`);

      console.log(res);
      toast({
        title: `Successfully Removed ${hit.title}.`,
        description: 'It may take a moment for this to show in the results',
        status: 'success',
        isClosable: true
      });

      Mixpanel.track('Action Submit Success', {
        ...mixpanelAction,
        success: true
      });
    } catch (err) {
      console.log(err);
      toast({
        title: `Something went wrong`,
        status: 'error',
        isClosable: true
      });

      Mixpanel.track('Action Submit Error', {
        ...mixpanelAction,
        success: false
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
        onClose={() => {
          Mixpanel.track('Delete Cancel', mixpanelAction);
          onClose();
        }}
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
              <Button
                ref={cancelRef}
                onClick={() => {
                  Mixpanel.track('Delete Cancel', mixpanelAction);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                ml={3}
                colorScheme="red"
                onClick={() => {
                  Mixpanel.track('Delete Confirm', mixpanelAction);
                  handleDelete();
                }}
              >
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
