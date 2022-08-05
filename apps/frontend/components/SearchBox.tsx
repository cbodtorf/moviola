import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web';
import { InputGroup, Input, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * @description Search input for handling query results
 * https://www.algolia.com/doc/api-reference/widgets/search-box/react-hooks/#hook
 */
export function SearchBox(props: UseSearchBoxProps) {
  const { query, refine, clear } = useSearchBox(props);

  return (
    <InputGroup size='md'>
      <InputLeftElement
        pointerEvents='none'
      >
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input
        value={query}
        placeholder='Search...'
        onChange={(event) => {
          console.log('event')
          refine(event.target.value)
        }}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={clear} colorScheme='teal'>
          Clear
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
export default SearchBox;