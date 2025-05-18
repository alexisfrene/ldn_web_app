import { useEffect, useState } from "react";
import { CalendarEvent } from "@event-calendar-types/types";
import { EventCalendar } from "@event-calendar-common/event-calendar";
import { useCreateEvent } from "@event-calendar-hooks/use-create-event";
import { useDeleteEvent } from "@event-calendar-hooks/use-delete-event";
import { useEditEvent } from "@event-calendar-hooks/use-edit-event";
import { useGetEvents } from "@event-calendar-hooks/use-get-events";

export default function EventCalendarPage() {
  const { events: eventsData } = useGetEvents();
  const [events, setEvents] = useState<CalendarEvent[]>(eventsData);
  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData]);
  const createEventMutation = useCreateEvent();
  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
    createEventMutation.mutate(event);
  };
  const editEventMutation = useEditEvent();

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
    editEventMutation.mutate({ id: updatedEvent.id, data: updatedEvent });
  };
  const deleteEventMutation = useDeleteEvent();
  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    deleteEventMutation.mutate(eventId);
  };

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
}
