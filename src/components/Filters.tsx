import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';

const colors: string[] = [];
const mapStateToProps = (state: RootState) => ({
  colors,
});

const mapDispatchToProps = {
  loadColors: () => {},
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Filters = ({ loadColors }: Props) => {
  const classes = useStyles();
  const [color, setColor] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string);
  };
  useEffect(() => {
    loadColors();
  }, [loadColors]);
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="color-filter-label">Color</InputLabel>
        <Select
          labelId="color-filter-label"
          id="color-filter-input"
          data-testid="color-filter-input"
          value={color}
          onChange={handleChange}
          label="Color"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
