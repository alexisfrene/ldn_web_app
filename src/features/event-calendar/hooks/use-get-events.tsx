import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services";

export const useGetEvents = () => {
  const query = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  console.log("events", query.data);

  return {
    events: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
