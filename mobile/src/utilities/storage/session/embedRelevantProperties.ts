/* istanbul ignore file */
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import ReduxProps from '../../../types/redux/props';
import {Property} from '../../../types/Property';
import getFavorites from '../../../service/Contactor/Property/Favorites';
import getOwned from '../../../service/Contactor/Property/Owned';
import getCreated from '../../../service/Contactor/Property/Created';

const embedRelevantProperties = async (
  loginProps: ScreenProps<ScreenNames.Login>,
) => {
  const relevantPropertiesFetchers: ((
    props: ReduxProps,
  ) => Promise<Property[]>)[] = [getFavorites, getOwned, getCreated];
  const pendingFetchers = [] as Promise<Property[]>[];
  relevantPropertiesFetchers.forEach(relevantPropertiesFetcher =>
    pendingFetchers.push(relevantPropertiesFetcher(loginProps)),
  );
  await Promise.all(pendingFetchers);
};

export default embedRelevantProperties;
