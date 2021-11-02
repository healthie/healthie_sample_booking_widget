import React from 'react';
import { toDate } from './utils/dateUtils'
import { format } from 'date-fns'

import {
  default as SuccessIcon
} from "./components/icons/_SuccessIcon";

import {
  default as LocationOnMapIcon
} from "./components/icons/_LocationOnMapIcon";

import {
  default as CalendarSheetIcon
} from "./components/icons/_CalendarSheetIcon";

import {
  default as ClockIcon
} from "./components/icons/_ClockIcon";

import {
  default as LocationSpotIcon
} from "./components/icons/_LocationSpotIcon";

function CompletedBookingInfo(props: any) {
  
  const appointment = props.bookedAppointment

  const isAppointment = !!appointment;
  const subContainerClasses = 'only-appointment';

  return (
      <div className={`embedded-confirmation-container ${subContainerClasses}`}>
        <SuccessIcon width="55px" height="43px" color="#5cad46" />

        { isAppointment ?
          <>
            
              <div className="embeded-confirmation-message">
                You’re booked!
              </div>

            <div className="embedded-items-container">
              <div className="embedded-details embedded-sub-text">
                Session Details
              </div>
              <div className="embedded-item">
                <LocationOnMapIcon width="22px" height="24px" color="#999999"/>
                {appointment.appointment_type.name}
              </div>
              <div className="embedded-item">
                <CalendarSheetIcon />
                {format(toDate(appointment.start), 'EEEE - MMM d, yyyy')}
              </div>
              <div className="embedded-item">
                <ClockIcon width="24px" height="24px" color="#999999" opacity='1' />
                {format(toDate(appointment.start), 'h:mm')} - {format(toDate(appointment.end), 'h:mm a (z)')}
              </div>
              <div className="embedded-item">
                <LocationSpotIcon />
                { appointment.contact_type === "In Person" ?
                    appointment.location
                  :
                  appointment.contact_type
                }
              </div>
            </div>
          </>
        :
          null
        }
        
    </div>
    );
}

export default CompletedBookingInfo;

