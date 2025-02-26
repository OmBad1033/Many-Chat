"use server"

import { addKeyword, addPosts, addTrigger, createAutomation, deleteKeywordQuery, findAutomation, getAutomations, updateAutomation } from "./queries"
import { onCurrentUser } from "../user"
import { addListener } from "./queries"
import { autoBatchEnhancer } from "@reduxjs/toolkit"
import { findUser } from "../user/queries"

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
    const user = await onCurrentUser();
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

export const saveListener = async (
    automationId: string, 
    listener: 'SMARTAI' | 'MESSAGE',
    prompt: string,
    reply?: string
) => {
    await onCurrentUser();
    try{
        const create = await addListener(automationId, listener, prompt, reply);
        if(create) return {status:200, data:'Automation data successfully updated'}
        return {status:404, data:"Automation data not updated"}
    } catch(error) {
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }

}

export const saveTrigger = async (automationId: string, trigger:string[]) => {
    await onCurrentUser();
    try{
        const create = await addTrigger(automationId, trigger);
        if(create) return {status:200, data:'Automation data successfully updated'}
        return {status:404, data:"Automation data not updated"}
    } catch(error) {
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }
}

export const saveKeyword = async (automationId: string, keyword:string) => {
    await onCurrentUser();
    try{
        const create = await addKeyword(automationId, keyword);
        if(create) return {status:200, data:'Keyword successfully updated'}
        return {status:404, data:"Keyword not updated"}
    } catch(error) {
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }
}

export const deleteKeyword = async (keyWordId: string) => {
    await onCurrentUser();
    try{
        const create = await deleteKeywordQuery(keyWordId);
        if(create) return {status:200, data:'Keyword deleted updated'}
        return {status:404, data:"Keyword not deleted"}
    } catch(error) {
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }
}

export const getProfilePosts = async () => {
    const user = await onCurrentUser();
    try{
        const profile = await findUser(user.id);
        const posts = await fetch(
            `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
        );
        const parsed = await posts.json();
        if(parsed) return {status:200, data:parsed}
        return {status:404, data:"🍎 No posts found"}
    } catch(error) {
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }
}

export const savePosts = async (
    automationId: string,
    posts:{
        postid: string;
        caption: string;
        media: string;
        mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM';
    }[]
) => {
    await onCurrentUser();
    try{
        const create = await addPosts(automationId, posts);
        if(create) return {status:200, data:'Posts successfully updated'}
        return {status:404, data:"Posts not updated"}
    } catch(error) {
        console.log(error);
        return {status:500, data:"Internal Server Error"}
    }

}