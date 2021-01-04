const types = [
    {
        "type": "ADCA",
        "name": "Add data with carry into register A",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1 vid additionen \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll vid additionen \n* V: Ettställs om 2-komplements-overflow inträffar vid additionen \n\n* C: Ettställs om summan vid additionen ej ryms i åtta bitar",
        "description": "Utför åttabitars addition av dataordet i minnet och innehållet i register A. Resultatets åtta minst signifikanta bitar placeras i register A. Den nionde biten (mest signifikant) placeras i C- biten (C-flaggan) i CC-registret. Det gamla värdet på C-biten i flaggregistret används som minnessiffra i minst signifikant position (minnessiffra in) vid additionen."
    },
    {
        "type": "ADDA",
        "name": "Add data into register A",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1 vid additionen \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll vid additionen \n* V: Ettställs om overflow vid 2-komplementsrepresentation inträffar vid additionen \n* C: Ettställs om summan vid additionen ej ryms i åtta bitar, dvs blir större än eller lika med 256",
        "description": "Utför åttabitars addition av dataordet i minnet och innehållet i register A. Resultatets åtta minst signifikanta bitar placeras i register A. Den nionde biten (mest signifikant) placeras i C- biten (C-flaggan) i CC-registret."
    },
    {
        "type": "ANDA",
        "name": "Logical AND data into register A",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Påverkas ej",
        "description": "Utför bitvis AND-operation mellan dataordet i minnet och innehållet i register A. Resultatet placeras i register A."
    },
    {
        "type": "ANDCC",
        "name": "Logical AND data into register CC",
        "flagInfo": "Flaggorna nollställs i de positioner där CC eller Data innehåller någon nolla.",
        "description": "Utför bitvis AND-operation mellan innehållet i flaggregistret (CC) och dataordet. Resultatet placeras i flaggregistret."
    },
    {
        "type": "ASL",
        "name": "Arithmetic shift left",
        "flagInfo": "* N: Kopia av bit 7 efter skiftet. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Ettställs om C och bit 7 är olika efter operationen, dvs overflow vid 2-komplements-representation inträffar. \n* C: bit 7 före skiftet blir ny carrybit efter skiftet.",
        "description": "Skiftar operanden ett steg till vänster, dvs. multiplicerar ett tal med eller utan inbyggt tecken med 2. Instruktionen är identisk med LSL. \n\n ![](op_images/l_and_a_shift_left.png)"
    },
    {
        "type": "ASR",
        "name": "Arithmetic shift right",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: bit 0 före skiftet blir ny carrybit efter skiftet.",
        "description": "Skiftar operanden ett steg till höger, dvs. dividerar tal med inbyggt tecken med 2. \n \n ![](op_images/a_shift_right.png)"
    },
    {
        "type": "BCC",
        "name": "Branch on carry clear (=BHS)",
        "flagInfo": "Påverkas ej",
        "description": "Testar C-flaggans värde. Om C=0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om C=1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BCS",
        "name": "Branch on carry set (=BLO)",
        "flagInfo": "Påverkas ej",
        "description": "Testar C-flaggans värde. Om C=1 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om C=0 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BEQ",
        "name": "Branch on equal to zero",
        "flagInfo": "Påverkas ej",
        "description": "Testar Z-flaggans värde. Om Z=1 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om Z=0 utförs inget"
    },
    {
        "type": "BGE",
        "name": "Branch on greater than or equal to zero",
        "flagInfo": "Påverkas ej",
        "description": "Testar värdet hos Booleska uttrycket N xor V. Om N xor V =0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om N xor V =1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BGT",
        "name": "Branch on greater than zero",
        "flagInfo": "Påverkas ej",
        "description": "Testar värdet hos Booleska uttrycket (N xor V)+Z. Om (N xor V)+Z = 0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om (N xor V)+Z =1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BHI",
        "name": "Branch if higher than zero",
        "flagInfo": "Påverkas ej",
        "description": "Beskrivning: Testar värdet hos Booleska uttrycket C+Z. Om C+Z = 0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om C+Z = 1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BHS",
        "name": "Se BCC",
        "flagInfo": "",
        "description": ""
    },
    {
        "type": "BITA",
        "name": "Bit test register A",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Påverkas ej",
        "description": "Utför bitvis AND-operation mellan dataordet i minnet och innehållet i register A. Resultatet lagras ej, utan påverkar endast flaggorna"
    },
    {
        "type": "BLE",
        "name": "Branch on less than or equal to zero",
        "flagInfo": "Påverkas ej",
        "description": "Testar värdet hos Booleska uttrycket (N xor V)+Z. Om (N xor V)+Z = 1 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om (N xor V)+Z = 0 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BLO",
        "name": "Se BCS",
        "flagInfo": "",
        "description": ""
    },
    {
        "type": "BLS",
        "name": "Branch on lower or same",
        "flagInfo": "Påverkas ej",
        "description": "Testar värdet hos Booleska uttrycket C+Z. Om C+Z = 1 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om C+Z = 0 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BLT",
        "name": "Branch on less than zero",
        "flagInfo": "Påverkas ej",
        "description": "Testar värdet hos Booleska uttrycket N xor V. Om N xor V = 1 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnetOm N xor V = 0 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BMI",
        "name": "Branch on minus",
        "flagInfo": "Påverkas ej",
        "description": "Testar värdet hos Booleska uttrycket NV. Om NV = 1 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnetOm NV = 0 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BNE",
        "name": "Branch if not equal to zero",
        "flagInfo": "Påverkas ej",
        "description": "Testar Z-flaggans värde. Om Z=0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om Z=1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BPL",
        "name": "Branch on plus",
        "flagInfo": "Påverkas ej",
        "description": "Testar N-flaggans värde. Om N=0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om N=1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BRA",
        "name": "Branch always",
        "flagInfo": "Påverkas ej",
        "description": "Ett hopp utförs till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkning av destinationsadressen pekar PC på operationskoden som (eventuellt) finns direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BSR",
        "name": "Branch to subroutine",
        "flagInfo": "Påverkas ej",
        "description": "PC-värdet (återhoppsadressen) skrivs först på stacken. Ett hopp utförs sedan till adressen ADRESS = PC+Offset. Offset räknas från adressen efter BSR-instruktionen, dvs vid uträkningen av hopp-adressen pekar PC på operationskoden direkt efter BSR-instruktionen (= återhoppsadressen)."
    },
    {
        "type": "BVC",
        "name": "Branch if no overflow",
        "flagInfo": "Påverkas ej",
        "description": "Testar V-flaggans värde. Om V=0 utförs ett hopp till adressen ADRESS = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operationskoden direkt efter branchinstruktionen i minnet. Om V=1 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "BVS",
        "name": "Branch if overflow",
        "flagInfo": "Påverkas ej",
        "description": "Testar V-flaggans värde. Om V=1 utförs ett hopp till adressen Adr = PC+Offset. Offset räknas från adressen efter branchinstruktionen, dvs vid uträkningen av hoppadressen pekar PC på operations-koden direkt efter branchinstruktionen i minnet. Om V=0 utförs inget hopp. Nästa instruktion blir i så fall den direkt efter branchinstruktionen i minnet."
    },
    {
        "type": "CLR",
        "name": "Clear register or memory",
        "flagInfo": "* N: Nollställs. \n* Z: Ettställs. \n* V: Nollställs \n* C: Nollställs",
        "description": "Register A eller innehållet på minnesadress nollställs."
    },
    {
        "type": "CMP",
        "name": "Compare register and data",
        "flagInfo": "* N: Får värdet hos skillnadens teckenbit (bit 7). \n* Z: Ettställs om skillnaden blir noll. \n* V: Ettställs om 2-komplementoverflow uppstår vid subtraktionen \n* C: Ettställs om borrow uppstår vid subtraktionen.",
        "description": "Operanden subtraheras från innehållet i det angivna registret. Skillnaden lagras ej, utan påverkar endast flaggorna."
    },
    {
        "type": "COM",
        "name": "Complement register or memory",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Påverkas ej",
        "description": ""
    },
    {
        "type": "DEC",
        "name": "Decrement register or memory",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1 \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll \n* V: Ettställs om 2-komplementoverflow uppstår \n* C: Påverkas ej",
        "description": "Subtraherar 1 från operanden"
    },
    {
        "type": "EOR",
        "name": "Exclusive OR register A",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Påverkas ej.",
        "description": "Utför bitvis XOR-operation mellan dataordet i minnet och innehållet i register A. Resultatet placeras i register A."
    },
    {
        "type": "EXG",
        "name": "Exchange register contents",
        "flagInfo": "Påverkas endast om CC-registret är det ena registret som används",
        "description": "Data skiftas mellan angivna register"
    },
    {
        "type": "INC",
        "name": "Increment register or memory",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Ettställs om 2-komplementoverflow uppstår. \n* C: Påverkas ej",
        "description": ""
    },
    {
        "type": "JMP",
        "name": "Jump",
        "flagInfo": "Påverkas ej",
        "description": "Ovillkorlig programflödesändring, nästa instruktion hämtas från effektiva adressen EA."
    },
    {
        "type": "JSR",
        "name": "Jump to subroutine",
        "flagInfo": "Påverkas ej",
        "description": "PC-värdet, som är adressen till instruktionen efter JSR-instruktionen, dvs återhoppsadressen, skrivs först på stacken. Ett hopp utförs sedan till adressen EA."
    },
    {
        "type": "LD",
        "name": "Load register",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Påverkas ej",
        "description": "Laddar dataord från minnet till angivet register R (A,X,Y eller SP)"
    },
    {
        "type": "LEA",
        "name": "Load effective address",
        "flagInfo": "Påverkas ej",
        "description": "Laddar effektiva adressen i R."
    },
    {
        "type": "LSL",
        "name": "Logical shift left, ASL Arithmetic shift left",
        "flagInfo": "* N: Kopia av bit 7 efter skiftet. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Ettställs om C och bit 7 är olika efter operationen, dvs overflow vid 2-komplements-representation inträffar. \n* C: bit 7 före skiftet blir ny carrybit efter skiftet.",
        "description": "Skiftar operanden ett steg till vänster, dvs. multiplicerar ett tal med eller utan inbyggt tecken med 2. Instruktionen är identisk med ASL. \n\n ![](/op_images/l_and_a_shift_left.png)"
    },
    {
        "type": "LSR",
        "name": "Logical shift right",
        "flagInfo": "* N: Nollställs. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Ettställs om overflow vid 2-komplements-representation inträffar. \n* C: bit 0 före skiftet blir ny carrybit efter skiftet.",
        "description": "Skiftar operanden ett steg till höger, dvs. dividerar ett tal utan inbyggt tecken med 2. \n \n ![](/op_images/l_shift_right.png)"
    },
    {
        "type": "NEG",
        "name": "Negate register or memory",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll, dvs om det gamla värdet är noll. \n* V: Ettställs om 2-komplementoverflow uppstår. \n* C: Ettställs om det gamla värdet != 0.",
        "description": "2-komplementerar innehållet i angivet register eller minnesinnehåll."
    },
    {
        "type": "NEG",
        "name": "Negate register or memory",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll, dvs om det gamla värdet är noll. \n* V: Ettställs om 2-komplementoverflow uppstår. \n* C: Ettställs om det gamla värdet != 0.",
        "description": "2-komplementerar innehållet i angivet register eller minnesinnehåll."
    },
    {
        "type": "NOP",
        "name": "No operation",
        "flagInfo": "Påverkas ej",
        "description": "Instruktionen utför ingenting."
    },
    {
        "type": "ORA",
        "name": "Logical OR data into register A",
        "flagInfo": "* N: Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Påverkas ej",
        "description": "Utför bitvis OR-operation mellan dataordet i minnet och innehållet i register A. Resultatet placeras i register A."
    },
    {
        "type": "ORCC",
        "name": "Logical OR Data into register CC",
        "flagInfo": "Flaggorna ettställs i de positioner där CC eller Data innehåller någon etta",
        "description": "Utför bitvis OR-operation mellan innehållet i flaggregistret (CC) och dataordet. Resultatet placeras i flaggregistret"
    },
    {
        "type": "PSH",
        "name": "Push register on Stack",
        "flagInfo": "Påverkas ej",
        "description": "Stackpekaren uppdateras först. Angivet registerinnehåll skrivs sedan på stacken"
    },
    {
        "type": "PUL",
        "name": "Pull register from stack",
        "flagInfo": "Flaggorna påverkas endast vid PULC, då flaggorna får värden från stacken",
        "description": "Översta dataordet på stacken läses och placeras i angivet register. Stackpekaren uppdateras sedan"
    },
    {
        "type": "ROL",
        "name": "Rotate left",
        "flagInfo": "* N: Kopia av bit 7 efter skiftet. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Ettställs om C och bit 7 är olika efter operationen, dvs overflow vid 2 komplements represen tation inträffar. \n* C: bit 7 före skiftet blir ny carrybit efter skiftet.",
        "description": "Skiftar operanden ett steg till vänster, dvs. multiplicerar ett tal med eller utan inbyggt tecken med 2. \n\n ![](/op_images/rotate_left.png)"
    },
    {
        "type": "ROR",
        "name": "Rotate right",
        "flagInfo": "* N: C före skiftoperationen. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Ettställs om overflow vid 2 komplements representation inträffar. \n* C: bit 0 före skiftet blir ny carrybit efter skiftet.",
        "description": "Skiftar operanden ett steg till höger, dvs. dividerar ett tal utan inbyggt tecken med 2.\n\n ![](/op_images/rotate_right.png)"
    },
    {
        "type": "RTS",
        "name": "Return from Subroutine",
        "flagInfo": "Påverkas ej",
        "description": "Återhopp från en subrutin utförs genom att översta dataordet på stack en, dvs återhoppsadressen, läses och placeras i PC. Stackpekaren uppdateras sedan",
    },
    {
        "type": "RTI",
        "name": "Return from Interrupt",
        "flagInfo": "Påverkas ej",
        "description": "Återhopp från undantagshantering utförs genom att samtliga register återställes från stacken o ch stackpekaren uppdateras."
    },
    {
        "type": "SBCA",
        "name": "Subtract with borrow Data from register A",
        "flagInfo": "* N:Ettställs om resultatets teckenbit (bit 7) få r värdet 1 vid subtraktionen. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll vid subtraktionen. \n* V: Ettställs om overflow vid 2 komplementsrepresentation inträffar vid subtraktionen. \n* C: Ettställs om en lånesiffra = 1 uppstår från bitpositionen l ängst till vänster vid subtraktionen",
        "description": "Utför åttabitars subtraktion av dataordet i minnet från innehållet i register A r esultatet placeras i reg ister A. En eventuell lånebit (borrow) som uppstår vid subtraktionen placeras i C biten (C flaggan) i CC registret. Det gamla värdet på C biten i flaggregistret används som lånesiffra i minst signifikant position (lånesiffra in) vid subtraktionen."
    },
    {
        "type": "ST",
        "name": "Store register into memory",
        "flagInfo": "* N: Påverkas ej. \n* Z: Påverkas ej. \n* V: Påverkas ej. \n* C: Påverkas ej",
        "description": "Lagrar angivet registerinnehåll i minnet på den effektiva adressen"
    },
    {
        "type": "SUBA",
        "name": "Subtract data from register A",
        "flagInfo": "* N:Ettställs om resultatets teckenbit (bit 7) får värdet 1 vid subtraktionen. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll vid subtraktionen. \n* V: Ettställs om overflow vid 2 komplementsrepresentation inträffar vid subtraktionen. \n* C: Ettställs om en lånesiffra = 1 uppstår från bitpositionen längst till vänster vid subtraktionen",
        "description": "Utför åttabitars subtraktion av operanden från innehållet i reg ister A. Resultatet placeras i reg ister A. En eventuell lånebit (borrow) som uppstår vid subtraktionen placeras i C biten (C flaggan) i CC registret. C flaggan representerar i detta fall en lånesiffra vid subtraktion och sätts till inversen av det värde som kommer ut från ALU:n när subtraktionen A - M utförs på det traditionella sättet A + M' + 1"
    },
    {
        "type": "TFR",
        "name": "Transfer register to register",
        "flagInfo": "Påverkas ej såvida man inte flyttar ett registerinnehåll till CC registret",
        "description": "Data kopieras mellan angivna register"
    },
    {
        "type": "TST",
        "name": "Test",
        "flagInfo": "* N:Ettställs om resultatets teckenbit (bit 7) får värdet 1. \n* Z: Ettställs om samtliga åtta bitar i resultatet blir noll. \n* V: Nollställs. \n* C: Nol lställs",
        "description": "Låter datavärdet i A eller M passera ALU:n och sätter flaggvipporna N och Z så att man kan avgöra datavärdets tecken eller om det är noll. Endast flaggvipporna påverkas."
    },
];
  
export default types;