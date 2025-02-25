import { createAutomations, deleteKeyword, saveKeyword, saveListener, saveTrigger, updateAutomationName } from "@/actions/automations";
import { useMutationData } from "./use-mutation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useZodForm from "./use-zod";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { TRIGGER } from "@/redux/slices/automation";

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

export const useListener = (id: string) => {
    const [listener, setListener] = useState<'MESSAGE' | 'SMARTAI' | null>(null)
    const promptSchema = z.object({
        prompt: z.string().min(1),
        reply: z.string()
    })
    const {isPending, mutate} = useMutationData(
        ['create-listener'],//mutation key
        (data: {prompt:string; reply: string}) => saveListener(id, listener || "MESSAGE", data.prompt, data.reply), //mutation fnc
        'automation-info', //query key
    )

    const {errors, onFormSubmit, register, watch, reset} = useZodForm(promptSchema, mutate)

    const onSetListener = (type: 'SMARTAI' | 'MESSAGE') => setListener(type)

    return {errors, onFormSubmit, register, watch, reset, isPending, onSetListener, listener}
}

export const useTriggers = (id:string) => {
  const types = useAppSelector((state) => state.AutomationReducer.trigger?.types)
  const dispatch : AppDispatch = useDispatch();
  const onSetTrigger = (type: 'COMMENT' | 'DM') => dispatch(TRIGGER({trigger: {type}}))
  const {isPending, mutate} = useMutationData(
    ['add-trigger'],//mutation key
    (data: {types: string[]})=> saveTrigger(id, data.types), //mutation fnc
    'automation-info', //query key
  )
  const onSaveTrigger = () => mutate({types});
  return {
    types,
    onSetTrigger, //save in redux store
    onSaveTrigger, //save in db
    isPending
  }
  
}

export const useKeywords =  (id: string) => {
  const [keyword, setKeyword] = useState('');
  const {mutate} = useMutationData(
    ['add-keyword'],
    (data: {keyword:string}) => saveKeyword(id, data.keyword),
    'automation-info',
    () => setKeyword('')
  )
  const {mutate: deleteMutation} = useMutationData(
    ['delete-keyword'],
    (data: {id: string}) => deleteKeyword(id),
    'automation-info'
  )
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({keyword})
      setKeyword('')
    }
  }

  return {
    keyword, onValueChange, onKeyPress, deleteMutation
  }
}
