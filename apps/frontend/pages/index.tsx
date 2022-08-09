import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';
import { useEffect } from 'react';
import { Mixpanel } from '../util/mixpanel';
import { SearchBox as SearchBoxCustom } from '../components/SearchBox';
import { Pagination as PaginationCustom } from '../components/Pagination';
import { Hits as HitsCustom } from '../components/Hits';
import { Hit } from '../components/Hit';
import { RefinementDrawer } from '../components/RefinementDrawer';
import {
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Hide,
  Stack,
  Show,
  useDisclosure
} from '@chakra-ui/react';
import FilterIcon from '../components/FilterIcon';
import RefinementAccordian from '../components/RefinementAccordian';
import AlgoliaErrorToast from '../components/AlgoliaErrorToast';

export function Search() {
  useEffect(() => {
    Mixpanel.track('Loaded Search');
  }, []);

  // Test environment comes in differently than dev.
  const algoliaEnv = {
    appID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API_KEY,
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchClient = algoliasearch(algoliaEnv.appID, algoliaEnv.apiKey);

  const templateAreaMobile = `"header header"
                              "main main"
                              "footer footer"`;
  const templateAreaDesktop = `"header header"
                                "nav main"
                                "nav footer"`;

  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaEnv.indexName}>
      <AlgoliaErrorToast />
      <Configure hitsPerPage={8} />
      <Grid
        templateAreas={[
          templateAreaMobile,
          templateAreaMobile,
          templateAreaDesktop
        ]}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={['1fr', '1fr', '250px 1fr']}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="5" area={'header'}>
          <Stack direction="row" alignItems="center" spacing={6}>
            <Heading as="h1" size="xl" noOfLines={1}>
              Moviola 📽️
            </Heading>
          </Stack>
        </GridItem>

        <Show above="md">
          {/* Desktop Only */}
          <GridItem p="5" area={'nav'}>
            <RefinementAccordian allowMultiple allowToggle defaultIndex={[0]} />
          </GridItem>
        </Show>

        <GridItem p="5" area={'main'}>
          <SearchBoxCustom />

          <Hide above="md">
            {/* Mobile Only */}
            <Button
              leftIcon={<FilterIcon boxSize={2} color="white" />}
              size="sm"
              colorScheme="teal"
              onClick={() => {
                Mixpanel.track('Mobile Filter Drawer Open');
                onOpen();
              }}
              mb="5"
            >
              Refine
            </Button>
            <RefinementDrawer isOpen={isOpen} onClose={onClose} />
          </Hide>

          <HitsCustom hitComponent={Hit} />
        </GridItem>
        <GridItem p="5" area={'footer'}>
          <Center pb="10">
            <PaginationCustom />
          </Center>
        </GridItem>
      </Grid>
    </InstantSearch>
  );
}
export default Search;
