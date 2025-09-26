import z from "zod";
import { sendEmail } from '../lib/resend.js';

const TOOL_COMMAND_NAME = 'send_email';
const TOOL_COMMAND_DESCRIPTION = 'Send an email with the specified subject and body to the given recipient.';

const TOOL_COMMAND_SCHEMA = z.object({
  recipient: z.email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject cannot be empty" }),
  body: z.string().min(1, { message: "Body cannot be empty" }),
});


export async function sendSingleEmail(
  args: { [x: string]: any },
  extra?: any
) {
  const { recipient, subject, body } = TOOL_COMMAND_SCHEMA.parse(args);
  const result = await sendEmail(recipient, subject, body);
  return result;
}
