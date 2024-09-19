import { createGlobalStyle } from "styled-components";
import BarricadaTTF from "../assets/fonts/BarricadaW01-Regular.ttf";
import MatterTTF from "../assets/fonts/Matter.ttf";

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
}
body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-gutter: stable;

    
}
#root {
    position: relative;
}
@font-face {
    font-family: 'BarricadaW01-Regular';
    src: url(${BarricadaTTF}) format('truetype');
    font-weight: 400;
    font-display: auto;
    font-style: normal;
}
@font-face {
    font-family: 'Matter';
    src: url(${MatterTTF}) format('truetype');
    font-display: auto;
    font-style: normal;
}

a{
text-decoration:none;
color: #512da8;
}
a:hover {
color: #ffffff;
}
p{
    color: #512da8;
    font-size: 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 13px;
    text-align: center;

}
textarea {
    width: 100%;
    outline:1px solid #512da8;
}

h3{
    font-size: 28px;
   font-family: sans-serif;
   margin: 5px;
   text-decoration: underline;

}

input{
    --tw-text-opacity: 1;
    color: rgb(17 24 39 / var(--tw-text-opacity));
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.625rem;
    background-color: rgb(249 250 251 / var(--tw-bg-opacity));
    border-color: rgb(209 213 219 / var(--tw-border-opacity));
    border-radius: 0.5rem;
    border-width: 1px;
    outline:1px solid #512da8;
   
}
select{
    color: rgb(17 24 39 / var(--tw-text-opacity));
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.625rem;
    background-color: rgb(249 250 251 / var(--tw-bg-opacity));
    border-color: rgb(209 213 219 / var(--tw-border-opacity));
    border-radius: 0.5rem;
    border-width: 1px;
    outline:1px solid #512da8;


}
h2{
    color: #512da8;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
}
`;
export default GlobalStyle;
