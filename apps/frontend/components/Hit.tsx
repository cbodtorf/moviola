import {
  Highlight,
} from 'react-instantsearch-hooks-web';
import { Box, Badge, Image, Stack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

/**
 * @description Result Item component used as hitComponent prop for <Hits /> componenent
 * https://www.algolia.com/doc/api-reference/widgets/hits/react-hooks/
 */
export function Hit(props) {

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Stack direction={['column', 'row']} spacing='12px'>
        <Image
          w='80px'
          src={props.hit.image}
          alt={props.hit.title}
          fit='cover'
          align='center'
          fallbackSrc='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
        />

        <Box p='6' flex='.9'>
          <Box>
            <Stack direction={['column', 'row']} spacing='12px'>
              {
                props.hit.genre.map((genre, i) => {
                  return (
                    <Badge key={`${genre}-${i}`} borderRadius='full' px='2' colorScheme='teal'>
                      { genre }
                    </Badge>
                    )
                })
              }
            </Stack>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {props.hit.title}

            <Box as='span' color='gray.600' fontSize='sm'>
              <span> </span>({props.hit.year})
            </Box>
          </Box>

          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < props.hit.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
export default Hit;