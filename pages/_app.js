import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/global.scss';
import '../stylesheets/typography.scss';

library.add(fas);

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
