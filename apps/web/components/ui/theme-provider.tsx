'use client';
import { ThemeProvider as NextThemes } from 'next-themes';

export function ThemeProvider(props: any) {
  return <NextThemes attribute="class" defaultTheme="system" enableSystem {...props} />;
}