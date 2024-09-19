import styled from "styled-components";

const HeaderMainContainer = styled.div`
  max-width: 100vw;
  width: 100%;
`;

const MainContainer = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 36px 54px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1200px) {
    padding: 18px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const OtherBtn = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 640px) {
    display: none;
  }
`;
const HeaderLogo = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 16px;
  background-color: white;
  justify-content: center;
  border: 1px solid #252525;
  cursor: pointer;
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px black;

  &:hover {
    background-color: #e0ddec;
    transform: translateY(2px);
    box-shadow: 3px 3px black;
  }

  &:active {
    transform: translateY(4px);
    box-shadow: 1px 1px black;
  }
  @media (max-width: 640px) {
    width: 52px;
    height: 52px;
    box-shadow: 3px 3px black;

    &:hover {
      background-color: #e0ddec;
      transform: translateY(2px);
      box-shadow: 2px 2px black;
    }

    &:active {
      transform: translateY(4px);
      box-shadow: 1px 1px black;
    }
  }
`;
const HidBtn = styled.div`
  border-radius: 16px;
  background-color: white;
  justify-content: center;
  border: 1px solid #252525;
  cursor: pointer;
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px black;
  display: none;

  &:hover {
    background-color: #e0ddec;
    transform: translateY(2px);
    box-shadow: 3px 3px black;
  }

  &:active {
    transform: translateY(4px);
    box-shadow: 1px 1px black;
  }
  @media (max-width: 640px) {
    width: 52px;
    height: 52px;
    box-shadow: 3px 3px black;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #e0ddec;
      transform: translateY(2px);
      box-shadow: 2px 2px black;
    }

    &:active {
      transform: translateY(4px);
      box-shadow: 1px 1px black;
    }
  }
`;

const BasicButton = styled.div`
  border-radius: 60px;
  border: 1px solid #252525;
  background-color: white;
  cursor: pointer;
`;
export const MenuBtn = styled(BasicButton)`
  height: 66px;
  position: relative;
  width: fit-content;
  font-family: Bebas Neue;
  padding: 16px 27px;
  transition: 0.2s all;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px black;
  gap: 10px;

  &:hover {
    background-color: #f8d467;
    transform: translateY(2px);
    box-shadow: 0 3px black;
  }

  &:active {
    transform: translateY(4px);
    box-shadow: 0 1px black;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

const Title = styled.div`
 
  text-align: center;
  font-family: BarricadaW01-Regular;
  text-decoration:underline;
  
  /* font-family: sans-serif; */
  font-size: 46px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color:#512da8;
  @media only screen and (max-width: 1000px) {
    font-size: 35px;
  }
  @media only screen and (max-width: 640px) {
    font-size: 26px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 26px;
  }
`;

const Ul = styled.ul`
display:flex;
`;

const Li = styled.li`
color:#512da8;
font-family: sans-serif;
margin:10px;
list-style-type: none;
 text-decoration: none;
`;
const LearnButton = styled.div`
  // margin:10px;
  color: #512da8;
  font-family: Bebas Neue;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  text-align: center;
  margin: auto;

  padding: 8px 10px;
  border-radius: 60px;
  border: 1px solid #252525;
  background-color: white;
  width: fit-content;
  cursor: pointer;
  transition: 0.2s all;
  box-shadow: 0 5px black;
  text-align:center;

  &:hover {
    background-color: #512da8;
    transform: translateY(2px);
    color:#ffffff;
    box-shadow: 0 3px black;
  }

  &:active {
    transform: translateY(4px);
    box-shadow: 0 1px black;
  }
`;

export {
  HeaderMainContainer,
  MainContainer,
  OtherBtn,
  HeaderLogo,
  HidBtn,
  LearnButton,
  Title,
  Ul,
  Li
};
