import { v4 as uuid } from "uuid";

let tickets = [
  {
    id: uuid(),
    title: "Summer Concert",
    description:
      "Are you ready to experience the concert of a lifetime? Get ready to be blown away by the incredible music, dazzling lights, and unforgettable atmosphere that only a live concert can offer.",
    date: "2020-12-03",
    price: "25",
    place: "Hillbottom",
    image:
      "https://img.freepik.com/free-vector/live-concert-ticket_53876-67419.jpg?size=626&ext=jpg&ga=GA1.2.1624204321.1680518598&semt=ais",
  },
];

export const getTickets = (req, res) => res.send(tickets);

export const createTicket = (req, res) => {
  const ticket = req.body;
  tickets.push({ ...ticket, id: uuid() });
  res.send("Ticket with detail has been added Successfully");
};
export const deleteTicket = (req, res) => {
  const id = req.params.id;
  const ticket = tickets.find((ticket) => ticket.id === id);
  if (ticket) {
    tickets = tickets.filter((ticket) => ticket.id !== id);
    res.send("Ticket has been deleted Successfully");
  } else {
    res.send("Ticket with id not found");
  }
};
export const updateTicket = (req, res) => {
  const id = req.params.id;
  const ticket = tickets.find((ticket) => ticket.id === id);
  if (ticket) {
    tickets = tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, ...req.body };
      }
      return ticket;
    });
    res.send("Ticket has been updated Successfully");
  } else {
    res.send("Ticket with id not found");
  }
};
export const getTicket = (req, res) => {
  const id = req.params.id;
  const ticket = tickets.find((ticket) => ticket.id === id);
  if (ticket) {
    res.send(ticket);
  } else {
    res.send("Ticket with id not found");
  }
};

export default tickets;
