import "../public/antd.min.css";
// import '../styles/globals.css';
import type { AppProps } from "next/app";
import withTheme from "../theme";
import GlobalLayout from "../components/layout";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return withTheme(
    <WagmiConfig client={client}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </WagmiConfig>
  );
}
