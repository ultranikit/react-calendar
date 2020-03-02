import {combineReducers} from 'redux';
import * as action_type from './constants.js';
// state for start

const thisMonth = new Date().getMonth();
const initialState = {
    events: [
        {
            id: 1,
            title: 'All Day Event very long title',
            // allDay: true,
            start: new Date(2020, thisMonth, 27, 0),
            end: new Date(2020, thisMonth, 27, 20),
        }
    ],
    modalEvent: {
        title: '',
        start: null,
        end: null,
        desc: '',
        id: null
    }
};

function calendarReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case action_type.SET_MODAL_EVENT:
            return {
                ...state,
                modalEvent: payload
            };

        case action_type.SET_EVENTS:
            return {
                ...state,
                events: payload
            };

        case action_type.SET_NEW_EVENT:
            return {
                ...state,
                events: [...state.events, payload]
            };

        case  action_type.UPDATE_EVENT:
            const newArray = state.events.slice();
            const findIndex = newArray.findIndex(item => item.id === payload.id);
            newArray[findIndex] = payload;
            return {
                ...state,
                events: newArray
            };

        case action_type.DELETE_EVENT:
            return {
                ...state,
                events: [
                    ...state.events.slice(0, payload),
                    ...state.events.slice(payload + 1)
                ]
            };

        case action_type.CLEAR_MODAL_EVENT:
            return {
                ...state,
                modalEvent: {
                    title: '',
                    start: null,
                    end: null,
                    desc: '',
                    id: null
                }
            };

        default:
            return state;
    }
}

export const reducer = combineReducers({
    calendar: calendarReducer,
});