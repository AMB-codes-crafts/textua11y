import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/global.scss';
import '../stylesheets/typography.scss';

library.add(fas);

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-129788768-4"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-129788768-4');`,
        }}
      ></script>
      <title>textua11y</title>
      <link rel="shortcut icon" href="images/icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
