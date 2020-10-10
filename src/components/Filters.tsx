import {
  Button,
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  InputLabel,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { loadColors, loadManufacturers } from '../store/actions/filter.actions';
import { getCars } from '../store/actions/car.actions';

const mapStateToProps = (state: RootState) => ({
  colors: state.filters.colors,
  manufacturers: state.filters.manufacturers,
});

const mapDispatchToProps = {
  loadColors,
  loadManufacturers,
  getCars,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: 20,
    },
    formControl: {
      margin: `${theme.spacing(1)}px 0 ${theme.spacing(3)}px`,
      minWidth: 120,
    },
    option: {
      textTransform: 'capitalize',
    },
  }),
);

export const Filters = ({
  colors,
  manufacturers,
  loadColors,
  loadManufacturers,
  getCars,
}: Props) => {
  const classes = useStyles();
  const [color, setColor] = React.useState<string>('');
  const [manufacturer, setManufacturer] = React.useState<string>('');

  const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setColor(event.target.value as string);

  const handleManufacturerChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => setManufacturer(event.target.value as string);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getCars({ color, manufacturer, page: 1, sort: 'asc' });
  };
  useEffect(() => {
    loadColors();
    loadManufacturers();
  }, []);
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <InputLabel id="color-filter-input-label">Color</InputLabel>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        data-testid="color-filter-input"
      >
        <Select
          id="color-filter-input-select"
          labelId="color-filter-input-label"
          value={color}
          onChange={handleColorChange}
          displayEmpty
          className={classes.option}
        >
          <MenuItem value="">
            <span>All car colors</span>
          </MenuItem>
          {colors.map(color => (
            <MenuItem
              data-testid="color-filter-input-option"
              key={color}
              value={color}
              className={classes.option}
            >
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InputLabel id="manufacturer-filter-input-label">Manufacturer</InputLabel>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          id="manufacturer-filter-input-select"
          labelId="manufacturer-filter-input-label"
          value={manufacturer}
          onChange={handleManufacturerChange}
          displayEmpty
          className={classes.option}
        >
          <MenuItem value="">
            <span>All manufacturers</span>
          </MenuItem>
          {manufacturers.map(manufacturer => (
            <MenuItem
              data-testid="color-filter-input-option"
              key={manufacturer.name}
              value={manufacturer.name}
              className={classes.option}
            >
              {manufacturer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="cars-filter-button"
        fullWidth={false}
      >
        Filter
      </Button>
    </form>
  );
};

export default connector(Filters);
