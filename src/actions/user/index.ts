"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findUser } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  return user;
};

export const onBoardUser = async () => {
  const user = await onCurrentUser();
  try {
    const found = await findUser(user.id);
    if (found) {
      if (found.integration.length > 0) {
        const today = new Date();
        const time_left =
          found.integration[0].expiresAt?.getTime()! - today.getTime();
        const days = Math.round(time_left / (1000 * 60 * 60 * 24));
        if (days < 5) {
          console.log("refresh");
        }
        const refresh = await refreshToken(found.integration[0].token);
        const today1 = new Date();
        const expire_date = today1.setDate(today1.getDate() + 60);

        const updated_token = await updateIntegration(
          refresh.access_token,
          new Date(expire_date),
          found.integration[0].id
        );

        if (!updated_token) {
          console.log("Update token failed");
        }
      }
      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      };
    }
    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses[0].emailAddress
    );
    return{
        status:201,
        data:{
            firstname:created.firstname,
            lastname:created.lastname
        }
    }
  } catch (error) {
    console.log(error);
    return {status:500}
  }
};
