import { Subscription } from './../../../node_modules/.prisma/client/index.d';
"use server";

import { client } from "@/lib/prisma";
import exp from "constants";
import { create } from "domain";

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      subscription: true,
      integration: {
        select: {
          id: true,
          token: true,
          expiresAt: true,
        },
      },
    },
  });
};

export const createUser = async (
    clerkId: string,
    firstname: string,
    lastname: string,
    email: string
  ) => {
    return await client.user.create({
      data: {
        clerkId,
        firstname,
        lastname,
        email,
        subscription: {
            create: {},
        },
      },
      select: {
        firstname: true,
        lastname: true,
      },
    })
  }
