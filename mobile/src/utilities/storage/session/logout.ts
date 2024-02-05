/* istanbul ignore file */
import AsyncStorage from '@react-native-community/async-storage';
import {MemoryIDs} from '../Memory';

const logout = () => AsyncStorage.removeItem(MemoryIDs.SESSION);

export default logout;
