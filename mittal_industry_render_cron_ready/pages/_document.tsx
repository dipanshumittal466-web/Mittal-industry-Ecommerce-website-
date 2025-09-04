import { Html, Head, Main, NextScript } from "next/document";
export default function Document(){
  return (<Html lang="en">
    <Head>
      <meta name="theme-color" content="#232f3e"/>
      <link rel="icon" href="/logo.png" />
    </Head>
    <body>
      <Main/>
      <NextScript/>
    </body>
  </Html>);
}
