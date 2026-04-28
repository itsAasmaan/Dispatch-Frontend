import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { companyApi } from "../api/company.api";

const KEYS = {
  all: ["companies"],
  list: (params) => ["companies", "list", params],
  detail: (id) => ["companies", "detail", id],
};

export const useCompanies = (params = {}) => {
  return useQuery({
    queryKey: KEYS.list(params),
    queryFn: () => companyApi.getAll(params).then((r) => r.data.data),
    keepPreviousData: true,
  });
};

export const useCompany = (slugOrId) => {
  return useQuery({
    queryKey: KEYS.detail(slugOrId),
    queryFn: () => companyApi.getOne(slugOrId).then((r) => r.data.data),
    enabled: !!slugOrId,
  });
};

export const useFollowCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyIdOrSlug) => companyApi.follow(companyIdOrSlug),
    onSuccess: (_, companyIdOrSlug) => {
      queryClient.invalidateQueries(KEYS.detail(companyIdOrSlug));
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Company followed");
    },
  });
};

export const useUnfollowCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyIdOrSlug) => companyApi.unfollow(companyIdOrSlug),
    onSuccess: (_, companyIdOrSlug) => {
      queryClient.invalidateQueries(KEYS.detail(companyIdOrSlug));
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Company unfollowed");
    },
  });
};
