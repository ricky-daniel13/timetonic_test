type LoginReturn = {
    userToken: string|null;
    sesionToken: string|null;
  };

export const Login = async (email: string, password: string): Promise<LoginReturn> => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    // Fake authentication logic
    if (email === 'example@example.com' && password === 'password') {
      return { userToken: "123123", sesionToken: 'fakeAuthToken' };
    } else {
      return { userToken: null, sesionToken: null };
    }
  };