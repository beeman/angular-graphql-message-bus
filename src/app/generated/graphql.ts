/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export type Json = any;

export interface Query {
  help?: string | null;
}

export interface Mutation {
  publish?: MessagePayload | null;
}

export interface MessagePayload {
  type: string;
  scope?: string | null;
  payload?: Json | null;
}

export interface Subscription {
  subscribe?: MessagePayload | null;
}

export interface PublishInput {
  type: string;
  scope?: string | null;
  payload?: Json | null;
}

export interface SubscribeInput {
  type?: string | null;
  scope?: string | null;
}
export interface PublishMutationArgs {
  message?: PublishInput | null;
}
export interface SubscribeSubscriptionArgs {
  filter?: SubscribeInput | null;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    help?: HelpResolver<string | null, any, Context>;
  }

  export type HelpResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    publish?: PublishResolver<MessagePayload | null, any, Context>;
  }

  export type PublishResolver<
    R = MessagePayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, PublishArgs>;
  export interface PublishArgs {
    message?: PublishInput | null;
  }
}

export namespace MessagePayloadResolvers {
  export interface Resolvers<Context = any> {
    type?: TypeResolver<string, any, Context>;
    scope?: ScopeResolver<string | null, any, Context>;
    payload?: PayloadResolver<Json | null, any, Context>;
  }

  export type TypeResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ScopeResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PayloadResolver<
    R = Json | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = any> {
    subscribe?: SubscribeResolver<MessagePayload | null, any, Context>;
  }

  export type SubscribeResolver<
    R = MessagePayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SubscribeArgs>;
  export interface SubscribeArgs {
    filter?: SubscribeInput | null;
  }
}

export namespace Publish {
  export type Variables = {
    message?: PublishInput | null;
  };

  export type Mutation = {
    __typename?: "Mutation";
    publish?: Publish | null;
  };

  export type Publish = {
    __typename?: "MessagePayload";
    type: string;
    scope?: string | null;
    payload?: Json | null;
  };
}

export namespace Help {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    help?: string | null;
  };
}

export namespace Subscribe {
  export type Variables = {
    filter?: SubscribeInput | null;
  };

  export type Subscription = {
    __typename?: "Subscription";
    subscribe?: Subscribe | null;
  };

  export type Subscribe = {
    __typename?: "MessagePayload";
    type: string;
    scope?: string | null;
    payload?: Json | null;
  };
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class PublishGQL extends Apollo.Mutation<
  Publish.Mutation,
  Publish.Variables
> {
  document: any = gql`
    mutation publish($message: PublishInput) {
      publish(message: $message) {
        type
        scope
        payload
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class HelpGQL extends Apollo.Query<Help.Query, Help.Variables> {
  document: any = gql`
    query help {
      help
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class SubscribeGQL extends Apollo.Subscription<
  Subscribe.Subscription,
  Subscribe.Variables
> {
  document: any = gql`
    subscription subscribe($filter: SubscribeInput) {
      subscribe(filter: $filter) {
        type
        scope
        payload
      }
    }
  `;
}
