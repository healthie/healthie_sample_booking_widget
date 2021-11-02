import React, { useEffect, useState }  from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns'
import rootUrl from './config/rootUrl';

import {
  useQuery,
  gql} 
from "@apollo/client";


const DAYS_AVAILABLE_FOR_RANGE = gql`
  query daysAvailableForRange(
      $provider_id: String
      $date_from_month: String
      $org_level: Boolean
      $contact_type: String
      $timezone: String
      $provider_ids: [String]
      $appt_type_id: String
      $appt_loc_id: String
      $clients_can_join_waitlist: Boolean,
      $appointment_to_reschedule_id: ID,
    ) {
      daysAvailableForRange(
        provider_id: $provider_id
        date_from_month: $date_from_month
        org_level: $org_level
        contact_type: $contact_type
        timezone: $timezone
        provider_ids: $provider_ids
        appt_type_id: $appt_type_id
        appt_loc_id: $appt_loc_id
        clients_can_join_waitlist: $clients_can_join_waitlist,
        appointment_to_reschedule_id: $appointment_to_reschedule_id,
      )
    }
`;

function DayPicker(props: any) {


  const { loading, error, data } = useQuery(DAYS_AVAILABLE_FOR_RANGE, {
    variables: {
      org_level: false,
      date_from_month: props.selectedDay,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      appointment_type_id: props.selectedAppointmentType.id,
      provider_id: props.providerId
    }
  });

  const highlightDates = data && data.daysAvailableForRange 
      ? data.daysAvailableForRange.map((day: string) => parse(day, "yyyy-MM-dd", new Date()))
      : [];

  return (
      <div className="embeddable-book-cal-container">
          <DatePicker
            inline
            useWeekdaysShort={true}
            onMonthChange={(e: any) => props.setSelectedDay(e)}
            onChange={(e: any) => props.setSelectedDay(e)}
            selected={props.selectedDay}
            highlightDates={highlightDates}
          />
      </div>
  );

}

export default DayPicker;
