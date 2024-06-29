// src/index.ts

import { VercelRequest, VercelResponse } from '@vercel/node'
import { Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import { greeting } from './greeting'

//VERCEL_URL is a system vercel env
const VERCEL_URL = `${process.env.VERCEL_URL}`
//BOT_TOKEN - authorisation token from Botfather
const BOT_TOKEN = process.env.BOT_TOKEN || ''

const bot = new Telegraf(BOT_TOKEN)

//test simple greeting function
bot.on('message', greeting())

export const messageHandler = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.')
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo()
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    await bot.telegram.deleteWebhook()
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`)
  }

  if (req.method === 'POST') {
    await bot.handleUpdate(req.body as unknown as Update, res)
  } else {
    res.status(200).json('Listening to bot events...')
  }
}
