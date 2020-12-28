import { useState } from "react";
import groups from "./groups.js";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import "./styles/Operations.css"
import Tile from "./Tile.jsx";
import TypeInfo from "./TypeInfo.jsx";

export default function Operations(props) {
  const [query, setQuery] = useState("");
  const [isMapMode, setMode] = useState(true);
  const [sortingMethod, setSortingMethod] = useState("code");

  // generate a tile
  const genTiles = data => {
    if (data.length == 0) {
      return "Hittar inga operationer som matchar din sökning :/"
    }

    const sorted = data.sort((a, b) => {
      if (sortingMethod == "type") {
        if (a.type == b.type) {
          return Number(`0x${a.code}`, 10) > Number(`0x${b.code}`, 10) ? 1 : -1;
        }
        return a.type > b.type ? 1 : -1;
      } else {
        // sort based on the op code
        return Number(`0x${a.code}`, 10) > Number(`0x${b.code}`, 10) ? 1 : -1;
      }
    });

    return sorted.map(op => {
      return <AnchorLink offset="150" href="#selected">
        <Tile
          key={op.code + op.shortHand}
          code={op.code}
          method={op.method}
          shortHand={op.shortHand}
          bytes={op.bytes}
          cycles={op.cycles}
          type={op.type}
          select={props.setSelected}
        />
      </AnchorLink>
    });
  };

  const genTypeInfo = type => {
    const data = props.types.find(t => t.type === type);
    const operations = props.operations.filter(op => op.type === type);
    return data ? (
      <TypeInfo
        type={data.type}
        name={data.name}
        flagInfo={data.flagInfo}
        operations={operations}
        description={data.description}
      />
    ) : "Error: no additional data found";
  };

  // used in the group view to 
  // search for a specific op
  const GroupItem = props => {
    return (
      <AnchorLink
        className="groupItem"
        href="#top"
        onClick={() => {
          const selected = props.label.split(" ")[0];
          setQuery(selected);
          setMode(true); // switch to map mode
        }
        }>
        {props.label.replace("^", "")}
      </AnchorLink>);
  };

  const genGroups = groups => {
    return Object.keys(groups).map(group => {
      const items = groups[group].map(i => {
        return <GroupItem key={i} label={i} />
      });

      return <>
        <h3>{group}</h3>
        <div className="group">{items}</div>
      </>;
    });
  };

  // filter out operations that does not match the query
  const matchesQuery = ops => {
    return ops.filter(op => {
      try {
        return ((op.shortHand.toUpperCase().search(query) >= 0) ||
          (op.type.toUpperCase().search(query) >= 0) ||
          (op.code.toString().toUpperCase().search(query) >= 0));
      } catch (err) {
        // if the regex breaks:
        setQuery(query.slice(0, -1));
        return true;
      }

    });
  };

  let tiles = genTiles(matchesQuery(props.operations));

  return props.operations && <>
    <div id="top"></div>
    <div className="Operations">
      <nav>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value.toUpperCase())} />

        <AnchorLink
          href="#top"
          className="switch"
          onClick={() => {
            setMode(!isMapMode);
            props.setSelected("");
          }}
        >
          {
            isMapMode ?
              <>
                Visa kategorier
                  <img src="category.svg" />
              </>
              :
              <>
                Visa karta
                <img src="explore.svg" />
              </>
          }
        </AnchorLink>

        {
          isMapMode &&
          <div className="sortingMethod">
            <button
              className={sortingMethod == "code" ? "active" : ""}
              onClick={() => setSortingMethod("code")}
            >
              Sortera efter kod
              </button>

            <button
              onClick={() => setSortingMethod("type")}
              className={sortingMethod == "type" ? "active" : ""}
            >
              Sortera efter namn
              </button>
            {props.selected && (
              <button
                className="remove"
                onClick={() => props.setSelected("")}>
                Avmarkera operationen
              </button>
            )}
          </div>
        }
      </nav>

      <article className="selected" id="selected">
        {
          props.selected ? <>
            {genTypeInfo(props.selected)}
          </>
            : ''
        }
      </article>

      { isMapMode ?
        <div className="map"> {tiles} </div>
        :
        <div className="groups">
          {genGroups(groups)}
        </div>
      }
    </div>
  </>;
}