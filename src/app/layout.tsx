import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageLoader from "@/components/ui/PageLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dheeraj.dev"), // In a real app, use the actual domain
  title: {
    default: "Dheeraj Prajapat | Flutter Developer",
    template: "%s | Dheeraj Prajapat"
  },
  description: "Portfolio of Dheeraj Prajapat, a Flutter Developer with 3 years of experience building scalable cross-platform applications.",
  keywords: ["Flutter Developer", "Dart", "Mobile App Development", "React", "Next.js", "Portfolio", "Ahmedabad", "India"],
  authors: [{ name: "Dheeraj Prajapat" }],
  creator: "Dheeraj Prajapat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dheeraj.dev",
    title: "Dheeraj Prajapat | Flutter Developer",
    description: "Portfolio of Dheeraj Prajapat, a Flutter Developer with 3 years of experience building scalable cross-platform applications.",
    siteName: "Dheeraj Prajapat Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or acts as a placeholder
        width: 1200,
        height: 630,
        alt: "Dheeraj Prajapat - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dheeraj Prajapat | Flutter Developer",
    description: "Portfolio of Dheeraj Prajapat, a Flutter Developer with 3 years of experience building scalable cross-platform applications.",
    creator: "@iamdheeraj22",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dheeraj Prajapat",
  jobTitle: "Flutter Developer",
  url: "https://dheeraj.dev",
  sameAs: [
    "https://github.com/iamdheeraj22",
    "https://linkedin.com/in/iamdheeraj22",
  ],
  knowsAbout: [
    "Flutter",
    "Dart",
    "Mobile Applications",
    "Firebase",
    "React",
    "Next.js"
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "India"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground min-h-screen flex flex-col relative`}>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <PageLoader />
        <CustomCursor />
        <ScrollProgress />

        <Navbar />
        <main className="flex-grow z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
