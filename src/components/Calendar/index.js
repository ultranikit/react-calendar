import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import {setModalEvent, setNewEvent, setEvents, clearModalEvent, deleteEvent, updateEvent} from '../../store'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from 'moment';

import {Modal} from '../Modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './index.css';

const localizer = momentLocalizer(moment);


const mapStateToProps = state => ({
    modalEvent: state.calendar.modalEvent,
    events: state.calendar.events
});

const DnDCalendar = withDragAndDrop(Calendar);

export const MyCalendar = connect(mapStateToProps, {
    setModalEvent,
    setNewEvent,
    setEvents,
    clearModalEvent,
    deleteEvent,
    updateEvent
})(props => {
    const {setModalEvent, clearModalEvent, deleteEvent, updateEvent, setNewEvent, modalEvent, events} = props;

    const [isNewEvent, setIsNewEventModal] = useState(false);
    const [modal, setModal] = useState(false);

    const handleEventSave = (saveElem) => {
        const findItemIndex = events.findIndex(item => item.id === saveElem.id);
        if (findItemIndex > -1) return updateEvent(saveElem);
        setNewEvent(saveElem);
    };

    const handleEventDelete = (deleteElem) => {
        const findIndex = events.findIndex(item => item.id === deleteElem.id);
        return deleteEvent(findIndex);
    };

    const selectSlot = (event) => {
        event.start = event.slots[0];
        event.end = event.slots[event.slots.length - 1];
        setIsNewEventModal(false);
        openModal(event)
    };

    const selectEvent = (event) => {
        setIsNewEventModal(true);
        openModal(event);
    };

    const openModal = (event) => {
        const id = event.id ? event.id : Date.now();
        setModal(true);
        setModalEvent({
            ...event,
            id
        })
    };

    const closeModal = () => {
        setModal(false);
        clearModalEvent();
    };

    // const onEventResize = (type, {event, start, end, allDay}) => {
    //     this.setState(state => {
    //         state.events[0].start = start;
    //         state.events[0].end = end;
    //         return {events: state.events};
    //     });
    // };
    const onEventDrop = ({event, start, end, allDay}) => {
        const updatedEvent = {...event, start, end};
        updateEvent(updatedEvent)
    };

    const getEventStyles = (event, start) => {
        start = new Date(start);
        const style = {};
        const eventStartDate = start.getDate();
        const eventStartMonth = start.getMonth();

        const currentDate = new Date().getDate();
        const currentMonth = new Date().getMonth();

        if (eventStartDate === currentDate && eventStartMonth === currentMonth) {
            style.backgroundColor = 'green';
        } else if (eventStartDate < currentDate) {
            if (eventStartMonth <= currentMonth) {
                style.backgroundColor = 'red';
            } else {
                style.backgroundColor = 'blue';
            }
        } else if (start > currentDate) {
            if (eventStartMonth < currentMonth) {
                style.backgroundColor = 'red';
            } else {
                style.backgroundColor = 'blue';
            }
        }
        if (event.bgColor) {
            style.backgroundColor = event.bgColor;
        }
        return {style};
    };

    return (
        events &&
        <Fragment>
            <DnDCalendar style={{height: 700}}
                         localizer={localizer}
                         selectable
                         events={events}
                         onEventDrop={onEventDrop}

                         resizable
                         defaultDate={new Date()}
                         min={new Date(0, 0, 0, 10, 0, 0)}
                         max={new Date(0, 0, 0, 22, 0, 0)}
                         popup
                         onSelectEvent={selectEvent}
                         onSelectSlot={selectSlot}
                         eventPropGetter={getEventStyles}
            />
            <Modal
                modal={modal}
                isNewEvent={isNewEvent}
                setModalEvent={setModalEvent}
                modalEvent={modalEvent}
                handleEventSave={handleEventSave}
                handleEventDelete={handleEventDelete}
                closeModal={closeModal}
            />
        </Fragment>

    )
});
