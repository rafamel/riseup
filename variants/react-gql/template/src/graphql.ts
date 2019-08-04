import { createClient, defaultExchanges } from 'urql';
import config from '~/config';

export default createClient({
  url: config.get('services.graphql'),
  fetchOptions: {
    headers: {}
  },
  exchanges: defaultExchanges
});
