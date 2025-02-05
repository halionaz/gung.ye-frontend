'use client';

import style from './Main.module.css';
import Login from '@/components/Login';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Article from '../Article/Article';
import NewArticle from '../NewArticle/NewArticle';
import { ArticleType } from '@/models/Article';

const Main = () => {
  // 로그인 세션 관리
  const { data: session } = useSession();

  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  // 새 아티클 작성 여부
  const [writing, setWriting] = useState(false);

  const refreshData = () => {
    fetch('/api/articles', {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className={style.ttl}>
      <div className={style.top}>
        <div className={style.logo}>
          <img className={style.logoimg} src="/logo.svg"></img>
          <div className={style.logoTxt}>
            <div>
              gung<span className={style.logobold}>:ye</span>
            </div>
            <img className={style.beta} src="/beta-symbol.png" />
          </div>
        </div>
      </div>
      <main className={style.main}>
        {session && (
          <div className={style.userInfo}>
            <img className={style.userImg} src={session.user?.image!}></img>
            <div>{session.user?.name}</div>
          </div>
        )}
        <Login session={session} />
        <div>
          {session && (
            <button
              onClick={() => {
                setWriting((prev) => {
                  return !prev;
                });
              }}
            >
              {writing ? '취소' : '신탁 올리기'}
            </button>
          )}
        </div>
        {writing && (
          <NewArticle refreshData={refreshData} setWriting={setWriting} />
        )}
        <div className={style.articles}>
          {loading ? (
            <div>로딩중</div>
          ) : (
            articles.map((article, index) => {
              return (
                <Article
                  key={index}
                  article={article}
                  session={session}
                  refreshData={refreshData}
                />
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
