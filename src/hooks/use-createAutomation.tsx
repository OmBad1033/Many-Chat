import { createAutomations } from "@/actions/automations";
import { useMutationData } from "./use-mutation"

export const useCreateAutomation = (id?: string) => {
    return useMutationData(
        ['create-automation'],
        ()=>createAutomations(id),
        "user-automations"
    );
}