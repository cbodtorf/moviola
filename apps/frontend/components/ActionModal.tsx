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
  Tag,
  TagLabel,
  TagCloseButton,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { validateTitle, validateImage, validateRating, validateYear } from '../util/validation';
import ApiClient from "../util/api-client";
import { Autocomplete, Option } from './Autocomplete';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

const genreList = ['Drama', 'Comedy', 'Thriller', 'Action', 'Adventure', 'Romance', 'Crime', 'Science Fiction', 'Family', 'Fantasy'];
const movieClient = new ApiClient({ baseURL: 'http://localhost:4200/api/v1/movies' });

/**
 * @description Modal Element for editing or creating items
 */
export function ActionModal({ isOpen, onClose, hit, action }) {
  const { refresh } = useInstantSearch();
  const toast = useToast();
  hit.genre = hit.genre || [];

  const {
    objectID,
    title,
    image,
    rating,
    year,
    genre
  } = hit;

  const actionCopyMap = {
    create: {
      title: 'Create',
      success: 'Created',
      method: 'post',
      url: '/'
    },
    edit: {
      title: 'Edit',
      success: 'Edited',
      method: 'put',
      url: `/${objectID}`
    }
  }
  const copy = actionCopyMap[action];

  async function handleSubmit(values, actions) {
    try {
      const res = await movieClient[copy.method](copy.url, {
        movie: {
          ...values,
          genre: result.map((item) => item.value)
        }
      });

      console.log(res);
      toast({
        title: `Successfully ${copy.success} ${values.title}.`,
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
      actions.setSubmitting(false);
      onClose();
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }, 500);

    setTimeout(() => {
      refresh();
    }, 5000);
  }

  function genresToItems(genres: string[]): Option[] {
    return genres.map((genre) => {
      return {
        label: genre,
        value: genre
      }
    })
  }
  const initialItems = genresToItems(genre);
  const options = genresToItems(genreList)
  const [result, setResult] = useState<Option[]>(initialItems);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{copy.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title,
                image,
                rating,
                year,
                genre
              }}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <Field name='title' validate={validateTitle}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.title && form.touched.title}>
                        <FormLabel>Title</FormLabel>
                        <Input {...field} placeholder='title' />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='image' validate={validateImage}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.image && form.touched.image}>
                        <FormLabel>Image</FormLabel>
                        <Input {...field} placeholder='image' />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='rating' validate={validateRating}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.rating && form.touched.rating}>
                        <FormLabel>Rating</FormLabel>
                        <Input {...field} placeholder='rating' />
                        <FormErrorMessage>{form.errors.rating}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='year' validate={validateYear}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.year && form.touched.year}>
                        <FormLabel>Year</FormLabel>
                        <Input {...field} placeholder='year' />
                        <FormErrorMessage>{form.errors.year}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                    <Field name='genre'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.genre && form.touched.genre}>
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
                              renderBadge={({label}) => (
                                <Tag size='md' colorScheme='teal' rounded='full' mx={1} cursor="pointer">
                                  <TagLabel>{label}</TagLabel>
                                  <TagCloseButton />
                                </Tag>
                              )}
                            />
                          </Box>
                        </FormControl>
                      )}
                    </Field>

                  <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ActionModal;