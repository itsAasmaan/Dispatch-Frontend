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

export const useCompany = (id) => {
  return useQuery({
    queryKey: KEYS.detail(id),
    queryFn: () => companyApi.getOne(id).then((r) => r.data.data),
    enabled: !!id,
  });
};

export const useFollowCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyId) => companyApi.follow(companyId),
    onSuccess: (_, companyId) => {
      queryClient.invalidateQueries(KEYS.detail(companyId));
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Company followed");
    },
  });
};

export const useUnfollowCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyId) => companyApi.unfollow(companyId),
    onSuccess: (_, companyId) => {
      queryClient.invalidateQueries(KEYS.detail(companyId));
      queryClient.invalidateQueries(KEYS.all);
      toast.success("Company unfollowed");
    },
  });
};
