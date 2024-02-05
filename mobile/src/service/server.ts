import axios, {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import store from '../redux/store';

interface ServerConfig {
  IP: string;
  PORT: number;
}

export const IN_PRODUCTION: boolean = Config.IN_PRODUCTION == 'true';
export const IS_CONNECTION_SECURE: boolean =
  Config.IS_CONNECTION_SECURE == 'true';

const productionConfig: ServerConfig = {
  IP: Config.PRODUCTION_IP,
  PORT: Number.parseInt(Config.PRODUCTION_PORT),
};

const developmentConfig: ServerConfig = {
  IP: Config.DEVELOPMENT_IP,
  PORT: Number.parseInt(Config.DEVELOPMENT_PORT),
};

export const serverConfig: ServerConfig = IN_PRODUCTION
  ? productionConfig
  : developmentConfig;

export const SERVER_BASE_URL = `http${IS_CONNECTION_SECURE ? 's' : ''}://${
  serverConfig.IP
}:${serverConfig.PORT}/`;

export const backendTemplateConfig: AxiosRequestConfig = {
  baseURL: SERVER_BASE_URL,
};

const basePositionStackConfig: AxiosRequestConfig = {
  baseURL: Config.BASE_POSITION_STACK_URL,
};

const baseMapquestConfig: AxiosRequestConfig = {
  baseURL: Config.BASE_MAPQUEST_URL,
};

export const mapquest = axios.create(baseMapquestConfig);

export const positionStack = axios.create(basePositionStackConfig);

/**
 * @returns The most updated `AxiosInstance` backend version.
 */
export const backend = () =>
  axios.create({
    ...backendTemplateConfig,
    headers: {
      Authorization: `Bearer ${store.getState().user?.token.access}`,
    },
  });
