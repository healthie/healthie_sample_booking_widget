import React, { useEffect, useState }  from 'react';

import {
  default as BuildingIcon
} from "./components/icons/_BuildingIcon";

import {
  default as NewTeleheathIcon
} from "./components/icons/_NewTeleheathIcon";

import {
  default as HandsetIcon
} from "./components/icons/_HandsetIcon";

import {
  default as CheckMarkIcon
} from "./components/icons/_CheckMarkIcon";

  function getContactIcon(contactType: string) {
    switch(contactType) {
      case "Healthie Telehealth":
      case "Healthie Video Call":
      case "Secure Videochat":
        return <NewTeleheathIcon width="16px" height="16px" color="#4a90e2"/>
      case "In Person":
        return <BuildingIcon width="16px" height="16px" color="#4a90e2" opacity="1"/>
      case "Phone Call":
        return <HandsetIcon width="16px" height="16px" color="#4a90e2" opacity="1"/>
      case "picked-contact":
        return <CheckMarkIcon width="16px" height="16px" color="#ffffff"/>
      default: return null
    }
  }

  function getButtonText(contactType: string) {
    switch(contactType) {
      case 'Healthie Telehealth':
      case 'Healthie Video Call':
      case 'Secure Videochat':
        return 'Video Call'
      default: return contactType
    }
  }


function formatAvailableTypes(types: Array<string>) {
    const format = types.length >=3 ? ', or $1' : ' or $1';
    return types.join(', ').replace(/, ([^,]*)$/, format);
}

function getContactTypeButtons(contactTypes: [string], selectedContactType: string, setContactType: (obj: any) => null) {

    return (
      <div className="embedded-appointment-contact-types">
        { contactTypes.map((item: string, idx: number) => {
            const picked = item === selectedContactType;

            return (
              <div
                key={idx}
                onClick={() => setContactType(item)}
                className={`embedded-appointment-contact${picked ? " picked-contact" : "" }`}>

                {getContactIcon(picked ? "picked-contact" : item)}
                <span>{getButtonText(item)}</span>
              </div>
            )
          })
        }
      </div>
    );
  }

function AppointmentTypeOption(props: any) {
  
  const appointmentType = props.appointmentType

  if (!appointmentType) {
    return null;
  }
  
  const isActive = props.selectedAppointmentType === appointmentType

  return (
          <div key={appointmentType.id} className={`appointment-type-option ${isActive ? "active" : ""}`} onClick={() => props.setAppointmentType(appointmentType)}>
            <div className="embedded-appointment-type-info-box">
              <div className="circle-indicator "></div>
              <div className="embedded-appointment-type-info">
                <div className="embedded-appointment-type-name">
                  {appointmentType.name}
                </div>
                <div className="embedded-appointment-type-length">
                  {appointmentType.length} Minutes
                </div>
              </div>
            </div>
            <div className="embedded-appointment-types">
            { isActive ?
              getContactTypeButtons(appointmentType.available_contact_types, props.selectedContactType, props.setContactType)
            :
              formatAvailableTypes(appointmentType.available_contact_types)
            }
          </div>
          </div>
  );
}

export default AppointmentTypeOption;
