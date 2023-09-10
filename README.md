# G3B8_ReactJS_GradedProject4
Movie Application

# very Important to note

# a. node_modules file not included
# b. just the components which are required are extracted and uploaded here (specifically from src/ and public/)

# c. the url of localhost is stored in .env file, the code snippet of .env is as follow
  REACT_APP_BASE_URL=http://localhost:4000

# steps to run the application
1. mkdir movie-app
2. cd movie-app
3. npx create-react-app client --template typescript
4. cd client
5. npm install axios
6. npm i react-router-dom
7. npm i react-bootstrap bootstrap
8. replicate src/, public/, package.json, package-lock.json, tsconfig.json
9. cd ..
10. mkdir server
11. cd server
12. npm install json-server
13. paste the data.json file here
14. from server terminal, json-server data.json --port 4000
# 15. mind that the json-server is rendering on port 4000
16. from client terminal, npm start (to start the react application)

# please refer to the video demonstration.
