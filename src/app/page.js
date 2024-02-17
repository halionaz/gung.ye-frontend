import Article from "@/components/Article";
import style from "./page.module.css";

export default function Home() {
    return (
        <main className={style.home}>
            <Article />
            <Article />
            <Article />
        </main>
    );
}
