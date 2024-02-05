/* istanbul ignore file */
import {Property} from '../../../types/Property';
import ReduxProps from '../../../types/redux/props';
import {ReduxSliceManager} from '../../../types/redux/SliceUpdater';
import {ResponseHandler} from '../../../utilities/errors/backend/SessionManager';
import SessionManager from '../../../utilities/errors/backend/SessionManager';

export default class Retriever<T = any> {
  private sessionManager: SessionManager<undefined, T, Property[]>;
  constructor(
    url: string,
    props: ReduxProps,
    responseHandler: ResponseHandler<T, Property[]>,
    reduxSliceManager?: ReduxSliceManager<Property[], T>,
  ) {
    this.sessionManager = new SessionManager(
      undefined,
      url,
      'GET',
      props,
      responseHandler,
      reduxSliceManager,
    );
  }

  public query(): Promise<Property[]> {
    return this.sessionManager.query();
  }
}
