import { cn } from "@/lib/utils";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const font = Pixelify_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export const metadata = {
    title: "DA | OpenSource Contributions",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={cn(font.className, "antiliased")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
