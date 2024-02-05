import {searchTags} from '../../../types/redux/Tags';

const getInitialState = (): Map<searchTags, string> => {
  const initialState = new Map<searchTags, string>();
  const allTags = Object.values(searchTags);
  for (const tagKey in allTags) {
    const tag = allTags[tagKey] as searchTags;
    initialState.set(tag, '');
  }
  return initialState;
};

export default getInitialState;
