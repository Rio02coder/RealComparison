import {typeData} from '../../../../../../utilities/search/filters/FilterData';

const propertyAdderInitialValues = {
  city: '',
  zipcode: '',
  street_address: '',
  num_of_bedrooms: 0,
  num_of_bathrooms: 0,
  num_of_stories: 0,
  has_garage: false,
  has_cooling: false,
  has_heating: false,
  type: typeData[0],
  living_area: 0,
  lot_size: 0,
  latest_sale_price: 0,
  latest_sale_year: new Date().getFullYear(),
};

export default propertyAdderInitialValues;
