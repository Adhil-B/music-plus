import Navbar from "@/components/Navbar";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import Providers from "@/redux/Providers";
import TopProgressBar from "@/components/topProgressBar/TopProgressBar";
import Favicon from "./favicon.ico";
import SongsHistory from "@/components/SongsHistory";
import PassiveListner from "@/components/Homepage/PassiveListner";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";
import { Poppins } from "next/font/google";
import Script from "next/script";
//import { useDispatch, useSelector } from "react-redux";
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

const poppins = Poppins({
  weight: "500",
  subsets: ["latin-ext"],
  display: "swap",
});
//const { fullScreen } = useSelector((state) => state.player);
//${fullScreen ? '' : 'sm:bottom-[1vh] sm:left-[3vw] sm:right-[3vw] sm:rounded-[10px] sm:shadow-[0px_10px_10px_10px_rgba(0, 0, 0, 0.67)]'}
export const metadata = {
  title: "Music+",
  description: "Music streaming app",
  image:
    "https://res.cloudinary.com/dbr73rpz9/image/upload/v1690380865/images/logo-color_noktgr.png",
  url: "https://music-ten-pi.vercel.app",
  type: "website",
  icons: [{ rel: "icon", url: Favicon.src }],
  site_name: "Music+",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <Script type="text/javascript" src="/browser-file-storage.min.js"></Script> 
    <Script type="text/javascript" src="https://ytpi.onrender.com/audio?videoId=OGwyhjk_fhE&return_stream=true"></Script> 
    <Script type="text/javascript" src="/script-1.js"></Script> 
    <Script type="text/javascript" src="https://raw.githubusercontent.com/chrisdancee/react-ios-pwa-prompt/master/dist/react-ios-pwa-prompt.js"></Script> 

      <body className={`${poppins.className} overscroll-y-contain`}>
        <PassiveListner />
        <Providers>
          <AuthProvider>
            <TopProgressBar />
            <SongsHistory />
            <Navbar />
            <Toaster />
            {children}
            <div className="h-20"></div>
            <div className={`fixed bottom-[1vw] sm:bottom-0 left-[2vw] sm:left-0 right-[2vw] sm:right-0 flex backdrop-blur-[100px] rounded-[10px] sm:rounded-0 rounded-t-3 z-50`}>
              <MusicPlayer />

            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
