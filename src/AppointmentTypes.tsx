import React, { useEffect, useState }  from 'react';
import AppointmentTypeOption from './_AppointmentTypeOption'
import rootUrl from './config/rootUrl';

import {
  useQuery,
  gql} 
from "@apollo/client";


const APPOINTMENT_TYPES = gql`
  query appointmentTypes(
                         $clients_can_book: Boolean,
                          $provider_id: String
  ) {
      appointmentTypes(provider_id: $provider_id,
                       clients_can_book: $clients_can_book ) {
        id
        name
        length
        available_contact_types
        is_group
      }
  }
`;

function AppointmentTypes(props: any) {

  const { loading, error, data } = useQuery(APPOINTMENT_TYPES, {
    variables: { provider_id: props.providerId, clients_can_book: true },
  });

  if (!data) {
    return null;
  }

  const apptReadyToConfirm = !!(props.selectedAppointmentType && props.selectedContactType);

  return (
    <div className="appointment-types-container">
    <div className="embedded-appointment-type-container__title">Select Appointment Type</div>
      {data.appointmentTypes.map((item: any) => (
        <AppointmentTypeOption 
          key={item.id} 
          appointmentType={item}
          selectedAppointmentType={props.selectedAppointmentType}
          setAppointmentType={props.setAppointmentType} 
          selectedContactType={props.selectedContactType}
          setContactType={props.setContactType}
        />
      ))}
    <span className="confirm-appt-type-button-box">
      <button className="sw-button primary-button confirm-appt-type-button" 
              disabled={!apptReadyToConfirm}
              onClick={props.moveToNextStep}>
        Confirm Appointment Type
      </button>
    </span>
    </div>
  );
}

export default AppointmentTypes;
