import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";
import { PostHogProvider } from "@/components/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Superu - AI Voice Agents for Support & Sales",
  description:
    "Launch your AI voice agent for inbound support & automated outbound sales. Get started with your first 1000 calls free!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDev = process.env.DEV === "True";
  const storedUserId = uuidv4();
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Microsoft Clarity Tracking Script */}
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "r9670un0r8");
              
              var clarity_user_id = localStorage.getItem("clarity_user_id");
              if (!clarity_user_id) {
                clarity_user_id = "${storedUserId}";
                localStorage.setItem("clarity_user_id", clarity_user_id);
              }
              window.clarity("set", "user_id", clarity_user_id);
              `,
            }}
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-L5KP1EZQEM"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-L5KP1EZQEM');
              `,
            }}
          />
          {!isDev && (
            <Script
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="caee1270-e055-43f8-9039-e3a3f8576f53";
              (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
              
              $crisp.push(["do", "message:show", ["text", "Hey there! Need any help? 😊"]]);
            `,
              }}
            />
          )}
        </head>
        <body className={inter.className}>
          <PostHogProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              expand={true}
              richColors
              closeButton
              toastOptions={{
                duration: 5000,
                style: {
                  border: "1px solid",
                  borderRadius: "0.5rem",
                },
              }}
            />
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
