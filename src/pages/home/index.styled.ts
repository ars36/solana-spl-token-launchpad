import styled from "styled-components";


const HomeBodyContainer = styled.div`
max-width:100vw;
width:100%;
`

const HomeMainContainer = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 36px 54px;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 640px) {
    padding: 18px 20px;
  }
`;

export {
  HomeBodyContainer,
  HomeMainContainer
};
