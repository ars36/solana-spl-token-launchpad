import * as S from "../../components/layout/header/index.styled";
import * as H from "./index.styled";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const Home = () => {
  const { isConnected } = useUserContext();

  return (
    <>
      <H.HomeBodyContainer>
        {isConnected ? (
          <H.HomeMainContainer>
            <S.LearnButton>
              <Link to="/token">TOKEN</Link>
            </S.LearnButton>
            <S.LearnButton>
              <Link to="/utility">UTILITY</Link>
            </S.LearnButton>
          </H.HomeMainContainer>
        ) : (
          <p>Please connect your wallet to access this content.</p>
        )}
      </H.HomeBodyContainer>
    </>
  );
};

export default Home;
