import { getAllAutomations, getAutomationInfo } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"

export const useQueryAutomations = () => {
    return useQuery(
        {
            queryKey: ['user-automations'],
            queryFn: getAllAutomations,
        }
    )
}

export const useQueryAutomation = (id: string) => {
    return useQuery({
      queryKey: ['user-automation'],
      queryFn: () => getAutomationInfo(id),
    });
  };