import React, { useState, useRef, forwardRef } from 'react';
import {
  Badge,
  Box,
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  InputProps,
  IconButton,
  List,
  ListItem,
} from '@chakra-ui/react';
import { matchSorter } from 'match-sorter';
import {
  CheckCircleIcon,
  CloseIcon,
  SmallCloseIcon,
  SmallAddIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import mergeRefs from '../util/mergeRefs';

export type Option = {
  [key: string]: unknown;
  label: string;
  value: string;
};

export interface AutocompleteProps extends InputProps {
  allowCreation?: boolean;
  bgHoverColor?: string;
  notFoundText?: string;
  /** Options to be displayed in the autocomplete */
  options: Option[];
  /** Input placeholder */
  placeholder?: string;
  /** Render prop to customize the badges */
  renderBadge?: (option: Option) => React.ReactNode;
  /** Render prop to customize the check icon */
  renderCheckIcon?: (option: Option) => React.ReactNode;
  /** Render prop to customize the create icon */
  renderCreateIcon?: (text?: string) => React.ReactNode;
  /** Result that gets populated with the selected options */
  result: Option[];
  /** Callback to set the result */
  setResult: (options: Option[]) => void;
}

const defaultRenderCheckIcon = (option: Option) => (
  <CheckCircleIcon color="teal" data-label={option.label} mr={2} />
);

const defaultCreateIcon = () => (
  <>
    <SmallAddIcon color="teal" mr={2} />
    Create option
  </>
);

const defaultRenderBadge = (option: Option) => (
  <Badge borderRadius="full" px="2" colorScheme="teal" mx={1} cursor="pointer">
    {option.label}
    <CloseIcon ml={1} w={2} h={2} mb="4px" />
  </Badge>
);

/**
 * @description Customizeable Autocomplete Input for selecting tag like items.
 * based off of this repo: https://github.com/Fedeorlandau/chakra-ui-simple-autocomplete
 * It wasn't quite working how I wanted.
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      result,
      setResult,
      bgHoverColor,
      allowCreation,
      notFoundText,
      renderBadge = defaultRenderBadge,
      renderCheckIcon = defaultRenderCheckIcon,
      renderCreateIcon = defaultCreateIcon,
      ...rest
    }: AutocompleteProps,
    ref
  ) => {
    const [optionsCopy, setOptionsCopy] = useState<Option[]>(options);
    const [partialResult, setPartialResult] = useState<Option[]>();
    const [displayOptions, setDisplayOptions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);

    const filterOptions = (value: string) => {
      if (value) {
        setDisplayOptions(true);
        setPartialResult(
          matchSorter(optionsCopy, value, { keys: ['label', 'value'] })
        );
        setInputValue(value);
      } else {
        setPartialResult(optionsCopy);
        // setDisplayOptions(false);
      }
    };

    const selectOption = (option: Option) => {
      if (result.includes(option)) {
        setResult([
          ...result.filter(
            (existingOption) => existingOption.value !== option.value
          ),
        ]);
      } else {
        setResult([option, ...result]);
      }
    };

    const isOptionSelected = (option: Option) =>
      result.filter((selectedOption) => selectedOption.value === option.value)
        .length > 0;

    const createOption = () => {
      if (inputValue && allowCreation) {
        const newOption: Option = {
          label: inputValue,
          value: inputValue,
        };
        setOptionsCopy([newOption, ...optionsCopy]);
        selectOption(newOption);
        setDisplayOptions(false);
        if (inputRef && inputRef.current !== null) {
          inputRef.current.value = '';
        }
      }
    };

    const selectOptionFromList = (option: Option) => {
      selectOption(option);
      setDisplayOptions(false);
      if (inputRef && inputRef.current !== null) {
        inputRef.current.value = '';
      }
    };

    const checkIcon = (option: Option) => {
      if (isOptionSelected(option)) {
        return renderCheckIcon(option);
      }
      return null;
    };

    return (
      <Box data-testid="simple-autocomplete">
        {result.length > 0 && (
          <Box my={2}>
            {result.map((option) => (
              <Box
                display="inline-block"
                onClick={() => selectOption(option)}
                key={option.value}
              >
                {renderBadge(option)}
              </Box>
            ))}
          </Box>
        )}

        <InputGroup size="md">
          <Input
            onChange={(e) => filterOptions(e.currentTarget.value)}
            ref={mergeRefs([inputRef, ref])}
            {...rest}
          />
          <InputRightElement>
            <ButtonGroup pr="10">
              <IconButton
                size="sm"
                bgColor="transparent"
                color="gray"
                aria-label="Clear"
                icon={<SmallCloseIcon />}
                onClick={() => {
                  inputRef.current.value = '';
                  filterOptions('');
                }}
              />
              <IconButton
                size="sm"
                bgColor="transparent"
                color="gray"
                aria-label="Expand List"
                icon={<ChevronDownIcon />}
                onClick={() => {
                  displayOptions
                    ? setDisplayOptions(false)
                    : setDisplayOptions(true);
                }}
              />
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>

        {displayOptions && (
          <List
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
            mt={2}
          >
            {partialResult?.map((option) => (
              <ListItem
                key={option.value}
                _hover={{ bg: bgHoverColor || 'gray.100' }}
                my={1}
                p={2}
                cursor="pointer"
                onClick={() => selectOptionFromList(option)}
              >
                <Flex align="center">
                  {checkIcon(option)}
                  {option.label}
                </Flex>
              </ListItem>
            ))}
            {!partialResult?.length && allowCreation && (
              <ListItem
                _hover={{ bg: bgHoverColor || 'gray.100' }}
                my={1}
                p={2}
                cursor="pointer"
                data-testid="create-option"
                onClick={() => createOption()}
              >
                <Flex align="center">{renderCreateIcon()}</Flex>
              </ListItem>
            )}
            {!partialResult?.length && !allowCreation && (
              <ListItem my={1} p={2} data-testid="not-found">
                <Flex align="center">{notFoundText}</Flex>
              </ListItem>
            )}
          </List>
        )}
      </Box>
    );
  }
);
export default Autocomplete;

Autocomplete.displayName = 'Autocomplete';

Autocomplete.defaultProps = {
  notFoundText: 'Not found',
  allowCreation: true,
};
