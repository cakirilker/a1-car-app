import { Link } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car } from '../constants/interfaces';

interface Props {
  item: Car;
}

const CarListItem = ({ item }: Props) => {
  const {
    manufacturerName,
    modelName,
    stockNumber,
    mileage: { unit, number },
    fuelType,
    color,
    pictureUrl,
  } = item;
  return (
    <div style={{ margin: '15px 0', border: '1px solid red' }}>
      <img src={pictureUrl} width="150" height="125" />
      <div>
        {manufacturerName} {modelName}
      </div>
      <span>
        Stock # {stockNumber} - {number.toLocaleString()} {unit.toUpperCase()} -{' '}
        {fuelType} -{' '}
        <span style={{ textTransform: 'capitalize' }}>{color}</span>
      </span>
      <Link color="inherit" component={NavLink} to={`/details/${stockNumber}`}>
        View Details
      </Link>
    </div>
  );
};
export default CarListItem;
