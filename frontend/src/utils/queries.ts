import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          email
          favorite_restaurants {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($userId: ID!, $restaurantId: ID!) {
    updateUsersPermissionsUser(
      id: $userId,
      data: { favorite_restaurants: [$restaurantId] }
    ) {
      data {
        id
        attributes {
          favorite_restaurants {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($userId: ID!, $restaurantId: ID!) {
    updateUsersPermissionsUser(
      id: $userId,
      data: { favorite_restaurants: { disconnect: [$restaurantId] } }
    ) {
      data {
        id
        attributes {
          favorite_restaurants {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
