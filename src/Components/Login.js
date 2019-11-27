import React, { useContext, useEffect } from 'react'

import { UserContext } from "../Contexts/UserContext";

import { ui, GoogleAuthProvider, FacebookAuthProvider } from '../Firebase/firebase';
import 'firebaseui/dist/firebaseui.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = ({ history }) => {
  const { user, userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (user && user.uid) {
      return history.replace('/profile');
    } else if(user === null) {
      return;
    }

    document.title = "Log in | Resident 51";

    ui.start('#firebaseui-auth-container', {
      'callbacks': {
        signInSuccessWithAuthResult: function (authResult) {
          if (authResult.additionalUserInfo && authResult.additionalUserInfo.isNewUser) {
            userDispatch({ type: "NEW_USER" });
          }
          history.push('/events');
          return false;
        },
        signInFailure: error => {
          // TODO: handle errors gracefully
          history.push('/login', { error });
          return false;
        }
      },
      signInFlow: 'popup',
      signInOptions: [
        GoogleAuthProvider,
        FacebookAuthProvider,
      ],
      tosUrl: () => history.push('/terms-of-service'),
      privacyPolicyUrl: () => history.push('/privacy-policy'),
    });
  }, [user, history, userDispatch]);

  return (user !== null) &&
    <Container fluid={true}>
      <Row>
        <Col className="text-center" xs={12}>
          <h1>Log in to Resident 51:</h1>
        </Col>
        <Col xs={12}>
          <div id="firebaseui-auth-container"></div>
        </Col>
      </Row>
    </Container>
}

export default Login