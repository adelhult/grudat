const groups = {
    "Load / Store": [
        "LDA",
        "LDX",
        "LDY",
        "LDSP",
        "LEAX",
        "LEAY",
        "STA",
        "STX",
        "STY",
        "STSP"
    ],
    "Data Movement": [
        "TFR",
        "EXG",
    ],
    "Control flow": [
        "JMP",
        "JSR",
        "BRA",
        "BSR",
        "^B (condition)",
        "RTS",
        "RTI"
    ],
    "Integer arithmetic": [
        "ADDA", "ADCA", "SUBA", "SBCA",
        "CLR",  "NEG",
        "DEC", "INC"
    ],
    "Integer test": [
        "CMPA",
        "CMPX",
        "CMPY",
        "CMPSP",
        "BITA",
        "TSTA",
        "TST",
    ],
    "Logical operations":[
        "ANDA",
        "ORA",
        "ANDCC",
        "ORCC",
        "EORA",
        "COMA",
        "COM"
    ],
    "Shift / Rotate":[
        "ASRA",
        "ASR",
        "LSLA",
        "LSL",
        "LSRA",
        "LSR",
        "ROLA",
        "ROL",
        "RORA",
        "ROR"
    ],
    "Stack operations": [
        "PSHA",
        "PSHCC",
        "PSHX",
        "PSHY",
        "PULA",
        "PULCC",
        "PULX",
        "PULY"
    ],
    "Misc.": [
        "NOP"
    ]
};

export default groups;