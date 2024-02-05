import {Property} from './Property';
import ReduxProps from './redux/props';
import SessionManager from '../utilities/errors/backend/SessionManager';
import ENDPOINTS from '../service/endpoints';
import User from './User';

export default class ConcreteProperty implements Property {
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
  image_urls: string[];
  is_verified: boolean;
  avg_school_distance: number;
  avg_school_size: number;
  avg_school_rating: number;
  for_sale: boolean;
  owner_id: number | null;
  creator_id: number | null;
  predicted_price: number;
  percentage_difference: number;

  constructor(property: Property) {
    this.id = property.id;
    this.city = property.city;
    this.street_address = property.street_address;
    this.zipcode = property.zipcode;
    this.latitude = property.latitude;
    this.longitude = property.longitude;
    this.has_garage = property.has_garage;
    this.has_cooling = property.has_cooling;
    this.has_heating = property.has_heating;
    this.num_of_bathrooms = property.num_of_bathrooms;
    this.num_of_bedrooms = property.num_of_bedrooms;
    this.num_of_stories = property.num_of_stories;
    this.latest_sale_price = property.latest_sale_price;
    this.latest_sale_year = property.latest_sale_year;
    this.lot_size = property.lot_size;
    this.living_area = property.living_area;
    this.type = property.type;
    this.year_built = property.year_built;
    this.tax_rate = property.tax_rate;
    this.image_urls = property.image_urls;
    this.is_verified = property.is_verified;
    this.avg_school_distance = property.avg_school_distance;
    this.avg_school_size = property.avg_school_size;
    this.avg_school_rating = property.avg_school_rating;
    this.for_sale = property.for_sale;
    this.owner_id = property.owner_id;
    this.creator_id = property.creator_id;
    this.predicted_price = property.predicted_price;
    this.percentage_difference = property.percentage_difference;
  }

  public getFavoritesJSON = () => JSON.stringify({property_id: this.id});

  public getTransferOwnershipJSON = (userEmail: string) =>
    JSON.stringify({
      property_id: this.id,
      user_email: userEmail,
    });

  public present = (): string => `${this.street_address}, ${this.city}`;

  public favorite = (reduxProps: ReduxProps) => {
    const session: SessionManager<string, {}, void, Property> =
      new SessionManager(
        this.getFavoritesJSON(),
        ENDPOINTS.PROPERTY.FAVORITE,
        'POST',
        reduxProps,
        undefined,
        {
          update: passedReduxProps => property =>
            passedReduxProps.favourite([property]),
          adapt: () => this as Property,
        },
      );
    return session.query();
  };

  public unfavorite = (reduxProps: ReduxProps) => {
    const session: SessionManager<string, {}, void, Property> =
      new SessionManager(
        this.getFavoritesJSON(),
        ENDPOINTS.PROPERTY.UNFAVORITE,
        'POST',
        reduxProps,
        undefined,
        {
          update: passedReduxProps => property =>
            passedReduxProps.removeFavourite([property]),
          adapt: () => this as Property,
        },
      );
    return session.query();
  };

  public getShareUrl = () => `${ENDPOINTS.APP.URL}://property/${this.id}`;
}
