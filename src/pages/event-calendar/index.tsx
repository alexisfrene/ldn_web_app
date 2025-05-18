import { useEffect, useState } from "react";
import { CalendarEvent } from "@event-calendar-types/types";
import { EventCalendar } from "@event-calendar-common/event-calendar";
import { useGetEvents } from "@event-calendar-hooks/use-get-events";

export default function EventCalendarPage() {
  const { events: eventsData } = useGetEvents();
  const [events, setEvents] = useState<CalendarEvent[]>(eventsData);
  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData]);
  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
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
