import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web';
import { Mixpanel } from '../util/mixpanel';
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * @description Search input for handling query results
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react-hooks/#hook
 */
export function SearchBox(props: UseSearchBoxProps) {
  const { query, refine, clear } = useSearchBox(props);

  return (
    <InputGroup size="md" mb="25">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        value={query}
        placeholder="Search..."
        onChange={(event) => {
          Mixpanel.track('Search box query', {
            query: event.target.value
          });
          refine(event.target.value);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          colorScheme="teal"
          onClick={() => {
            Mixpanel.track('Clear search box');
            clear();
          }}
        >
          Clear
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
export default SearchBox;
