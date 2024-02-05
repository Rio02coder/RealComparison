import {tags} from '../../../types/redux/Tags';
import {Property} from '../../../types/Property';

const getInitialState = (): Map<tags, Property[]> => {
  const initialState = new Map<tags, Property[]>();
  const allTags = Object.values(tags);
  for (const tagKey in allTags) {
    const tag = allTags[tagKey] as tags;
    initialState.set(tag, []);
  }
  return initialState;
};

export default getInitialState;
