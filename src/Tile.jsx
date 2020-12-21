import "./styles/Tile.css";
import getColor from "./getColor.js";

export default function Tile(props) {
    return (
        <div
        className="Tile"
        key={props.code}
        style={{background: getColor(props.type)}}
        onClick={e => props.select(props.type)}
        >
            <span className="op-code">{props.code}</span>
            <span className="cycles">{props.cycles}</span>
            <span className="short-hand">{props.shortHand.split("   ")[0]}</span>
            <span className="method">{props.method}</span>
            <span className="bytes">{props.bytes}</span>
        </div>
    );
}