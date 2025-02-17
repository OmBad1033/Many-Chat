import { duplicationValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IntialStateTriggerProps = {
    trigger?:{
        type?: "COMMENT" | "DM",
        keyword?: string
        types?:string[]
        keywords?:string[]
    }

}

const initialState: IntialStateTriggerProps = {
    trigger: {
        type: undefined,
        keyword: undefined,
        types: [],
        keywords: []
    }

}

export const AUTOMATION = createSlice({
    name: 'automation',
    initialState,
    reducers: {
        TRIGGER: (state, action: PayloadAction<IntialStateTriggerProps>) => {
            state.trigger!.types  = duplicationValidation(
                state.trigger?.types!,
                action.payload.trigger?.type!
            )
            return state
        }
    }
})

export const { TRIGGER } = AUTOMATION.actions

export default AUTOMATION.reducer