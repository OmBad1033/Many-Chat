import {
    MutationFunction,
    MutationKey,
    useMutation,
    useMutationState,
    useQueryClient,
  } from '@tanstack/react-query'
  import { toast } from 'sonner'
  
  export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    onSuccess?: () => void
  ) => {
    console.log("hewewewewe", queryKey, mutationKey)
    const client = useQueryClient()
    const { mutate, isPending } = useMutation({
      mutationKey,
      mutationFn,
      onSuccess: (data) => {
        if (onSuccess) onSuccess()
        return toast(data?.status === 200 ? 'Success' : 'Error', {
          description: data.data,
        })
      },
      onSettled: async () => {
        if (queryKey) {
            console.log("QueryKEY", queryKey)
          await client.invalidateQueries({ queryKey: [queryKey] });
        }
      },
    })
  
    return { mutate, isPending }
  }
  
  export const useMutationDataState = (mutationKey: MutationKey) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => {
        return {
          variables: mutation.state.variables as any,
          status: mutation.state.status,
        }
      },
    })
  
    const latestVariable = data[data.length - 1]
    return { latestVariable }
  }
  