import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByTestId,
} from "@testing-library/react";

import Application from "components/Application";
import exp from "constants";
import Appointment from "components/Appointment";
import { appendFile } from "fs";

afterEach(cleanup);

// The Jest framework will replace any axios import with this mock module instead.
// From src/__mocks__/axios.js because Application uses axios
// Since Application uses axios - the data will automatically be replaced by src/__mocks__/axios.js

describe("testing app", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, /Add/i));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));
    fireEvent.click(getByText(appointment, /Save/i));
    // debug(prettyDOM(appointment));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, /Delete/i));
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, /Delete the appointment?/i)
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, /confirm/i));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment, /add/i));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug(prettyDOM(day));
    // console.log(prettyDOM(appointment));
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. render the application
    const { container } = render(<Application />);
    // 2. wait for container to load w. Archie Cohen as text
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, /edit/i));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Clement" },
    });

    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Clement"));

    const day = getAllByTestId(container, /day/i).find((day) =>
      queryByText(day, /monday/i)
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
    // console.log(prettyDOM(container));
  });

  /* test number five */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, /appointment/i);
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, /add/i));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Clement" },
    });

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    fireEvent.click(getByText(appointment, /save/i));

    await waitForElement(() =>
      getByText(appointment, /Could not save appointment/i)
    );

    expect(
      getByText(appointment, /Could not save appointment/i)
    ).toBeInTheDocument();

    // console.log(prettyDOM(appointment));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, /appointment/i).find(
      (appointment) => queryByText(appointment, /Archie Cohen/i)
    );

    fireEvent.click(getByAltText(appointment, /delete/i));
    fireEvent.click(getByText(appointment, /confirm/i));

    await waitForElement(() =>
      getByText(appointment, /Could not delete appointment/i)
    );

    expect(
      getByText(appointment, /Could not delete appointment/i)
    ).toBeInTheDocument();
    // console.log(prettyDOM(appointment));
  });
});
