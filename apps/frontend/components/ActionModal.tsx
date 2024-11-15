import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { FormikProvider, Field, useFormik } from 'formik';
import { movieAddSchema, movieUpdateSchema } from '@moviola/util-schemas';
import { Mixpanel } from '../util/mixpanel';
import ApiClient from '../util/api-client';
import { Autocomplete, Option } from './Autocomplete';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

const genreList = [
  'Drama',
  'Comedy',
  'Thriller',
  'Action',
  'Adventure',
  'Romance',
  'Crime',
  'Science Fiction',
  'Family',
  'Fantasy'
];

/**
 * @description Modal Element for editing or creating items
 */
export function ActionModal({ isOpen, onClose, hit, action }) {
  const movieClient = new ApiClient({
    baseURL: `${process.env.NEXT_PUBLIC_URL}/api/v1/movies`
  });

  const { refresh } = useInstantSearch();
  const toast = useToast();
  hit.genre = hit.genre || [];

  const { objectID, title, image, rating, score, year, genre } = hit;

  // Add a map for dynamic copy depending on the action
  const actionCopyMap = {
    create: {
      title: 'Create',
      success: 'Created',
      method: 'post',
      url: '/',
      schema: movieAddSchema
    },
    edit: {
      title: 'Edit',
      success: 'Edited',
      method: 'put',
      url: `/${objectID}`,
      schema: movieUpdateSchema
    }
  };
  const copy = actionCopyMap[action];

  // Submit Handler
  async function handleSubmit(values, actions) {
    const mixpanelAction = {
      action,
      payload: {
        movie: {
          ...values
        }
      }
    };

    try {
      const res = await movieClient[copy.method](copy.url, {
        movie: {
          ...values
        }
      });

      console.log(res);
      toast({
        title: `Successfully ${copy.success} ${values.title}.`,
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
      actions.setSubmitting(false);
      onClose();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 1000);

    // Refresh Algolia InstantSearch
    setTimeout(() => {
      refresh();
    }, 4000);
  }

  const initialItems = [...genre];
  const options = [...genreList];
  const [result, setResult] = useState<Option[]>(initialItems);

  const formik = useFormik({
    initialValues: {
      title,
      image,
      rating,
      score,
      year,
      genre
    },
    validationSchema: copy.schema,
    onSubmit: handleSubmit
  });

  const handleExternalButtonClick = () => {
    formik.submitForm();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{copy.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormikProvider value={formik}>
              <Field name="title">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input {...field} placeholder="title" />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="image">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.image && form.touched.image}
                  >
                    <FormLabel>Image</FormLabel>
                    <Input {...field} placeholder="image" />
                    <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="rating">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.rating && form.touched.rating}
                  >
                    <FormLabel>Rating</FormLabel>
                    <NumberInput
                      {...field}
                      placeholder="rating"
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{form.errors.rating}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="score">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.score && form.touched.score}
                  >
                    <FormLabel>Score</FormLabel>
                    <NumberInput
                      {...field}
                      placeholder="score"
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{form.errors.score}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="year">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.year && form.touched.year}
                  >
                    <FormLabel>Year</FormLabel>
                    <NumberInput
                      {...field}
                      placeholder="year"
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{form.errors.year}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="genre">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.genre && form.touched.genre}
                  >
                    <FormLabel>Genre</FormLabel>
                    <Box maxW="md">
                      <Autocomplete
                        options={options}
                        result={result}
                        setResult={(options: Option[]) => {
                          form.setFieldValue('genre', options);
                          setResult(options);
                        }}
                        placeholder="Choose Genre..."
                        renderBadge={(option) => (
                          <Tag
                            size="md"
                            colorScheme="teal"
                            rounded="full"
                            mx={1}
                            cursor="pointer"
                          >
                            <TagLabel>{option}</TagLabel>
                            <TagCloseButton />
                          </Tag>
                        )}
                      />
                    </Box>
                  </FormControl>
                )}
              </Field>
            </FormikProvider>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              isLoading={formik.isSubmitting}
              loadingText="Submitting"
              disabled={!(formik.isValid && formik.dirty)}
              onClick={handleExternalButtonClick}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ActionModal;
