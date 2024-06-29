// src/greeting.ts

import { Context } from 'telegraf'

export const greeting = () => async (ctx: Context) => {
  const messageId = ctx.message?.message_id
  const replyText = `Hello ${ctx.message?.from.first_name}`

  if (messageId) {
    await ctx.reply(replyText, { reply_to_message_id: messageId })
  }
}