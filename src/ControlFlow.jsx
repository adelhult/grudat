import "./styles/ControlFlow.css";

export default function ControlFlow(props) {
    const controlFlowOps = [
        {
            name: "BCS",
            desc: "Branch if carry set",
            func: "Hopp om carry",
            flag: "C = 1"
        },
        {
            name: "BCC",
            desc: "Branch if carry clear",
            func: "Hopp om ICKE carry",
            flag: "C = 0"
        },
        {
            name: "BEQ",
            desc: "Branch if equal",
            func: "Hopp om zero",
            flag: "Z = 1"
        },
        {
            name: "BNE",
            desc: "Branch if not equal",
            func: "Hopp om ICKE zero",
            flag: "Z = 0"
        },
        {
            name: "BMI",
            desc: "Branch if minus",
            func: "Hopp om negative",
            flag: "N = 1"
        },
        {
            name: "BPL",
            desc: "Branch if plus",
            func: "Hopp om ICKE negative",
            flag: "N = 0"
        },
        {
            name: "BVS",
            desc: "Branch if overflow set",
            func: "Hopp om overflow",
            flag: "V = 1"
        },
        {
            name: "BVC",
            desc: "Branch if overflow clear",
            func: "Hopp om ICKE overflow",
            flag: "V = 0"
        },
        {
            name: "BHI",
            desc: "Branch if higher (unsigned)",
            func: "R > M",
            flag: "C + Z = 0"
        },
        {
            name: "BHS",
            desc: "Branch if higher or same (unsigned)",
            func: "R >= M",
            flag: "C = 0"
        },
        {
            name: "BLO",
            desc: "Branch if lower (unsigned)",
            func: "R < M",
            flag: "C = 1"
        },
        {
            name: "BLS",
            desc: "Branch if lower or same (unsigned)",
            func: "R <= M",
            flag: "C + Z = 1"
        },
        {
            name: "BGT",
            desc: "Branch if greater than (signed)",
            func: "R > M",
            flag: "(N xor V) + Z = 0"
        },
        {
            name: "BGE",
            desc: "Branch if greater or equal (signed)",
            func: "R >= M",
            flag: "N xor V = 0"
        },
        {
            name: "BLT",
            desc: "Branch if less than (signed)",
            func: "R < M",
            flag: "N xor V = 1"
        },
        {
            name: "BLE",
            desc: "Branch if less or equal (signed)",
            func: "R <= M",
            flag: "(N xor V) + Z = 1"
        }
    ].map( op => {
        return <tr key={op.name} >
            <td
                className="name"
                onClick={() => props.setSelected(op.name)}
            >
                {op.name}
            </td>
            <td>{op.desc}</td>
            <td>{op.func}</td>
            <td>{op.flag}</td>
        </tr>;
    });

    return <div className="ControlFlow">
        <table>
            <tr>
                <th>Instruktion</th>
                <th>Beskrivning</th>
                <th>Funktion / relation</th>
                <th>Villkorsindikator</th>
            </tr>
            {controlFlowOps}
        </table>
    </div>;
}