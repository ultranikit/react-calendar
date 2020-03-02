import * as action_type from './constants.js';

export const setModalEvent = (payload) => ({
    type: action_type.SET_MODAL_EVENT,
    payload
});

export const setNewEvent = (payload) => ({
    type: action_type.SET_NEW_EVENT,
    payload
});

export const setEvents = (payload) => ({
    type: action_type.SET_EVENTS,
    payload
});

export const clearModalEvent = () => ({
    type: action_type.CLEAR_MODAL_EVENT
});

export const deleteEvent = (payload) => ({
    type: action_type.DELETE_EVENT,
    payload
});

export const updateEvent = (payload) => ({
    type: action_type.UPDATE_EVENT,
    payload
});