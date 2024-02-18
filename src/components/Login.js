import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
    const { data: session } = useSession();

    if(session){
        return (
            <button onClick={() => signOut()}>로그아웃</button>
        )
    } else {
        return (
            <button onClick={() => signIn()}>로그인</button>
        );
    }
};

export default Login;
