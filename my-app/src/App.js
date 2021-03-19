import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { IfFirebaseAuthedAnd } from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

const config = {
  apiKey: "AIzaSyBsQBCLeZeBzw7jB1PS-P66WXEjYtwFr8M",
  authDomain: "sbrt-practice-react-firebase.firebaseapp.com",
  projectId: "sbrt-practice-react-firebase",
  storageBucket: "sbrt-practice-react-firebase.appspot.com",
  messagingSenderId: "800986630828",
  appId: "1:800986630828:web:945737aea3a2003d0cad09",
  measurementId: "G-N7Y30CL7B6"
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FirebaseDatabaseProvider />
        <FirebaseAuthProvider firebase={firebase} {...config}>
          {
            // my app code
          }
        </FirebaseAuthProvider>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
        <IfFirebaseAuthedAnd
          filter={({ providerId, user }) => {
            if(!user.email){return false;}
            return (
              providerId !== "anonymous" &&
              user.email.indexOf("@companyname.com") > -1
            );
          }}
          >
         {({ isSignedIn, user, providerId }) => {
           return (
           //some jsx code
            <div>{user} is {isSignedIn}. Provider: {providerId}</div>
           );
         }}
        </IfFirebaseAuthedAnd>

      </header>
    </div>
  );
}

export default App;
