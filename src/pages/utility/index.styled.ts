import styled from "styled-components";

const UtilBodyContainer = styled.div`
max-width:100vw;
width:100%;
`;

const UtilMainCotainer = styled.div`
max-width: 1440px;
  margin: auto;
  padding: 36px 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: baseline;
  @media only screen and (max-width: 1200px) {
      padding: 18px 20px;
  }`;
const UtilTopSide = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;`;
const UtilBottomSide = styled.div`
justify-content: center;
align-items: center;
display: flex;
width: 100%;
  flex-direction: column;
@media only screen and (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
  }
`;
const UtilLeftSide = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 10px;
max-width: 445px;
padding:10px;
`;
const UtilRightSide = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 50%;

`;

const UtilRightUp = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding:10px;
`;
const UtilRightDown = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
max-width: 445px;
padding:10px;
`;
const TranInfoItem = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
gap:10px;`;



export {
  UtilBodyContainer,
  UtilLeftSide,
  UtilMainCotainer,
  UtilRightDown,
  UtilRightSide,
  UtilBottomSide,
  UtilRightUp,
  UtilTopSide,
  TranInfoItem,

}