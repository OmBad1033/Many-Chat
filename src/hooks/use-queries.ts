import { createAutomations, getAllAutomations } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"
import { get } from "http"

export const useQueryAutomations = () => {
    return useQuery(
        {
            queryKey: ['user-automations'],
            queryFn: getAllAutomations,
        }
    )
}