import React, { useEffect, useState }  from 'react';
import AppointmentTypes from './AppointmentTypes'
import DateTimeSelector from './DateTimeSelector'
import ContactInfoForm from './ContactInfoForm'
import CompletedBookingInfo from './_CompletedBookingInfo'
import EmbeddableHeader from './_EmbeddableHeader'
import rootUrl from './config/rootUrl';

import {
  useQuery,
  gql} 
from "@apollo/client";

const WIDGET_STEPS = gql`
  query getWidgetSteps($locationString: String!) {
    embedWidgetSteps(locationString: $locationString) {
      title
      id
    }
  }
`;

function WidgetStateHolder(props: any) {
  const [selectedAppointmentType, setAppointmentType] = useState();
  const [selectedContactType, setContactType] = useState();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState();
  const [bookedAppointment, setBookedAppointment] = useState();

  const { loading, error, data } = useQuery(WIDGET_STEPS, {
    variables: { locationString: `?dietitian_id=${props.providerId}` },
  });

  const steps = data?.embedWidgetSteps || []

  if (loading || error) {
    return null;
  }

  const currentStep: any = steps[stepIndex]

  if (!currentStep) {
    return null;
  }


  if (bookedAppointment) {
    return (<CompletedBookingInfo
              bookedAppointment={bookedAppointment}
               />)
  }


  if (currentStep.id === "select_appt_type") {
    return (
      <>
        <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"} />
        <AppointmentTypes
          selectedAppointmentType={selectedAppointmentType}
          selectedContactType={selectedContactType}
          setContactType={setContactType}
          providerId={props.providerId}
          setAppointmentType={setAppointmentType} 
          moveToNextStep={() => setStepIndex(stepIndex + 1)}
        />
      </>
    );
  }

  if (currentStep.id === "select_date_time") {
    return (
      <>
      <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"} />
      <DateTimeSelector
        selectedAppointmentType={selectedAppointmentType}
        providerId={props.providerId}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        moveToNextStep={() => setStepIndex(stepIndex + 1)}
      />
      </>
    );
  }
  
  if (currentStep.id === "your_information") {
    return (
       <>
      <EmbeddableHeader
          stepIndex={stepIndex}
          embedWidgetSteps={steps}
          setStepIndex={setStepIndex}
          headerText={"Book an Appointment"} />
      <ContactInfoForm
        selectedAppointmentType={selectedAppointmentType}
        selectedSlot={selectedSlot}
        selectedContactType={selectedContactType}
        moveToNextStep={() => setStepIndex(stepIndex + 1)}
        setBookedAppointment={setBookedAppointment}
      />
      </>
    );
  }

  return null;

}

export default WidgetStateHolder;
