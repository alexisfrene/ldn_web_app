import { CalendarEvent } from "@event-calendar-types/types";
import { toast } from "sonner";
import { axiosInstance } from "@utils";

export const createEvent = async (data: CalendarEvent) => {
  try {
    const res = await axiosInstance.post("/event-calendar", data);
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una createEvent");
    console.error("ERROR IN createEvent:", error);
  }
};

export const getEvents = async () => {
  try {
    const res = await axiosInstance.get("/event-calendar");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una getEvents");
    console.error("ERROR IN getEvents:", error);
  }
};

export const editEvent = async ({
  id,
  data,
}: {
  id: string;
  data: CalendarEvent;
}) => {
  try {
    const res = await axiosInstance.put(`/event-calendar/${id}`, data);
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una editEvent");
    console.error("ERROR IN editEvent:", error);
  }
};
export const deleteEvent = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/event-calendar/${id}`);
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una deleteEvent");
    console.error("ERROR IN deleteEvent:", error);
  }
};
