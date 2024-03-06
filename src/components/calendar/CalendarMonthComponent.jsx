import React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function CalendarMonthComponent(props) {
    console.log(props.events);

    return (
        <>
            <FullCalendar
                timeZone='UTC'
                nextDayThreshold={'00:00:00'}
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                displayEventEnd={false}
                displayEventTime={false}
                events={props.events}
                eventClick={(info) => {
                    info.jsEvent.preventDefault();

                    console.log(info.event.extendedProps.description);
                }}
            />
        </>
    );
}

export default CalendarMonthComponent;
