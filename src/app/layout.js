import "./globals.css";
import ScrollToTop from "@/utils/ScrollToTop";
import { roboto } from "@/utils/fonts";

export const metadata = {
  title: "Shopino",
  description: "Shopino is a Grocery Store  where you can get the Groceries you need",
  icons:{
    icon:"/images/logo.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} relative`}>
        {children}
        <ScrollToTop/>
      </body>
    </html>
  );
}
