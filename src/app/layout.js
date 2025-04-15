import { Geist} from "next/font/google";
import "./globals.css";
import { CategoryProvider } from "@/context/CategoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CategoryProvider>{children}</CategoryProvider>
        
      </body>
    </html>
  );
}
