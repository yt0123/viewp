import ActionTypes from '../constants/ActionTypes';
import LogManager from '../constants/Logger';
import Mapper from '../constants/Mapper';

const bind = store => next => action => {
    const logger = LogManager.getLogger('ty.edelweiss.viewp.Bind');
    logger.info('dispatching', action.type);

    const result = next(action)
    //Mapper(action.type, store.getState())
    return result
};

export default bind;
