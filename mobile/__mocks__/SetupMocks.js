import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import mockSpecificProperty from '../test_utils/MockSpecificProperty';
import * as LocationHandler from '../src/components/handlers/LocationHandler';
import mockRecommendations from '../test_utils/MockRecommendations';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('../src/utilities/search/fetchLocations', () => []);

jest.mock('../src/utilities/search/search', () => []);

jest.mock(
  '../src/service/Contactor/Property/Property',
  () => () => mockSpecificProperty,
);

jest.mock(
  '../src/service/Contactor/Property/Recommendations',
  () => mockRecommendations,
);

jest.mock('../src/components/handlers/LocationHandler.ts');

jest.mock('react-native-image-crop-picker', () => '');

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest
  .spyOn(LocationHandler, 'getUserCoordinate')
  .mockImplementation(
    () =>
      new Promise((resolve, reject) =>
        resolve({latitude: 51.4844219, longitude: -0.1223524}),
      ),
  );
