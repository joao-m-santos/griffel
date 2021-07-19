import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

async function getTrainingsByWorkspace(id) {
  try {
    const response = await client.query({
      query: gql`
        {
          getTrainingsByWorkspace(workspaceId: ${id}) {
            id
            name
            organizer
            description
            status
            tickets {
              id
            }
            maxRegistrations
            registrations
            revenue
            sessions {
              venue {
                name
              }
            }
          }
        }
      `
    });

    const { error, data } = response;

    if (error) throw error;

    return data.getTrainingsByWorkspace;
  } catch (error) {
    console.log("service error", error);
  }
}

const service = {
  getTrainingsByWorkspace
};

export default service;
