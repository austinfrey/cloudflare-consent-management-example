"use client";

import Main from "./main";
import ZarazProvider from "./zaraz-provider";

export default function Home() {
  return (
    <ZarazProvider>
      <Main></Main>
    </ZarazProvider>
  );
}
