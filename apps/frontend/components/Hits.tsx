import { useHits, UseHitsProps } from 'react-instantsearch-hooks-web';
import type { Hit } from 'instantsearch.js';
import type { SendEventForHits } from 'instantsearch.js/es/lib/utils';
import { Stack, StackItem } from '@chakra-ui/react';
import { JSXElementConstructor } from 'react';
import CreateHit from './CreateHit';

interface HitsProps extends UseHitsProps {
  hitComponent: JSXElementConstructor<{
    hit: Hit;
    sendEvent: SendEventForHits;
  }>;
}

/**
 * @description Component that returns a list of results or hits
 * https://www.algolia.com/doc/api-reference/widgets/hits/react-hooks/#hook
 */
export function Hits({ hitComponent: HitComponent, ...props }: HitsProps) {
  const { hits, sendEvent } = useHits(props);

  return (
    <Stack w="100%">
      {hits.map((hit, i) => (
        <StackItem key={hit.objectID}>
          <HitComponent hit={hit} sendEvent={sendEvent} />
        </StackItem>
      ))}
      <CreateHit />
    </Stack>
  );
}
export default Hits;
