import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../config/env";

export async function fetchApod(date?: string) {
  const params = date ? { date } : {};
  const res = await axios.get(`${API_BASE_URL}/api/v1/nasa/apod`, { params });
  return res.data?.data ?? {};
}

export async function fetchNeoFeed(start_date?: string, end_date?: string) {
  const params: Record<string, string> = {};
  if (start_date) params.start_date = start_date;
  if (end_date) params.end_date = end_date;
  const res = await axios.get(`${API_BASE_URL}/api/v1/nasa/neo`, { params });
  // Always return an object, never undefined
  return res.data && res.data.data ? res.data.data : { element_count: 0, near_earth_objects: {} };
}

export function useApodQuery({ date }: { date?: string }) {
  return useQuery({
    queryKey: ["apod", date],
    queryFn: () => fetchApod(date),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
