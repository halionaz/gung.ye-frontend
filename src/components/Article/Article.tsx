// Main에 올라가는 신탁 컴포넌트

import { Session } from 'next-auth';
import style from './Article.module.css';
import { useEffect, useState } from 'react';
import { ArticleType } from '@/models/Article';
import { AnswerType } from '@/models/Answer';
import { UserType } from '@/models/User';

interface ArticleProps {
  article: ArticleType;
  session: Session | null;
  refreshData: () => void;
}

const Article = ({ article, session, refreshData }: ArticleProps) => {
  const outdateDate = new Date(article.dueDateTime);
  const postingDateDate = new Date(article.postingDateTime);
  const openDateDate = new Date(article.openDateTime);

  const [loading, setLoading] = useState(true);
  const [answerData, setAnswerData] = useState<AnswerType | null>();
  const [writerProfile, setWriterProfile] = useState<UserType | null>();

  const refreshArticleData = async () => {
    const res = await fetch(`/api/answers/byarticle/${article.id}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    setAnswerData(data);
  };

  const deleteArticle = () => {
    // 아티클을 지움
    fetch(`api/articles`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: article.id,
      }),
    }).then(() => {
      refreshData();
    });
  };
  const deleteAnswer = () => {
    // 내 답변을 지움
    fetch(`api/answers`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: answerData?.yourResponse,
      }),
    }).then(() => {
      refreshArticleData();
    });
  };

  useEffect(() => {
    // article 컴포넌트가 업데이트 될 때
    // 이 article에 답변된 answer 데이터 가져오기

    const fetchData = async () => {
      await refreshArticleData();

      // 작성자 정보 가지고 옴
      const res = await fetch(`/api/users/${article.userId}`, {
        cache: 'no-store',
      });
      const profileData = await res.json();
      console.log(profileData);
      setWriterProfile(profileData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <>로딩중</>
  ) : (
    <div className={style.article}>
      <div className={style.top}>
        {article.imgsrc && (
          <div className={style.imgBox}>
            <img className={style.articleImg} src={article.imgsrc}></img>
          </div>
        )}
        <div className={style.contentOutline}>
          <div className={style.title}>{article.title}</div>
          <div className={style.postingDate}>
            {postingDateDate.toLocaleDateString()}
          </div>
          <div className={style.topProfile}>
            <div className={style.profileImgBox}>
              <img className={style.profileImg} src={writerProfile?.image}></img>
            </div>
            <div className={style.profile}>
              <div className={style.upperProfile}>
                <div className={style.nickname}>{writerProfile?.name}</div>
              </div>
              <div className={style.lowerProfile}>
                <div className={style.gungyePoint}>
                  {writerProfile?.gungyePoint}
                </div>
                <div className={style.profileBadge}>멋진거</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.contents}>
          <div className={style.detailContents}>
            <div className={style.text}>{article.text}</div>
          </div>
        </div>
        <div className={style.poll}>
          <div className={style.leftPoll}>
            {session?.user.id !== article.userId &&
              // 다른 사람의 신탁인 경우
              (answerData?.yourResponse ? (
                // 답변을 남긴 경우
                <>
                  <div
                    className={style.answerBtn}
                    onClick={() => {
                      alert('답변 취소 로직');
                    }}
                  >
                    <img className={style.answerIcon} src="/yes.svg" />
                    <div
                      className={[
                        style.yesBtn,
                        answerData.yourResponse.answerVal === 'yes' &&
                          style.yesBtn_select,
                      ].join(' ')}
                    >
                      YES
                    </div>
                    <div className={style.graph}>
                      <div
                        className={style.yesGraph}
                        style={{
                          width: `${
                            (20 * (answerData.data.yes ?? 0)) /
                            answerData.totalNum
                          }rem`,
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={style.answerBtn}
                    onClick={() => {
                      alert('답변 취소 로직');
                    }}
                  >
                    <img className={style.answerIcon} src="/no.svg" />
                    <div
                      className={[
                        style.noBtn,
                        answerData.yourResponse.answerVal === 'no' &&
                          style.noBtn_select,
                      ].join(' ')}
                    >
                      NO
                    </div>
                    <div className={style.graph}>
                      <div
                        className={style.noGraph}
                        style={{
                          width: `${
                            (20 * (answerData.data.no ?? 0)) /
                            answerData.totalNum
                          }rem`,
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                // 답변을 남기지 않은 경우
                <>
                  <div
                    className={style.answerBtn}
                    onClick={() => {
                      fetch(`api/answers`, {
                        method: 'POST',
                        body: JSON.stringify({
                          answerVal: 'yes',
                          article: article.id,
                        }),
                      }).then(() => {
                        refreshArticleData();
                      });
                    }}
                  >
                    <img className={style.answerIcon} src="/yes.svg" />
                    <div className={style.yesBtn}>YES</div>
                  </div>
                  <div
                    className={style.answerBtn}
                    onClick={() => {
                      fetch(`api/answers`, {
                        method: 'POST',
                        body: JSON.stringify({
                          answerVal: 'no',
                          article: article.id,
                        }),
                      }).then(() => {
                        refreshArticleData();
                      });
                    }}
                  >
                    <img className={style.answerIcon} src="/no.svg" />
                    <div className={style.noBtn}>NO</div>
                  </div>
                </>
              ))}
          </div>
          <div className={style.rightPoll}>
            <div className={style.totalStake}>{answerData?.pointSum}</div>
          </div>
        </div>
        <div className={style.additionalInfo}>
          <div className={style.deadline}>
            {`${outdateDate.toLocaleDateString()}에 마감`}
          </div>
          {/* 마감 일시를 누르거나 hover 할 시 공개 일시가 표시됨 */}
          <div className={style.openDate}>
            {`${openDateDate.toLocaleDateString()}에 답 공개`}
          </div>
        </div>
      </div>
      <div className={style.popularity}>
        <div className={style.leftPop}>
          <div className={style.participants}>
            <div className={style.popularityTitle}>참여자</div>
            <div className={style.popularityNum}>{answerData?.totalNum}</div>
          </div>
          {/* <div className={style.likes}>
                        <div className={style.popularityTitle}>좋아요</div>
                        <div className={style.popularityNum}>30</div>
                    </div>
                    <div className={style.comments}>
                        <div className={style.popularityTitle}>댓글</div>
                        <div className={style.popularityNum}>7</div>
                    </div> */}
        </div>
        <div className={style.rightPop}>
          <div className={style.more} onClick={deleteArticle}>
            ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
