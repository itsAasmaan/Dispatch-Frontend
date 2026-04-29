import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { interviewApi } from "../api/interview.api";

const KEYS = {
  all: ["interviews"],
  list: (params) => ["interviews", "list", params],
  detail: (id) => ["interviews", "detail", id],
};

export const useInterviews = (params = {}) => {
  return useQuery({
    queryKey: KEYS.list(params),
    queryFn: () => interviewApi.getAll(params).then((r) => r.data.data),
    keepPreviousData: true,
  });
};

export const useInterview = (id) => {
  return useQuery({
    queryKey: KEYS.detail(id),
    queryFn: () => interviewApi.getOne(id).then((r) => r.data.data),
    enabled: !!id,
  });
};

export const useUpvoteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => interviewApi.upvote(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(KEYS.detail(id));
      queryClient.invalidateQueries(KEYS.all);
    },
  });
};

export const useBookmarkInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => interviewApi.bookmark(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(KEYS.detail(id));
    },
  });
};

export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => interviewApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Interview experience shared successfully!");
    },
  });
};

export const usePublishInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => interviewApi.publish(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(KEYS.detail(id));
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Interview published successfully!");
    },
  });
};

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => interviewApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Interview deleted");
    },
  });
};
