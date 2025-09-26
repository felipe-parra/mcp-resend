# MCP Resend

A Model Context Protocol (MCP) server that provides email sending capabilities using the Resend API. This server allows AI assistants and other MCP clients to send emails through Resend's reliable email delivery service.

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Available Tools](#-available-tools)
- [Development](#-development)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🚀 **Easy Integration**: Simple MCP server setup for email functionality
- 📧 **Reliable Email Delivery**: Powered by Resend's robust email infrastructure
- 🔒 **Type Safety**: Built with TypeScript and Zod schema validation
- 🛡️ **Error Handling**: Comprehensive error handling and logging
- ⚡ **Fast Setup**: Quick configuration and deployment
- 🔧 **Flexible Configuration**: Environment-based configuration

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm
- **Resend Account**: Sign up at [resend.com](https://resend.com) and get your API key
- **Verified Domain**: Add and verify your domain in Resend dashboard

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/felipe-parra/mcp-resend.git
cd mcp-resend
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Build the Project

```bash
pnpm run build
# or
npm run build
```

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the project root:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

### 2. MCP Client Configuration

Add the server to your MCP client configuration (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-resend": {
      "command": "node",
      "args": ["path/to/mcp-resend/build/index.js"],
      "env": {
        "RESEND_API_KEY": "your_resend_api_key_here"
      },
      "working_directory": "path/to/mcp-resend"
    }
  }
}
```

### 3. Update Email Configuration

Edit `src/lib/resend.ts` to use your verified domain:

```typescript
const response = await resend.emails.send({
  from: "noreply@yourdomain.com", // Replace with your verified domain
  to,
  subject,
  text: body,
});
```

## 🚀 Usage

### Starting the Server

```bash
# Production
pnpm start

# Development with hot reload
pnpm run dev
```

### Using with MCP Clients

Once configured, the server exposes email functionality through the MCP protocol. Your AI assistant or MCP client can use the `send_email` tool to send emails.

## 🛠️ Available Tools

### `send_email`

Sends an email to the specified recipient with subject and body.

**Parameters:**
- `recipient` (string, required): Valid email address of the recipient
- `subject` (string, required): Email subject line (minimum 1 character)
- `body` (string, required): Email body content (minimum 1 character)

**Returns:**
- Success: Confirmation message with Resend email ID
- Error: Error message describing what went wrong

## 💻 Development

### Project Structure

```
mcp-resend/
├── src/
│   ├── index.ts          # Main server entry point
│   ├── lib/
│   │   └── resend.ts     # Resend API integration
│   ├── tools/
│   │   └── mail.ts       # Email tool implementation
│   └── utils/
│       └── helper.ts     # Utility functions
├── build/                # Compiled JavaScript files
├── example.mcp.json      # Example MCP configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Available Scripts

- `pnpm run build` - Build the TypeScript project
- `pnpm run dev` - Start development server with hot reload
- `pnpm start` - Start the production server
- `pnpm run build:prod` - Production build
- `pnpm run build:dev` - Development build

### Adding New Features

1. **Add new tools** in the `src/tools/` directory
2. **Register tools** in `src/index.ts`
3. **Add utilities** in `src/utils/` as needed
4. **Update types** and ensure type safety with Zod schemas

## 📚 API Reference

### Core Dependencies

- **@modelcontextprotocol/sdk**: MCP SDK for server implementation
- **resend**: Official Resend API client
- **zod**: Runtime type validation and parsing

### Error Handling

The server implements comprehensive error handling:

- **Validation Errors**: Invalid email addresses or empty fields
- **API Errors**: Resend API failures
- **Network Errors**: Connection issues
- **Authentication Errors**: Invalid API keys

## 📖 Examples

### Basic Email Sending

```typescript
// Example of how the tool would be called by an MCP client
const result = await client.callTool("send_email", {
  recipient: "user@example.com",
  subject: "Hello from MCP Resend",
  body: "This is a test email sent via the MCP Resend server!"
});
```

### Error Handling Example

```typescript
// The server automatically handles validation
const result = await client.callTool("send_email", {
  recipient: "invalid-email", // This will trigger validation error
  subject: "",               // This will trigger validation error
  body: "Test message"
});
```

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Run `pnpm run build` to compile TypeScript
   - Ensure all dependencies are installed

2. **Email sending fails**
   - Verify your Resend API key is correct
   - Check that your sender domain is verified in Resend
   - Ensure the recipient email is valid

3. **Server won't start**
   - Check Node.js version (must be 18+)
   - Verify the build directory exists and contains compiled files
   - Check for port conflicts

### Debug Mode

Run with debug logging:

```bash
DEBUG=mcp-resend:* pnpm start
```

### Logs

The server logs important events:
- Email sending attempts
- Errors and failures
- Server startup information

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

### Development Guidelines

- Write TypeScript with proper types
- Add Zod schemas for validation
- Include error handling for all operations
- Follow the existing code style
- Update documentation for new features

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Repository](https://github.com/felipe-parra/mcp-resend)
- [Resend Documentation](https://resend.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Issues](https://github.com/felipe-parra/mcp-resend/issues)

## 📞 Support

If you have questions or need help:

1. Check the [Issues](https://github.com/felipe-parra/mcp-resend/issues) page
2. Create a new issue with detailed information
3. Include logs and error messages when reporting bugs

---

**Made with ❤️ for the MCP community**