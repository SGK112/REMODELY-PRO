# REMODELY.ai Configuration Checklist

## Quick Setup (For New Developers)

Run this command to automatically set up your development environment:

```bash
npm run setup
```

This will:
- ✅ Install all dependencies
- ✅ Validate and create missing configuration files
- ✅ Set up environment variables
- ✅ Clean build cache
- ✅ Generate database client

## Manual Configuration Checklist

If you prefer to set up manually, ensure these files exist:

### Required Configuration Files

- [ ] `tailwind.config.js` - Tailwind CSS configuration
- [ ] `postcss.config.js` - PostCSS configuration for Tailwind processing
- [ ] `next.config.js` - Next.js configuration
- [ ] `.env.local` or `.env` - Environment variables

### Before Starting Development

**Always run this before `npm run dev`:**

```bash
npm run validate:config
```

### Troubleshooting CSS Issues

If styling isn't working:

1. **Check if configuration files exist:**
   ```bash
   ls -la tailwind.config.js postcss.config.js
   ```

2. **Validate configuration:**
   ```bash
   npm run validate:config
   ```

3. **Clear build cache:**
   ```bash
   rm -rf .next && npm run dev
   ```

4. **Check Tailwind dependencies:**
   ```bash
   npm ls tailwindcss postcss autoprefixer
   ```

### Development Workflow

1. **First time setup:**
   ```bash
   git clone <repo>
   cd REMODELY-PRO
   npm run setup
   ```

2. **Daily development:**
   ```bash
   npm run dev  # Will auto-validate config
   ```

3. **Before deploying:**
   ```bash
   npm run build  # Will auto-validate config
   ```

### Configuration Auto-Fix

The validation script will automatically:
- Create missing `tailwind.config.js`
- Create missing `postcss.config.js`
- Clear build cache when files are created
- Show clear error messages for missing dependencies

### Prevention Measures Implemented

1. **Automatic validation** on `npm run dev` and `npm run build`
2. **Auto-fix** for missing configuration files
3. **Setup script** for new developers
4. **Clear error messages** when configuration is missing
5. **Build cache clearing** when configuration changes

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CSS not loading | Run `npm run validate:config` |
| Tailwind classes not working | Check if `tailwind.config.js` exists |
| Build fails | Run `npm run setup` |
| Styles look wrong after git pull | Run `rm -rf .next && npm run dev` |

### Environment Setup

Required Node.js version: **20+**

Required dependencies are auto-installed, but manually they are:
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `@tailwindcss/forms`
- `tailwindcss-animate`
