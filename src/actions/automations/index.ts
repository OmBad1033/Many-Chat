"use server"

import { createAutomation } from "./queries"
import { onCurrentUser } from "../user"

export const getAllAutomations = async () => {
    const currentUser = await onCurrentUser();
    try{
        const create = await createAutomation(currentUser.id);
        if(create) return {status:200, data:"Automations created"}
        return {status:404, data:"Automation not created"}

    } catch(error){
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }
}