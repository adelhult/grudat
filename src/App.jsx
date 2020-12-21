import "./styles/App.css";
import Operations from "./Operations.jsx";
import Frame from "./Frame.jsx";
import Numbers from "./Numbers.jsx";
import operations from "./operations_data.js";
import types from "./types_data.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src="grudat_logo.svg" />
        <div className="title">
          <strong>Interaktiv</strong>
          <h1>FLISP-handbok</h1>
          <i>En app som gör det lite smidigare
             att lära sig använda FLIS
             processorn
          </i>
        </div>
      </header>

      <h2>Baser och tal</h2>
      <Numbers />
      <h2>Dataväg, styrenhet och minne</h2>
      <Frame src="computer.jpg"/>

      <h2>ALU-funktioner</h2>
      <Frame 
        src="alu_functions.png"
        additional="alu_functions_more.png"
      />
      <h2>Styrsignaler för väljarfunktioner</h2>
      <Frame
        src="multiplexers.png"
      />
      <h2>Assemblerdirektiv</h2>
      <Frame
        src="assembler.png"
        additional="assembler_more.png"
      />
      <h2>Operationer</h2>
      <Operations 
        operations={operations}
        types={types}
      />
      <div className="about">
        <img src="about.svg" />
        Tjänsten är ihopsnickrad av <a href="https://www.github.com/adelhult">@adelhult</a>,
        och källkoden kan du hitta på <a href="https://www.github.com/adelhult/grudat">Github</a>.
        <br/><br/>
        Observera: Digiflisp tillhör Göteborgs Mikrovaror och det gäller även 
        de bifogade bilagorna som lånats till denna sida. Manualen finns tillgänglig 
        att <a href="http://www.gbgmv.se/studies.html">ladda ner här</a>.
      </div>
    </div>
  );
}

export default App;
