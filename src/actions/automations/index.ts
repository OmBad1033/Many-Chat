"use server"

import { createAutomation, findAutomation, getAutomations, updateAutomation } from "./queries"
import { onCurrentUser } from "../user"

export const createAutomations = async (id?:string) => {
    const currentUser = await onCurrentUser();
    console.log("ABOUT TO CREATE")
    try{
        const create = await createAutomation(currentUser.id, id);
        if(create) return {status:200, data: 'Automation created', res: create}
        return {status:404, data:"Automation not created"}

    } catch(error){
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }
}

export const getAllAutomations = async () => {
    const user = await onCurrentUser();
    try{
        const automations = await getAutomations(user.id);
        if(automations) return {status:200, data:automations.automations}
        return {status:404, data:[]}
    } catch(error){
        console.log(error);
        return {status:500, data:[]}
    }
}

export const getAutomationInfo = async (id:string) => {
    await onCurrentUser();
    try{
        const automation = await findAutomation(id);
        if(automation) return {status:200, data:automation}
        return {status:404, data:{}}
    } catch(error){
        console.log(error);
        return {status:500, data:{}}
    }
}

export const updateAutomationName = async (
    automationId: string,
    data:{
        name:string,
        active?: boolean,
        automation?: string
    }) => {
        await onCurrentUser();
        try{
            const update = await updateAutomation(automationId, data);
            if(update) return {status:200, data:'Automation data successfully updated'}
            return {status:404, data:"Automation data not updated"}
        } catch(error){
            console.log(error);
            return {status:500, data:"Internal Server Error"}
        }
}