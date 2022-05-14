export function signInRequest(email, password, navigate) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password, navigate },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut(navigate) {
  return {
    type: '@auth/SIGN_OUT',
    payload: { navigate },
  };
}
