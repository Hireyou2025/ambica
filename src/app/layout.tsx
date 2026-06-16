import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { CartProvider } from "@/components/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Reeves Restaurant Kakinada | Best Modern Indian Fine Dining",
  description: "Experience premium dining at Reeves Restaurant (రీవ్స్ రెస్టారెంట్), Kakinada. Famous for Lobster Biryani, Chettinad Tangdi Biryani & Private Dining. 4.6 Stars, 7,460+ Reviews.",
  keywords: [
    "Best Restaurant in Kakinada",
    "Best Biryani in Kakinada",
    "Modern Indian Restaurant Kakinada",
    "Family Restaurant Kakinada",
    "Private Dining Restaurant Kakinada",
    "Lobster Biryani Kakinada",
    "Reeves Restaurant Kakinada",
    "Reeves Restaurant Surya Rao Peta"
  ],
  authors: [{ name: "Reeves Restaurant" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://reevesrestaurant.com",
    title: "Reeves Restaurant | Premium Modern Indian Restaurant in Kakinada",
    description: "Indulge in modern Indian culinary excellence. Enjoy private dining rooms, family platters, and Kakinada's best biryanis.",
    siteName: "Reeves Restaurant",
    images: [
      {
        url: "/images/signature_lobster_biryani.jpg",
        width: 1200,
        height: 630,
        alt: "Reeves Restaurant Lobster Biryani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reeves Restaurant Kakinada",
    description: "Premium Modern Indian dining destination in Kakinada. Exceptional cuisine, luxury private rooms.",
    images: ["/images/signature_lobster_biryani.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Schema Markup JSON-LD for local restaurant SEO
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Reeves Restaurant",
    "alternateName": "రీవ్స్ రెస్టారెంట్",
    "image": [
      "https://reevesrestaurant.com/images/signature_lobster_biryani.jpg",
      "https://reevesrestaurant.com/images/restaurant_interior.jpg",
      "https://reevesrestaurant.com/images/private_dining_room.jpg"
    ],
    "@id": "https://reevesrestaurant.com/#restaurant",
    "url": "https://reevesrestaurant.com",
    "telephone": "+919160345681",
    "priceRange": "₹200–₹400",
    "menu": "https://reevesrestaurant.com/#menu",
    "servesCuisine": [
      "Modern Indian",
      "Biryani",
      "Seafood",
      "Tandoori",
      "Chinese"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13-3-5, Opposite Reliance Smart, Surya Rao Peta",
      "addressLocality": "Kakinada",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "533001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.9587",
      "longitude": "82.2355"
    },
    "hasMap": "https://www.google.com/maps/place/Reeves+Restaurant/@16.9587,82.2355,17z",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "11:00",
      "closes": "23:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "7460"
    },
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI"],
    "currenciesAccepted": "INR"
  };

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="font-outfit antialiased selection:bg-gold-500 selection:text-dark-bg">
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
