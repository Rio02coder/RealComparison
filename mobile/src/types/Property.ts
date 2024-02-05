import PhotographedEntity from './PhotographedEntity';
import {PasswordlessUserBackend} from './service/server';

export interface Property extends PhotographedEntity {
  id: number;
  city: string;
  street_address: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  has_garage: boolean;
  has_cooling: boolean;
  has_heating: boolean;
  num_of_bathrooms: number;
  num_of_bedrooms: number;
  num_of_stories: number;
  latest_sale_price: number;
  latest_sale_year: number;
  lot_size: number;
  living_area: number;
  type: string;
  year_built: number;
  tax_rate: number;
  is_verified: boolean;
  avg_school_distance: number;
  avg_school_size: number;
  avg_school_rating: number;
  for_sale: boolean;
  owner_id: number | null;
  creator_id: number | null;
  predicted_price: number;
  percentage_difference: number;
}

/**
 * Used when searching for a specific property.
 */
export interface SpecificProperty extends Property {
  views: number;
  favorites: number;
  owner: PasswordlessUserBackend['user'] | null;
  creator: PasswordlessUserBackend['user'] | null;
}

/**
 * Used for searching/ discovery of properties based on specific requirements.
 */
export type PropertyFilter = Partial<{
  has_garage: boolean;
  has_cooling: boolean;
  has_heating: boolean;
  max_bedrooms: number;
  min_bedrooms: number;
  max_bathrooms: number;
  min_bathrooms: number;
  max_stories: number;
  min_stories: number;
  max_lot_size: number;
  min_lot_size: number;
  max_living_area: number;
  min_living_area: number;
  type: string;
  distance_from_center: number;
  age: number;
  q: string;
}>;
