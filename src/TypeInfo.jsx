import "./styles/TypeInfo.css"
import ReactMarkdown from 'react-markdown';

export default function TypeInfo(props) {
    const genOperations = ops => {
        return ops.map(op => {
            return <tr>
                <td className="short-hand">
                    {op.shortHand}
                </td>
                <td className="method">
                    {op.method}
                </td>
                <td className="op-code">
                    {op.code}
                </td>
                <td className="bytes">
                    {op.bytes}
                </td>
                <td className="cycles">
                    {op.cycles}
                </td>
                <td className="rtn">
                    {op.RTN}
                </td>
                <td className="n">
                    {String(op.n).replace("d", "Δ")}
                </td>
                <td className="z">
                    {String(op.z).replace("d", "Δ")}
                </td>
                <td className="v">
                    {String(op.v).replace("d", "Δ")}
                </td>
                <td className="c">
                    {String(op.c).replace("d", "Δ")}
                </td>
            </tr>
        });  
    };
    return (
        <div className="TypeInfo">
            <h3>{props.type}: {props.name}</h3>
            <ReactMarkdown>
                {props.description}
            </ReactMarkdown>


            {props.flagInfo && <>
                <strong className="subHeading">Flaggor</strong>
                <ReactMarkdown>
                    {props.flagInfo}
                </ReactMarkdown>
            </>}
            <strong className="subHeading">Operationer</strong>
            <div className="tableWrapper">
            <table className="operations">
                <tr>
                    <th>Variant</th>
                    <th>metod</th>
                    <th>OP</th>
                    <th>bytes</th>
                    <th>kl. cyklar</th>
                    <th>operation</th>
                    <th>n</th>
                    <th>z</th>
                    <th>v</th>
                    <th>c</th>
                </tr>
                {genOperations(props.operations)}
            </table>  
            </div>
        </div>
    );
}