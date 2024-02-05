import {Property} from '../src/types/Property';
import mockUser from './MockUser';
// import {Property} from '../src/types/Property';

const mockProperty: Property = {
  id: 14200,
  city: 'austin',
  street_address: '6701 Danwood Dr',
  zipcode: '78759',
  latitude: 30.4210243225098,
  longitude: -97.7647705078125,
  has_garage: true,
  has_cooling: true,
  has_heating: true,
  num_of_bathrooms: 16,
  num_of_bedrooms: 2,
  num_of_stories: 4,
  latest_sale_price: 238000.0,
  latest_sale_year: 2020,
  lot_size: 9278.0,
  living_area: 1665.0,
  type: 'Single Family',
  year_built: 1978,
  tax_rate: 1.98,
  image_urls: [
    'https://austin-properties.s3.eu-west-2.amazonaws.com/media/homeImages/29369525_796765a4e112d5c787c20c21a9592a23-p_f.jpg',
  ],
  is_verified: true,
  avg_school_distance: 0,
  avg_school_size: 0,
  avg_school_rating: 0,
  for_sale: false,
  owner_id: null,
  creator_id: null,
  predicted_price: 398927.0,
  percentage_difference: -12.5,
};

export default mockProperty;
