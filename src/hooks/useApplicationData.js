import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (appointments) => {
    // reminder that you should never change the initial state (ex. state.day, state.days, etc.) or anything
    // always copy it first if you want to make changes
    // copy, make changes, then copy the change over
    let daysCopy = [ ...state.days ]
    let daysIndex;
    let appointmentOfDays;
    let spotCount = 0;

    // loop through daysCopy array to find the appointments for the day
    for (let i = 0; i < daysCopy.length; i++) {
      if (state.day === daysCopy[i].name) {
        appointmentOfDays = daysCopy[i].appointments;
        daysIndex = i;
        break;
      }
    }

    // count the null spots for the appointments
    for (const appointment in appointments) {
      if (appointmentOfDays.includes(Number(appointment))) {
        if (appointments[appointment].interview === null) {
          spotCount++;
        }
      }
    }

    //updates the spots inside of daysCopy
    daysCopy[daysIndex].spots = spotCount

    return daysCopy
  };

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = function (id, interview) {
    // update the appointment's interview state
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // update appointments of the id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(appointments),
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(appointments),
      });
    });
  };

  const daysApi = `/api/days`; // because in package.json we have - "proxy": "http://localhost:8001" - all we need is the endpoint
  const appointmentsApi = `/api/appointments`;
  const interviewersApi = `/api/interviewers`;

  useEffect(() => {
    Promise.all([
      axios.get(daysApi),
      axios.get(appointmentsApi),
      axios.get(interviewersApi),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
