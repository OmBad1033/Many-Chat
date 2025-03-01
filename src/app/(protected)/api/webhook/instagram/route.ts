import { findAutomation } from "@/actions/automations/queries";
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponse,
} from "@/actions/webhook/queries";
import { sendDM } from "@/lib/fetch";
import { client } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// /api/webhook/instagram
// Method used to validate the webhook, this is required from instagram. They want to validate my endpoint
//this is needed only once, once verified they are never going to need it!
export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return NextResponse.json(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();
  let matcher; // its like a boolean that tell if automation is need or not
  try {
    //first we are going to verify the keyword that was commented or DMed is inside that message
    // with this we can tell if we need the automation or not
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }
    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text
      );
    }
    if (matcher && matcher.automationId) {
      //we have a keyword matched
      //we need to run the automation
      //check if the message on a post or DM
      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true
        );
        if (automation && automation.trigger) {
          //run the automation
          if (automation.listener?.listener === "MESSAGE") {
            const direct_message = await sendDM(
              webhook_payload.entry[0].messaging[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.User?.integrations[0].token!
            );
            // Two condition to avoid
            // 1. if user spams messages
            // 2. if user send one keyword and then imediately another different keyword (Use the most recient one)
            if (direct_message.status === 200) {
              const tracked = await trackResponse(automation.id, "DM");
              if (tracked) {
                return NextResponse.json({
                  message: "Message sent successfully",
                  status: 200,
                });
              }
            }
          }

          if (
            automation.listener &&
            automation.listener?.listener === "SMARTAI" &&
            automation.User?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await axios.post(
              "https://openrouter.ai/api/v1/chat/completions",
              {
                model: "deepseek/deepseek-r1-distill-llama-70b:free",
                messages: {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: Keep Response under 2 sentence`,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
                },
              }
            );

            if (smart_ai_message.data.choices[0].message.content) {
              //user can follow up on a response.
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].changes[0].value.message
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.data.choices[0].message.content
              );

              await client.$transaction([reciever, sender]);

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.data.choices[0].message.content,
                automation.User?.integrations[0].token!
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponse(automation.id, "DM");
                if (tracked) {
                  return NextResponse.json({
                    message: "Message sent successfully",
                    status: 200,
                  });
                }
              }
            }
          }
        }
      }

      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments"
      ) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          false
        );
        const automation_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!
        );

        if (automation && automation_post && automation.trigger) {
          if (automation.listener) {
            if (automation.listener.listener === "MESSAGE") {
              const direct_message = await sendDM(
                webhook_payload.entry[0].changes[0].value.id,
                webhook_payload.entry[0].changes[0].value.from.id,
                automation.listener?.prompt,
                automation.User?.integrations[0].token!
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponse(automation.id, "DM");
                if (tracked) {
                  return NextResponse.json({
                    message: "Message sent successfully",
                    status: 200,
                  });
                }
              }
            }
            if (
              automation.listener.listener === "SMARTAI" &&
              automation.User?.subscription?.plan === "PRO"
            ) {
              const smart_ai_message = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                  model: "deepseek/deepseek-r1-distill-llama-70b:free",
                  messages: {
                    role: "assistant",
                    content: `${automation.listener?.prompt}: Keep Response under 2 sentence`,
                  },
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
                  },
                }
              );

              if (smart_ai_message.data.choices[0].message.content) {
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].changes[0].value.id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.message
                );

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].changes[0].value.id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.data.choices[0].message.content
                );

                await client.$transaction([reciever, sender]);

                const direct_message = await sendDM(
                  webhook_payload.entry[0].changes[0].value.id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.data.choices[0].message.content,
                  automation.User?.integrations[0].token!
                );

                if (direct_message.status === 200) {
                  const tracked = await trackResponse(automation.id, "COMMENT");
                  if (tracked) {
                    return NextResponse.json({
                      message: "Message sent successfully",
                      status: 200,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );

      if (customer_history.history.length > 0) {
        const automation = await findAutomation(customer_history.automationId!);
        if (
          automation?.User?.subscription?.plan === "PRO" &&
          automation.listener?.listener === "SMARTAI"
        ) {
          const smart_ai_message = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              model: "deepseek/deepseek-r1-distill-llama-70b:free",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: Keep Response under 2 sentence`,
                },
                ...customer_history.history,
                {
                  role: "user",
                  content: webhook_payload.entry[0].messaging[0].message.text,
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
              },
            }
          );
          if (smart_ai_message.data.choices[0].message.content) {
            const reciever = createChatHistory(
              automation.id,
              webhook_payload.entry[0].messaging[0].recipient.id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            );

            const sender = createChatHistory(
              automation.id,
              webhook_payload.entry[0].messaging[0].recipient.id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.data.choices[0].message.content
            );

            await client.$transaction([reciever, sender]);
            const direct_message = await sendDM(
              webhook_payload.entry[0].messaging[0].recipient.id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.data.choices[0].message.content,
              automation.User?.integrations[0].token!
            );

            if (direct_message.status === 200) {
              return NextResponse.json({
                message: "Message sent successfully",
                status: 200,
              });
            }
          }
        }
        
      }
      return NextResponse.json({
        message: 'No automation set',
    }, {status: 400})
    }
    return NextResponse.json({message: 'No automation set'},{status: 400})

  } catch (error) {
    console.log(error);
    return NextResponse.json({message: 'No automation set'},{status: 500})


  }
}
