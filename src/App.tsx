
import GlobalStyle from "./styles/globalStyle.ts";
import { MainRouter } from "./routes/index.tsx";

function App() {

  return (
    <>
      <GlobalStyle />
      <MainRouter />
    </>
  );
}

export default App;
