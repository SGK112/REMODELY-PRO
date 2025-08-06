# REMODELY.ai - AI Brains for your House

AI-powered home renovation marketplace connecting homeowners with verified contractors.

## 🚀 Quick Start

**New to this project?** Run the automated setup:

```bash
npm run setup
```

**Returning developer?** Start development:

```bash
npm run dev
```

## 📋 Important: Configuration Requirements

**Before developing, ensure your environment is properly configured.**

👉 **See [CONFIGURATION_CHECKLIST.md](./CONFIGURATION_CHECKLIST.md) for complete setup instructions.**

### Common Issues

- **CSS not loading?** Run `npm run validate:config`
- **Styling broken after git pull?** Run `rm -rf .next && npm run dev`
- **Build failing?** Run `npm run setup`

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | 🔧 Complete environment setup (first time) |
| `npm run dev` | 🚀 Start development server (with validation) |
| `npm run validate:config` | ✅ Check configuration files |
| `npm run build` | 📦 Build for production |
| `npm run lint` | 🧹 Check code quality |

## 🏗️ Project Structure

- `app/` - Next.js 14 App Router pages
- `components/` - Reusable React components  
- `lib/` - Business logic and utilities
- `scripts/` - Development and deployment scripts
- `prisma/` - Database schema and migrations

## 🔐 Environment Setup

1. Copy environment template: `cp .env.example .env.local`
2. Update with your values (database, API keys, etc.)
3. Run setup: `npm run setup`

## 📚 Documentation

- [Configuration Checklist](./CONFIGURATION_CHECKLIST.md) - Essential setup guide
- [Copilot Instructions](./.github/copilot-instructions.md) - Development guidelines

## 🚨 Troubleshooting

Before reporting issues:

1. ✅ Run `npm run validate:config`
2. ✅ Check [CONFIGURATION_CHECKLIST.md](./CONFIGURATION_CHECKLIST.md)
3. ✅ Clear cache: `rm -rf .next`
4. ✅ Restart: `npm run dev`

## 🏃‍♂️ Contributing

1. Run setup: `npm run setup`
2. Create feature branch
3. Make changes
4. Test: `npm run validate:config && npm run build`
5. Submit PR

---

**Need help?** Check the [Configuration Checklist](./CONFIGURATION_CHECKLIST.md) first!
