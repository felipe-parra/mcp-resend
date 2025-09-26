#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { sendSingleEmail } from './tools/mail.js';
/**
 * Definition - MCP Server
 *
 */
const server = new McpServer({
    name: "mcp-resend",
    version: "0.0.1",
});
server.tool("send_email", "Send an email with the specified subject and body to the given recipient.", {
    recipient: z.email({ message: "Invalid email address" }),
    subject: z.string().min(1, { message: "Subject cannot be empty" }),
    body: z.string().min(1, { message: "Body cannot be empty" }),
}, sendSingleEmail);
/**
 * Connect the server to the transport (stdio in this case)
 *
 */
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
/* Run the server */
main();
