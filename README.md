# GitSpy - Fullstack Github browser

Gitspy is an alternative way to browse user profiles on Github. 
The project is built using React and Express and using the 
public Github API to source the data.

Search for users by name:

![Screenshot from 2025-04-05 06-50-13](https://github.com/user-attachments/assets/d0e8816d-f8b0-406d-a184-e46fa297cf2f)


And see a summary of the user's profile and repositories:

![Screenshot from 2025-04-05 06-59-19](https://github.com/user-attachments/assets/632cb29b-08a7-44b9-8d7d-3ff47f363696)


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
