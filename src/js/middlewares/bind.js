import ActionTypes from '../constants/ActionTypes';
import LogManager from '../constants/Logger';
import Mapper from '../constants/Mapper';

const bind = store => next => action => {
    const logger = LogManager.getLogger('ty.edelweiss.viewp.Bind');
    logger.info('dispatching', action.type);

    const result = next(action)
    const state = store.getState();
    Mapper.change(action, state.sources);
    Mapper.update(action, state.config);
    return result
};

export default bind;
