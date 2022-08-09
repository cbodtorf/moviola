import { Highlight } from 'react-instantsearch-hooks-web';
import {
  Box,
  Badge,
  ButtonGroup,
  IconButton,
  Image,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { StarIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Mixpanel } from '../util/mixpanel';
import ActionModal from './ActionModal';
import DeleteAlert from './DeleteAlert';

/**
 * @description Result Item component used as hitComponent prop for <Hits /> componenent
 * https://www.algolia.com/doc/api-reference/widgets/hits/react-hooks/
 */
export function Hit(props) {
  const { hit } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Stack direction={['column', 'row']} spacing="12px">
        <Image
          w="80px"
          src={hit.image}
          alt={hit.title}
          fit="cover"
          align="center"
          fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        />

        <Box p="6" flex="10">
          <Box>
            <Stack direction={['column', 'row']} spacing="12px">
              {hit.genre.map((genre, i) => {
                return (
                  <Badge
                    key={`${genre}-${i}`}
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                  >
                    {/* Note the dot notation here is not javascript approved */}
                    <Highlight hit={hit} attribute={`genre.${i}`} />
                  </Badge>
                );
              })}
            </Stack>
          </Box>

          <Box
            data-title={hit.title}
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            <Highlight hit={hit} attribute="title" />

            <Box as="span" color="gray.600" fontSize="sm">
              <span> </span>
              (<Highlight hit={hit} attribute="year" />)
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < hit.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
          </Box>
        </Box>

        <Box padding="12px" flex="1">
          <ButtonGroup size="sm" isAttached variant="outline">
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              onClick={() => {
                Mixpanel.track('Edit Action Modal Open');
                onOpen();
              }}
            />
            <IconButton
              aria-label="Delete"
              icon={
                <DeleteIcon
                  onClick={() => {
                    Mixpanel.track('Delete Action Modal Open');
                    onAlertOpen();
                  }}
                />
              }
            />
          </ButtonGroup>
        </Box>
      </Stack>

      <ActionModal isOpen={isOpen} onClose={onClose} hit={hit} action="edit" />
      <DeleteAlert isOpen={isAlertOpen} onClose={onAlertClose} hit={hit} />
    </Box>
  );
}
export default Hit;
