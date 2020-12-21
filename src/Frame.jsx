import { useState } from "react";
import "./styles/Frame.css";

export default function Frame(props) {
    const [focused, setFocus] = useState(false);
    const [showingAdditional, setShowingAdditional] = useState(false);
    return <div 
            className="Frame"
            style={focused ? {maxWidth:"100%"} : {maxWidth:"60%"}}
            >

            { props.src ? <img src={props.src} onClick={() => setFocus(!focused)} /> : ""}
            {
                props.additional ? (
                    !showingAdditional ?
                        <div
                            className="additional"
                            onClick={() => { setFocus(true); setShowingAdditional(!showingAdditional)}}
                        >
                            Visa ytterligare info ↓
                        </div>
                    :
                        <>
                            <img src={props.additional} />
                            <div
                                className="additional"
                                onClick={() => { setFocus(false); setShowingAdditional(!showingAdditional)}}
                            >
                                Dölj extra-informationen ↑
                            </div>
                        </>
                )
                   
                : ''
            }
            
    </div> 
}