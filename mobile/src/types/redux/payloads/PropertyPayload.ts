import {Property} from '../../Property';
import {tags} from '../Tags';

export default interface PropertyPayload {
  property: Property;
  tag: tags[];
}
