import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  let appointmentOfDays;

  for (const day of state.days) {
    if (state.day === day.name) {
      appointmentOfDays = day.appointments;
    }
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

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
      const updateSpots = () => {
        let spotCount = 0;

        for (const appointment in appointments) {
          if (appointmentOfDays.includes(Number(appointment))) {
            if (appointments[appointment].interview === null) {
              spotCount++;
            }
          }
        }

        return spotCount;
      };

      let dayUpdate = {};

      for (const day of state.days) {
        if (state.day === day.name) {
          dayUpdate = {
            ...day,
            spots: updateSpots(),
          };
        }
      }

      const dayIndex = dayUpdate.id - 1;
      const newDays = [
        ...state.days.slice(0, dayIndex),
        dayUpdate,
        ...state.days.slice(dayIndex + 1),
      ];

      console.log(newDays);

      setState({
        ...state,
        appointments,
        days: newDays,
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
      const updateSpots = () => {
        let spotCount = 0;

        for (const appointment in appointments) {
          if (appointmentOfDays.includes(Number(appointment))) {
            if (appointments[appointment].interview === null) {
              spotCount++;
            }
          }
        }

        return spotCount;
      };

      let dayUpdate = {};

      for (const day of state.days) {
        if (state.day === day.name) {
          dayUpdate = {
            ...day,
            spots: updateSpots(),
          };
        }
      }

      const dayIndex = dayUpdate.id - 1;
      const newDays = [
        ...state.days.slice(0, dayIndex),
        dayUpdate,
        ...state.days.slice(dayIndex + 1),
      ];

      console.log(newDays);
      setState({
        ...state,
        appointments,
        days: newDays
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
