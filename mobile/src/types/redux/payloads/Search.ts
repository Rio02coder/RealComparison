import {searchTags} from '../Tags';

export default interface SearchPayload {
  search: string;
  tag: searchTags;
}
