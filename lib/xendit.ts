import { Xendit } from 'xendit-node';

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_API_KEY!,
  xenditURL: 'http://localhost:3000'
})