import styled from "styled-components"

const TokenBodyContainer = styled.div`
max-width:100vw;
width:100%;
`;
const TokenMainContainer = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 36px 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media only screen and (max-width: 640px) {
      padding: 18px 20px;
  }
`;
const TokenUpSide = styled.div`
width:70%;
margin: auto;
display:flex;
justify-content: space-around;
@media only screen and (max-width: 1200px) {
     flex-direction: column;
     justify-content: center;

  }

`;

const IMAGE = styled.div`
display:flex;
flex-direction: column;`



const TokenUpLeftSide = styled.div`
width: 40%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media only screen and (max-width: 1200px) {
    margin: auto;
  }
`;
const TokenUpRightSide = styled.div`
padding-left: 30px;
display: flex;
flex-direction: column;
@media only screen and (max-width: 1200px) {
   
     padding-left: 0%;
     
  }
`;
const TokenDownSide = styled.div`
width:70%;
margin: auto;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:15px

`;
const TokenInfoItem = styled.div`
width: 100%;
gap:10px;
@media only screen and (max-width: 1200px) {
   display: flex;
   flex-direction: column;
   justify-content: center;
   
}
`

export {
  TokenBodyContainer,
  TokenMainContainer,
  TokenUpSide,
  TokenUpLeftSide,
  TokenUpRightSide,
  TokenDownSide,
  TokenInfoItem,
  IMAGE
};
