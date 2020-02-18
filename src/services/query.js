import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($payload: any!) {
    login(payload: $payload)
      @rest(type: "Post", path: "/auth", method: "POST", bodyKey: payload) {
      token
    }
  }
`;

export const CONTACTS_QUERY = gql`
  query contacts {
    person @rest(type: "Person", path: "/contacts") {
      _id
      name
      email
      phone
      type
    }
  }
`;

export const ADD_CONTACT_MUTATION = gql`
  mutation addContactMutation($payload: any!) {
    addContact(payload: $payload)
      @rest(type: "Post", path: "/contacts", method: "POST", bodyKey: payload) {
      _id
      name
      email
      phone
      type
    }
  }
`;

export const DELETE_CONTACT_MUTATION = gql`
  mutation deleteMutation($payload: any!) {
    delete(payload: $payload)
      @rest(type: "Post", path: "/contacts/{args.payload}", method: "DELETE") {
      true
    }
  }
`;
