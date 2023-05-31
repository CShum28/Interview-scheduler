export function getAppointmentsForDay(state, day) {
  const result = [];
  const daysList = state.days;
  let appointmentsList;
  let appointmentDays = [];
  for (const days of daysList) {
    appointmentDays.push(days.name);
    if (days.name === day) {
      appointmentsList = days.appointments;
    }
  }
  //Check to see if 'day' argument exists or not
  if (!appointmentDays.includes(day)) {
    return [];
  }
  //Loops through appointments and returns the matching results
  const appointments = state.appointments;
  for (const appointment in appointments) {
    if (appointmentsList.includes(Number(appointment))) {
      const appointmentInfo = appointments[appointment];
      result.push(appointmentInfo);
    }
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const daysList = state.days;
  let interviewersList;
  let appointmentDays = [];
  for (const days of daysList) {
    appointmentDays.push(days.name);
    if (days.name === day) {
      interviewersList = days.interviewers;
    }
  }
  //Check to see if 'day' argument exists or not
  if (!appointmentDays.includes(day)) {
    return [];
  }
  //Loops through appointments and returns the matching results
  const interviews = state.interviewers;
  for (const interview in interviews) {
    if (interviewersList.includes(Number(interview))) {
      const interviewInfo = interviews[interview];
      result.push(interviewInfo);
    }
  }
  // console.log(result);
  return result;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
