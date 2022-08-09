import { usePagination } from 'react-instantsearch-hooks-web';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Mixpanel } from '../util/mixpanel';

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
          Mixpanel.track('Pagination Action', {
            action: 'first',
            page: 0
          });
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
          Mixpanel.track('Pagination Action', {
            action: 'prev',
            page: prevPage
          });
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
              Mixpanel.track('Pagination Action', {
                action: 'number',
                page: page
              });
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
          Mixpanel.track('Pagination Action', {
            action: 'next',
            page: nextPage
          });
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
          Mixpanel.track('Pagination Action', {
            action: 'last',
            page: lastPage
          });
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
