import { Stack } from 'expo-router';
import { 
    ApolloClient, 
    InMemoryCache, 
    ApolloProvider, 
    gql,
} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://haripasa.us-east-a.ibm.stepzen.net/api/foodsearch/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 
        'apikey haripasa::local.net+1000::41f52beaee0e9a7aa411a81b52252fc16bd5e998dd99fab144e0684bf63ce535'
        
    },
  });

const RootLayout = () => {
  return (
  <ApolloProvider client={client}>
    <Stack />
  </ApolloProvider>
  );
};

export default RootLayout;