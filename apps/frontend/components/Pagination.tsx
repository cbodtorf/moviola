import { usePagination } from 'react-instantsearch-hooks-web';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

/**
 * @description Pagination buttons
 * https://www.algolia.com/doc/api-reference/widgets/pagination/react-hooks/#hook
 */
export function Pagination(props) {
  const { pages, currentRefinement, nbPages, isFirstPage, isLastPage, refine } =
    usePagination(props);

  const lastPage = nbPages - 1;
  const prevPage = currentRefinement - 1;
  const nextPage = currentRefinement + 1;

  return (
    <ButtonGroup variant="outline" spacing="1">
      <Button
        h="1.75rem"
        size="sm"
        isDisabled={isFirstPage}
        onClick={() => {
          refine(0);
        }}
        colorScheme="teal"
      >
        <ChevronLeftIcon />
        <ChevronLeftIcon />
      </Button>
      <Button
        h="1.75rem"
        size="sm"
        isDisabled={isFirstPage}
        onClick={() => {
          refine(prevPage);
        }}
        colorScheme="teal"
      >
        <ChevronLeftIcon />
      </Button>
      {pages.map((page, i) => {
        // page is 0 indexed so we need to bump it by 1
        const pageNumber = page + 1;
        return (
          <Button
            key={page}
            h="1.75rem"
            size="sm"
            isDisabled={currentRefinement === page}
            onClick={() => {
              refine(page);
            }}
            colorScheme="teal"
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        h="1.75rem"
        size="sm"
        isDisabled={isLastPage}
        onClick={() => {
          refine(nextPage);
        }}
        colorScheme="teal"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        h="1.75rem"
        size="sm"
        isDisabled={isLastPage}
        onClick={() => {
          refine(lastPage);
        }}
        colorScheme="teal"
      >
        <ChevronRightIcon />
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  );
}
export default Pagination;
