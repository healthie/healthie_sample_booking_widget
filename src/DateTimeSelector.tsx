import React, { useEffect, useState }  from 'react';
import DayPicker from './_DayPicker'
import AvailableSlots from './_AvailableSlots'


function DateTimeSelector(props: any) {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
      <div className="embedded-scheduler-container">
        <div className="embedded-scheduler-container__title">
          Select Date and Time
        </div>

        <DayPicker 
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedAppointmentType={props.selectedAppointmentType}
          providerId={props.providerId}
          />

        <AvailableSlots
          selectedDay={selectedDay}
          setSelectedSlot={props.setSelectedSlot}
          selectedSlot={props.selectedSlot}
          selectedAppointmentType={props.selectedAppointmentType}
          providerId={props.providerId}
          moveToNextStep={props.moveToNextStep}
        />
      </div>
  );

}

export default DateTimeSelector;
