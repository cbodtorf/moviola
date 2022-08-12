import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web';
import { Mixpanel } from '../util/mixpanel';
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  Progress
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { debounce } from 'lodash';
import { useRef, useState, useEffect } from 'react';
import styles from './searchbox.module.scss';

/**
 * @description Search input for handling query results
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react-hooks/#hook
 */
export function SearchBox(props: UseSearchBoxProps) {
  const { refine, clear, isSearchStalled } = useSearchBox(props);
  const [isSearching, setSearching] = useState(false);

  // Make sure we debounce our search to make a better experience
  const debouncedSearch = useRef(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearching(false);
      const { value } = event.target;
      Mixpanel.track('Search box query', {
        query: value
      });
      refine(value);
    }, 600)
  ).current;

  // Cancel search when component unmounts
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <Progress
        className={styles['progress-bar']}
        colorScheme="teal"
        size="xs"
        isIndeterminate={isSearching || isSearchStalled}
      />
      <InputGroup size="md" mb="25">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          data-cy="SearchBox"
          placeholder="Search..."
          onChange={(event) => {
            setSearching(true);
            return debouncedSearch(event);
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
    </>
  );
}
export default SearchBox;
