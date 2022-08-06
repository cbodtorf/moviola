import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';
// For whatever reason this type wasn't exported from the hook library?
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { Badge, Stack, Checkbox, Text } from '@chakra-ui/react';

type ItemsProps = {
  items: RefinementListItem[],
  refine: (value: string) => void
}

function Items({ items, refine }: ItemsProps) {
  return (
    <>
      {items.map((item, index) => {
        return (
          <Checkbox
            colorScheme='teal'
            key={`${item.label}-${index}`}
            isChecked={item.isRefined}
            onChange={() => {
              refine(item.value)
            }}
          >
            <Badge borderRadius='full' px='2' colorScheme='teal'>{item.label}</Badge>
          </Checkbox>
        )
      })}
    </>
  )
}

/**
 * @description A list of checkboxes for quickly filtering search results
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/react-hooks/#hook
 */
export function RefinementList(props: UseRefinementListProps) {
  const {
    items,
    hasExhaustiveItems,
    createURL,
    refine,
    sendEvent,
    searchForItems,
    isFromSearch,
    canRefine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <div>
      <Stack spacing={1} direction='column'>
        <Items items={items} refine={refine} />
      </Stack>
    </div>
  )
}
export default RefinementList;