const loginAction = name => {
  return {
	type: 'login',
  	payload: name
  }
}

export default loginAction;
