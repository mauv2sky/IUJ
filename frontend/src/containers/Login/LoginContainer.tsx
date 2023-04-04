import React, { useState, useEffect } from 'react';
import loginLogo from '../../assets/loginLogo.svg';
import googleLogin from '../../assets/googleLogin.png';
import styles from './LoginContainer.module.scss';
import { useNavigate } from 'react-router';

function LoginContainer() {
  const navigate = useNavigate();
  const comment = '로그인으로 맞춤 매물을 추천받아 보세요.';
  const [showComment, setShowComment] = useState<number>(0);
  const commentList = comment.split('').slice(0, showComment);

  useEffect(() => {
    const commentInterval = window.setInterval(() => {
      setShowComment((prev) => prev + 1);
    }, 70);

    return () => {
      clearInterval(commentInterval);
    };
  }, []);

  /** 구글 로그인 */
  const OAuth = async () => {
    try {
      // const url = 'http://localhost:5000/oauth2/authorization/google';
      const url = 'http://j8e103.p.ssafy.io:5000/oauth2/authorization/google';
      window.location.href = url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <img
        id={styles.logo}
        src={loginLogo}
        alt="loginLogo"
        onClick={() => {
          navigate('/');
        }}
      />
      <p>
        {commentList.map((char) => (
          <span>{char}</span>
        ))}
      </p>
      <img id={styles.login} src={googleLogin} alt="googleLogin" onClick={OAuth} />
    </div>
  );
}

export default LoginContainer;
