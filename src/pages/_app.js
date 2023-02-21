import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { strapiUrl } from "../services/contants";
import "../styles/globals.css";

//Apollo client
export const client = new ApolloClient({
  uri: `${strapiUrl}/graphql`,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="1mxpi7QSNb-TKM-VCHgT2th79dKnAW4B2CW9L4tZYig"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Abhaya+Libre&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <p class="whatsapp_float" rel="noopener noreferrer">
            <i class="fa fa-whatsapp whatsapp-icon"></i>
          </p>
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
