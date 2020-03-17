import {combineReducers} from 'redux';
import * as action_type from './constants.js';
// state for start

const thisMonth = new Date().getMonth();

const loadStorage = () => {
    const storage = localStorage.getItem('events');
    if (storage) return JSON.parse(storage);
    return [];
};

const saveToStorage = (updatedArray) => {
    localStorage.setItem('events', JSON.stringify(updatedArray));
};

const initialState = {
    events: loadStorage()
    //     [
    //     {
    //         id: 1,
    //         title: 'All Day Event very long title',
    //         // allDay: true,
    //         start: new Date(2020, thisMonth, 27, 0),
    //         end: new Date(2020, thisMonth, 27, 20),
    //     }
    // ]
    ,
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
    let updatedArray;
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
            updatedArray = [...state.events, payload];
            saveToStorage(updatedArray);
            return {
                ...state,
                events: updatedArray
            };

        case  action_type.UPDATE_EVENT:
            updatedArray = state.events.slice();
            const findIndex = updatedArray.findIndex(item => item.id === payload.id);
            updatedArray[findIndex] = payload;
            saveToStorage(updatedArray);
            return {
                ...state,
                events: updatedArray
            };

        case action_type.DELETE_EVENT:
            updatedArray = [
                ...state.events.slice(0, payload),
                ...state.events.slice(payload + 1)
            ];

            return {
                ...state,
                events: updatedArray
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