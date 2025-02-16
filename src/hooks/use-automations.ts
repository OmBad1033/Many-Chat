import { createAutomations, updateAutomationName } from "@/actions/automations";
import { useMutationData } from "./use-mutation";
import { useEffect, useRef, useState } from "react";

export const useCreateAutomation = (id?: string) => {
  return useMutationData(
    ["create-automation"],
    () => createAutomations(id),
    "user-automations"
  );
};

export const useEditAutomation = (id: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-automation"], //mutation key
    (data: { name: string }) => updateAutomationName(id, { name: data.name }), //query fn
    "automation-info", //query key
    disableEdit //onSuccess
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== '') {
            mutate({ name: inputRef.current.value })
          } else {
            disableEdit()
          }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return { edit, enableEdit, disableEdit, isPending, inputRef };
};
