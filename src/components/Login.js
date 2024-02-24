import { signIn, signOut } from "next-auth/react";

const Login = ({ session }) => {
    if (session) {
        return <button onClick={() => signOut()}>로그아웃</button>;
    } else {
        return <button onClick={() => signIn()}>로그인</button>;
    }
};

export default Login;
