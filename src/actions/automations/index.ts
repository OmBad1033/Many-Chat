"use server"

import { createAutomation, getAutomations } from "./queries"
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