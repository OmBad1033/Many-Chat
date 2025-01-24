import { AutomationDuoToneWhite, HomeDuoToneWhite, RocketDuoToneWhite, SettingsDuoToneWhite } from "@/icons";
import { v4 as uuid } from "uuid";

type FieldProps ={
    label:string
    id: string
}


type sideBarProps = {
    icon: React.ReactNode,
} & FieldProps
export const SIDEBAR_MENU: sideBarProps[] = [
    {
        id: uuid(),
        label: "home",
        icon:  <HomeDuoToneWhite/>
    },
    {
        id: uuid(),
        label: "automation",
        icon:  <AutomationDuoToneWhite/>
    },
    {
        id: uuid(),
        label: "integrations",
        icon:  <RocketDuoToneWhite/>
    },
    {
        id: uuid(),
        label: "settings",
        icon:  <SettingsDuoToneWhite/>
    }
];