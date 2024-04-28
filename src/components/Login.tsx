import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

interface LoginProps {
  session: Session | null;
}

const Login = ({ session }: LoginProps) => {
  if (session) {
    return <button onClick={() => signOut()}>로그아웃</button>;
  } else {
    return <button onClick={() => signIn()}>로그인</button>;
  }
};

export default Login;
