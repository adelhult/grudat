import "./styles/Numbers.css";
import {useState} from "react";

export default function Numbers() {
    const [num, setNum] = useState(NaN);
    const [comp, setComp] = useState(false);

    const write = (e, base) => {
        let newNum = parseInt(e.target.value, base);
        if (newNum > 255 && comp) {
            return;
        }

        if (base == 10 && comp && newNum < 0) {
            setNum(newNum + 256);
        } else {
            setNum(newNum);
        }
    }
    

    const read = base => {
        if (!isNaN(num)) {
            let newNum = num.toString(base);
            if (comp && base == 10 && newNum > 127) {
                return newNum - 256;
            } else {
                return newNum;
            }
        } else {
            return "";
        }
    }

    return <div className="Numbers">
        <button
            className={comp ? "active" : ""}
            onClick={() => setComp(!comp)}>
            { comp ?
                <span>tvåkomplementsform är på</span>
                : 
                <span>tvåkomplementsform är avstängt</span>
            }
        </button>

        <div className="flexContainer">
            <div className="input">
                <span className="legend">Dec</span>
                <input value={read(10)} type="text" onChange={e => write(e, 10)}/>
            </div>
            <div className="input">
                <span className="legend">Hex</span>    
                <input value={read(16).toUpperCase()} onChange={e => write(e, 16)} type="text"/>
            </div>
            <div className="input">
                <span className="legend">Bin</span>                
                <input value={read(2)} onChange={e => write(e, 2)} type="text"/>
            </div>
        </div>
        <p>
            Kommentar: tvåkomplementsformen utgår från att talet är 8-bitar.
            Inmatningen är lite wanky i största allmänhet med, men om man promt
            vill konvertera många tal mellan olika baser kan man använda typ
            Mathematica eller någon annan konverterare online.
        </p>
    </div>
}