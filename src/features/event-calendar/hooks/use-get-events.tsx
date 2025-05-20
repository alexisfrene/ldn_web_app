import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services";

export const useGetEvents = () => {
  const query = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  console.log("Events:", query.data);
  return {
    events: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
