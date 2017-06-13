import Mapper from './Mapper/Mapper';
import ActionTypes from './ActionTypes';

export default class Bind extends Mapper {

    constructor(DOMtarget, state, config) {
        super(DOMtarget, config);
        this.state = state;
        this.config = config;
    }

    changeNotice(newState) {
        const action = { type: null, index: null, source: newState };
        if (newState.length > this.state.length) {
            action.type = ActionTypes.ADD_SOURCE, action.index = newState.length - 1;
        } else if (newState.length < this.state.length) {
            action.type = ActionTypes.DELETE_SOURCE;
            for (let i = 0; i < this.state.length; i++) { if (newState.indexOf(this.state[i]) < 0) action.index = i; }
        } else {
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].invalid !== this.state[i].invalid) {
                action.type = ActionTypes.CHECK_SOURCE, action.index = i;
                } else if (newState[i].staple !== this.state[i].staple) {
                action.type = ActionTypes.STAPLE_SOURCE, action.index = i;
                } else if (newState[i].color.join() !== this.state[i].color.join()) {
                    action.type = ActionTypes.COLOR_SOURCE, action.index = i;
                }
            }
        }
        this.state = newState;
        this.change(action)
    }

    updateNotice(newConfig) {
        const action = { type: null, index: null, config: newConfig }
        for (let key in newConfig) {
            if (newConfig.alpha.toString() !== this.config.alpha.toString()) {
                action.type = ActionTypes.CHANGE_ALPHA;
                this.change(action);
            } else if (newConfig.strokeColor.toString() !== this.config.strokeColor.toString()) {
                    action.type = ActionTypes.CHANGE_STROKE_COLOR;
                this.change(action);
            }
        } 
        this.config = newConfig;
        this.update(action)
    }

}
