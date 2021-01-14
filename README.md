# GraphQL chat server

Reminder app for setting Apollo server.

### To run server
Necessary to have all dependencies installed
```
npm install
```

Starting server
```
npm start
```

### Using chat
Open `localhost:8080` in a browser. There will be a page with tabs.
In the first tab run. This is the tab where you observe live "conversation".
```
subscription {
  messageSent
}
```

In the other tab run
```
mutation {
  sendMessage(message: "Message of your choice")
}
```
