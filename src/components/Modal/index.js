import React from 'react';
import * as ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css';


ReactModal.setAppElement('#root');

const modalCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        height: '55vh',
        overflow: 'visible'
    }
};


const DatePick = (props) => {
    return (
        <DatePicker
            {...props}

            required={true}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect={true}
            timeCaption="Time"
            timeFormat="HH:mm"
            timeIntervals={30}
            showMonthDropdown={true}
            showWeekNumbers={true}
            shouldCloseOnSelect={true}
            popperModifiers={{
                offset: {
                    enabled: true,
                    offset: '-40px, 0px'
                }
            }}
        />
    )
};
export const Modal = (props) => {
    const {setModalEvent, modal, isNewEvent, handleEventSave, handleEventDelete, modalEvent, closeModal} = props;
    const {title, start, end, desc} = modalEvent;

    const handleInputChange = (event) => {
        const key = event.target.name;
        const inputValue = event.target.value;
        setModalEvent({
            ...modalEvent,
            [key]: inputValue
        });
    };

    const handleStartDateChange = (startDate) => {
        setModalEvent({
            ...modalEvent,
            start: startDate
        });
    };

    const handleEndDateChange = (endDate) => {
        setModalEvent({
            ...modalEvent,
            end: endDate
        });
    };

    const handleSubmitButton = (e) => {
        e.preventDefault();
        if (start > end) {
            return alert(`Error, time paradox!!!\nEvent end date can not be earlier than event start date!`);
        }
        handleEventSave(modalEvent);
        closeModal();
    };

    return (
        <ReactModal
            isOpen={modal}
            style={modalCustomStyles}
            shouldCloseOnOverlayClick={true}
            onRequestClose={closeModal}
            closeTimeoutMS={200}
        >
            <form onSubmit={handleSubmitButton} className="form-wrapper">
                <div className="input-flex">
                    <label>
                        Event title
                    </label>
                    <input name={'title'} type="text" value={title || ''} onChange={handleInputChange}
                           placeholder="No title"
                           required autoFocus/>
                </div>
                <div className="input-flex">
                    <label>
                        Event start
                    </label>
                    <DatePick
                        name={'start'}
                        selected={start}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="input-flex">
                    <label>
                        Event end
                    </label>
                    <DatePick
                        name={'end'}
                        selected={end}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div>
                    <textarea name={'desc'} value={desc} onChange={handleInputChange} placeholder="Event description"/>
                </div>
                <div className="modal-buttons">
                    {isNewEvent &&
                    <button type="button" onClick={() => handleEventDelete(modalEvent)}>Delete event</button>}
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </ReactModal>
    )
};