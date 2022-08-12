import {
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Mixpanel } from '../util/mixpanel';

/**
 * @description Modal Element for first time visitors, explains the site.
 */
export function ExplainerModal({ isOpen, onClose, setCookie }) {
  const steps = [
    {
      label: 'Overview',
      content: (
        <Container mb="5">
          <Text fontSize="sm" mb="2">
            Feel free to search for movies in our top of the line search engine
            featuring autocomplete across all facets.
          </Text>
          <Text fontSize="sm">
            You can also use our filters to refine results by genre or year.
          </Text>
        </Container>
      )
    },
    {
      label: 'Create',
      content: (
        <Text fontSize="sm" mb="2">
          If a movie is missing from the database, click the &quot;Create
          +&quot; button to add a new movie.
        </Text>
      )
    },
    {
      label: 'Edit',
      content: (
        <Text fontSize="sm" mb="2">
          If a movie has details that are out of date, feel free to edit them by
          clicking the <EditIcon /> icon.
        </Text>
      )
    },
    {
      label: 'Delete',
      content: (
        <Text fontSize="sm" mb="2">
          If a movie was added by mistake, it can be removed by clicking the{' '}
          <DeleteIcon /> icon.
        </Text>
      )
    }
  ];

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  });

  const handleClose = () => {
    Mixpanel.track('Explainer Close', {
      step: activeStep
    });
    setCookie('moviola', { visited: true, userId: Mixpanel.getDistinct() });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="xl" mb="2">
            Welcome to Moviola,
          </Text>
          <Text fontSize="sm" mb="2">
            Your go-to resource for movies.
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex flexDir="column" width="100%">
            <Steps
              size="sm"
              colorScheme="teal"
              activeStep={activeStep}
              onClickStep={(step) => setStep(step)}
            >
              {steps.map(({ label, content }) => (
                <Step label={label} key={label}>
                  <Container mt="5">{content}</Container>
                </Step>
              ))}
            </Steps>

            {activeStep === steps.length ? (
              <Flex p={4}>
                <Button mx="auto" size="sm" onClick={handleClose}>
                  Close
                </Button>
              </Flex>
            ) : (
              <Flex width="100%" justify="flex-end">
                <Button
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="sm"
                  variant="ghost"
                >
                  Prev
                </Button>
                <Button size="sm" onClick={nextStep}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Flex>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default ExplainerModal;
