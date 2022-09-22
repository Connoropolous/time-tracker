# hREA Network Dashboard

Make sure you're running an hREA `full_suite` happ.

Double check that this value in package.json `scripts -> start` command is right, in terms of the port number for your AppWebsocket on the Holochain runtime:

`REACT_APP_HC_CONN_URL='ws://localhost:17191'`

Run `npm run start`, and open `http://localhost:3000`

![a webpage with a header, left navigation, and in the main content panel there is a webform with a heading New Resource collecting details about a Resource Name, Initial Balance, Image, and a submit button](./images/new-resource.png)
![a webpage with a header, left navigation, and in the main content panel there is a heading Resources, two primary action buttons Transfer & Add Resource, and a table view listing one item which is Pie, with a measure of 3](./images/resources.png)
![a webpage with a header, left navigation, and in the main content panel there is a webform with a heading Transfer Resources collecting details such as From, To, and Amount](./images/new-transfer.png)