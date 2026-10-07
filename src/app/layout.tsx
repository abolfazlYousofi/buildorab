import type { Metadata } from "next";
import { Poppins, Inter, Vazirmatn } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buildorab | Web Design for Construction & Roofing",
  description:
    "We build conversion-focused websites for construction, roofing, and real estate companies.",
  metadataBase: new URL("https://buildorab.com"),
  openGraph: {
    title: "Buildorab | Web Design Studio",
    description: "We build websites that convert visitors into customers.",
    url: "https://buildorab.com",
    siteName: "Buildorab",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${vazirmatn.variable}`}
    >
      <body className="font-body bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}