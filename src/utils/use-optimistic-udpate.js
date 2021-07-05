import { useQueryClient } from "react-query";

export const useConfig = (queryKey, callback) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => callback(target, old));
      return { previousItems };
    },
    onError(error, newItem, context) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useEditConfig = (queryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]));

export const useDeleteConfig = (queryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
