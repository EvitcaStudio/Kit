import chalk from 'chalk';

/**
 * Modern high-contrast CLI theme system.
 * Built around emerald green (#10B981 / #059669 family) with crisp slate neutrals
 * and vivid semantic accents for readability on dark and light terminal backgrounds.
 */
export const theme = {
    // Brand - Emerald palette
    brand: chalk.hex('#10B981'),
    brandBold: chalk.bold.hex('#10B981'),
    brandLight: chalk.hex('#34D399'),
    brandMuted: chalk.hex('#059669'),
    accent: chalk.bold.hex('#2DD4BF'), // teal/mint highlight

    // Semantic status colors (luminous, high contrast, zero muddiness)
    success: chalk.bold.hex('#10B981'),
    successIcon: chalk.bold.hex('#34D399'),
    warning: chalk.bold.hex('#FBBF24'), // warm amber
    warningMuted: chalk.hex('#FCD34D'),
    error: chalk.bold.hex('#F43F5E'),   // vibrant rose/coral
    errorText: chalk.hex('#FB7185'),
    info: chalk.hex('#38BDF8'),          // sky blue for build times & stats
    infoBold: chalk.bold.hex('#38BDF8'),
    alert: chalk.bold.hex('#FBBF24'),

    // High-contrast neutrals (replaces muddy ANSI dim)
    title: chalk.bold.white,
    text: chalk.hex('#F1F5F9'),          // Slate 100 - clear, crisp primary text
    secondary: chalk.hex('#94A3B8'),     // Slate 400 - clean, readable secondary details
    muted: chalk.hex('#64748B'),         // Slate 500 - separators, subtle notes
    highlight: chalk.bold.hex('#F8FAFC'),// White bold highlight
    url: chalk.bold.hex('#38BDF8').underline,

    // Structural elements
    bracket: chalk.hex('#64748B'),
    divider: chalk.hex('#334155'),
    bullet: chalk.hex('#10B981')('›'),
    stepNumber: chalk.bold.hex('#10B981'),

    // Legacy neutral aliases for backward compatibility
    white: chalk.white,
    whiteBold: chalk.white.bold,
    dim: chalk.hex('#94A3B8'),
    gray: chalk.hex('#94A3B8'),
};

