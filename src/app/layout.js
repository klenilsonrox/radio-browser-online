import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import RadioProvider from "./contexts/RadioContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Rádio Browser online",
  description: "as melhores musicas vc só encontra aqui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <div className="flex bg-[#1E1E21] min-h-screen flex-col lg:flex-row">
        <RadioProvider>
        <Header />
        {children}
        </RadioProvider>
       </div>
      </body>
    </html>
  );
}
