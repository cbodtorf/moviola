import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import InstantSearch from 'instantsearch.js/es/lib/InstantSearch';

export function AlgoliaErrorToast() {
  const { use } = useInstantSearch();
  const toast = useToast();

  useEffect(() => {
    const middleware = ({
      instantSearchInstance
    }: {
      instantSearchInstance: InstantSearch;
    }) => {
      function handleError(searchError) {
        toast({
          title: `Error: ${searchError.name}.`,
          description: searchError.message,
          status: 'error',
          isClosable: true
        });
      }

      return {
        subscribe() {
          instantSearchInstance.addListener('error', handleError);
        },
        unsubscribe() {
          instantSearchInstance.removeListener('error', handleError);
        }
      };
    };

    return use(middleware);
  }, [use, toast]);

  return <></>;
}
export default AlgoliaErrorToast;
