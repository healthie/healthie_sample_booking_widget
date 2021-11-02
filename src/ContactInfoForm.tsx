import React, { useEffect, useState }  from 'react';
import { Form, Field } from 'react-final-form'
import rootUrl from './config/rootUrl';

import {
  useMutation,
  gql} 
from "@apollo/client";


const COMPLETE_BOOKING = gql`
  mutation completeCheckout(
    $appointment_location_id: String,
    $appointment_type_id: String,
    $contact_type: String,
    $date: String,
    $first_name: String,
    $last_name: String,
    $email: String,
    $phone_number: String,
    $provider_id: String,
    $timezone: String,
  ) {
    completeCheckout(
      input: {
        appointment_location_id: $appointment_location_id,
        appointment_type_id: $appointment_type_id,
        contact_type: $contact_type,
        date: $date,
        timezone: $timezone,
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        phone_number: $phone_number,
        provider_id: $provider_id,
      }
    ) {
      appointment {
        provider {
          id
          full_name
        }
        id
        date
        start
        end
        location
        contact_type
        add_to_gcal_link
        appointment_type {
          id
          name
          length
        }
      }
      messages {
        field
        message
      }
    }
  }
`;

function ContactInfoForm(props: any) {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const required = (value: any) => (value ? undefined : 'Required')

  const [completeBooking, { data, loading, error }] = useMutation(COMPLETE_BOOKING);

  const submitForm = async (values: any) => {
    const slot = props.selectedSlot
    
    const convertedValues = {
      ...values,
      date: slot.date,
      provider_id: slot.user_id,
      appointment_type_id: (props.selectedAppointmentType || {}).id,
      contact_type: props.selectedContactType,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    };

     const {
      data: { completeCheckout: payload }
    } = await completeBooking({variables: convertedValues});

    if (!payload.messages && payload.appointment) {
      props.setBookedAppointment(payload.appointment)
      return; 
    } else {
      const error = payload.messages ? payload.messages[0] : null
      if (error?.message) {
        alert(error.message)
        return;
      } else {
        alert(payload.messages)
        return;
      }
    }
  }

  return (
      <div className="embedded-user-form contact-information">
        <Form
    onSubmit={submitForm}
    render={({ handleSubmit, submitting }) => (
      <form className="contact-information-form" onSubmit={handleSubmit}>
        <div className="embedded-main-title">
            Contact Information
        </div>

        <div className="user-form-row">
          <Field
            name="first_name"
            validate={required}
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>First Name</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. Alice'} {...input} />
                </div>
                {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
              </div>
            )}
          />

          <Field
            name="last_name"
            validate={required}
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>Last Name</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. Smith'} {...input} />
                </div>
                {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
              </div>
            )}
          />
        </div>

        <div className="user-form-row">
          <Field
            name="email"
            validate={required}
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>Email</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. alice.smith@example.com'} {...input} />
                </div>
                {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
              </div>
            )}
          />

          <Field
            name="phone_number"
            validate={required}
            render={({ input, meta }) => (
              <div className="field">
                <div>
                  <label className="label" htmlFor={input.name}>Phone Number</label>
                </div>
                <div className="control">
                  <input className="input" placeholder={'Ex. 555-555-5555'} {...input} />
                </div>
                {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
              </div>
            )}
          />
        </div>

        { props.selectedContactType ? 
        <div className="field">
          <div>
            <label className="label">Contact Type</label>
          </div>
          <div className="control">
            {props.selectedContactType}
          </div>
        </div> : null }

        <div style={{margin: "20px 0px"}}>
          <div className="has-text-centered">
              <button className={`sw-button primary-button is-relative continue-button ${
                        submitting ? "is-loading" : ""
                      }`}
                value="Continue">
                  Confirm Appointment
              </button>
          </div>
        </div>

      </form>
    )}
  />
      </div>
  );

}

export default ContactInfoForm;
