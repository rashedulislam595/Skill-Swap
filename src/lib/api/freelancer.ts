import { serverFetch } from "../core/server";

export interface Freelancer {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number | string;
  rating?: number;
  jobsCompleted?: number;
}

export const getFreelancers = async (): Promise<Freelancer[]> => {
  return serverFetch<Freelancer[]>(`/api/users/freelancers`);
};
