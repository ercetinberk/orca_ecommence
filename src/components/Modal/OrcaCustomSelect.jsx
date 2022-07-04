import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import {colors} from "../../res/values/values"

const blue = {
  100: colors.lightcolor,
  900: colors.primaryColor,
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  width: 100%;
  background: '#fff';
  border: 1px solid ${grey[300]};
  margin-top: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${blue[900]};

  &:hover {
    background: ${grey[100]};
    border-color: ${grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 40vw;
  padding: 5px;
  margin: 10px 0;
  background: ${'#ddd'};
  border: 1px solid ${grey[300]};
  color: ${grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  cursor: default;
  

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${blue[100]};
    color: ${grey[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${blue[100]};
    color: ${grey[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;
function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};
export default function OrcaCustomSelect(props) {
    
    return (
      <div>
        <CustomSelect value={props.value} onChange={props.onChange}>
          {
            props.data.map((item)=>{
              return(<StyledOption value={item.value}>{item.value}</StyledOption>)
            })
          }
        </CustomSelect>
      </div>
    );
  }