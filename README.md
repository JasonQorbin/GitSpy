# GitSpy - Fullstack Github browser

Gitspy is an alternative way to browse user profiles on Github. 
The project is built using React and Express and using the 
public Github API to source the data.

Search for users by name:

*Insert screenshot of the search results*

And see a summary of the user's profile and repositories:

*Insert screenshot of the user details screen*

## Installation and usage

1. Clone the repo
2. Install the required dependencies and frontend artifacts by running `npm run build` from the root folder.
3. Start the server with `npm start`. 


## Private resources

By default the app will only retrieve publicly available results. If you need to see private repos
or ones that otherwise require privileged access (e.g. repos associated with an organisation)
then you will need to provide an access token associated with the account with the privileges you 
want to use. To do this:

1. Get an access token from the Developer settings section of your account settings on GitHub.
The preferred token type is a 'fine-grained personal access token'.
2. make a copy of the `.env.sample` file and call it `.env`. Then copy your token to the `ACCESS_TOKEN`
line.
3. Restart the backend server so that the new environment variable can be sourced.
