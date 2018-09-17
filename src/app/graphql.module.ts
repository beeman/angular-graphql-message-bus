import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { environment } from '../environments/environment';
import { split } from 'apollo-link';
import { OperationDefinitionNode } from 'graphql';

export function createApollo(httpLink: HttpLink) {
  // Create an http link:
  const http = httpLink.create({
    uri: environment.graphqlUrl
  });

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: environment.graphqlWsUrl,
    options: {
      reconnect: true
    }
  });

  const link = split(
    // split based on operation type
    ({query}) => {
      const {kind, operation}: any = getMainDefinition(query);
      // const definiton: ;
      // definiton.kind
      return ( kind === 'OperationDefinition' ) && operation === 'subscription' || operation === 'mutation';
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
