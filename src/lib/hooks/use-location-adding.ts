import { filter, pickBy } from "lodash";
import { useRouter } from "next/router";

export const useLocationAdding = () => {
  const { query, push } = useRouter();

  const isAddingLocation = query.adding !== undefined;
  const startAddingLocation = () => push({ query: { ...query, adding: true } });
  const stopAddingLocation = () =>
    push({ query: { ...pickBy(query, (_, key) => key !== "adding") } });

  return { isAddingLocation, startAddingLocation, stopAddingLocation };
};
