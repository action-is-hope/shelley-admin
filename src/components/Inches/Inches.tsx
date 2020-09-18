import React, { useState } from "react";

import classnames from "classnames";
import { st, classes } from "./inches.st.css";
import { CSSTransition } from "react-transition-group";

import { move, reorder, generatePushID } from "../Board/helpers";

import { classes as defaultTheme } from "@actionishope/shelley/styles/default/project.st.css";

import {
  Button,
  InputSelection,
  Icon,
  InputText,
  Grid,
  ButtonGroup,
  P,
  H1,
  H2
} from "@actionishope/shelley";
import Launch from "../Launch/Launch";
import Board from "../Board/Board";

const boards = [
  {
    id: `item-1`,
    name: `My first team!`,
    description: `Your first team board, check it out!`,
    location: `Bristol, UK`,
    points: `100`
  },
  {
    id: `item-2`,
    name: `G-Family`,
    description: `Our family board to try and be a carbon neutral home within 5 years.`,
    location: `Bristol, UK`,
    points: `100`
  }
];

const boardData = {
  backlog: [
    {
      id: `item-1`,
      what: `Switch to a green energy provider`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "backlog"
    },
    {
      id: `item-2`,
      what: `Switch to a greesssn energy provider`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    }
  ],
  todo: [
    {
      id: `item-a1`,
      what: `Switch to a green energy provider`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a2`,
      what: `Waste less energy, it's precious, conserve it`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a3`,
      what: `Support a clean air initiative`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a4`,
      what: `Lets all get outside and go geocaching!`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a5`,
      what: `Learn about BCorporations, `,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a6`,
      what: `Don't 'buy' some more', 'make' some more`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a7`,
      what: `Winter is coming, get a foam gun!`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    // {
    //   id: `item-a5`,
    //   what: `Work from home or at a mates`,
    // },
    {
      id: `item-a8`,
      what: `Make a London bus, like Boris 🚌.`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    },
    {
      id: `item-a9`,
      what: `Make a London bus, like Boris 🚌. wheels tracables?`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "todo"
    }
  ],
  doing: [
    {
      id: `item-b1`,
      what: `Learn about 'hemp' and its potential`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "wip"
    },
    {
      id: `item-b2`,
      what: `Improve our health and support local`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "wip"
    },
    {
      id: `item-b3`,
      what: `Swap flying for an adventure in 2020`,
      why: `Why TBC`,
      how: `How TBC`,
      status: "wip"
    }
  ],
  done: [],
  achieve: []
};

const Inches = ({ className: classNameProp }: any) => {
  const [columns, setColumns] = useState(boardData);
  const [boardOnDeck, setBoardOnDeck] = useState(false);
  const [launchDisplay, setLaunchDisplay] = useState(true);

  /**
   * onDragEnd
   */
  const onDragEnd = result => {
    console.log({ result });
    console.log(`ID: ${result.draggableId}`);
    console.log("Destination", result.destination);
    const { source, destination } = result;
    // document && document.querySelector("#inches").scrollIntoView();

    // Dropped outside any column.
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reorder items within column.
      const items = reorder(
        columns[source.droppableId],
        source.index,
        destination.index
      );
      setColumns(prevState => {
        return { ...prevState, [source.droppableId]: items };
      });
    } else {
      // Move items to a different column.
      const result = move(
        columns[source.droppableId],
        columns[destination.droppableId],
        source,
        destination
      );
      setColumns(prevState => {
        return { ...prevState, ...result };
      });
    }
  };

  return (
    <div
      className={st(classnames(classes.root, classNameProp), { boardOnDeck })}
    >
      <header className={classes.header}>
        <div
          className={classes.logo}
          onClick={() => {
            setBoardOnDeck(o => !o);
            setLaunchDisplay(o => !o);
          }}
        >
          <Icon
            alt="Inches"
            viewBox="0 0 480 262"
            style={{ fontSize: "12.5rem", height: "100%" }}
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="logo" transform="translate(-8.000000, 0.000000)">
                <rect
                  id="Rectangle"
                  fill="#52FBA7"
                  opacity="0.711053757"
                  x="8"
                  y="259"
                  width="122"
                  height="3"
                ></rect>
                <text
                  id="Inches"
                  fontFamily="Futura-Medium, Futura"
                  fontSize="115"
                  fontWeight="400"
                  letterSpacing="7.847067"
                  fill="#FFFFFF"
                >
                  <tspan x="0" y="236">
                    INCHES
                  </tspan>
                </text>
                <g
                  id="Group-3-Copy"
                  opacity="0.72937593"
                  transform="translate(250.000000, 0.000000)"
                  fill="#52FBA7"
                >
                  <rect
                    id="Rectangle"
                    x="235"
                    y="1"
                    width="3"
                    height="240"
                  ></rect>
                  <rect
                    id="Rectangle"
                    x="180"
                    y="0"
                    width="3"
                    height="70"
                  ></rect>
                  <rect
                    id="Rectangle"
                    x="60"
                    y="1"
                    width="3"
                    height="70"
                  ></rect>
                  <rect
                    id="Rectangle"
                    x="120"
                    y="1"
                    width="3"
                    height="109"
                  ></rect>
                  <rect
                    id="Rectangle"
                    x="0"
                    y="0"
                    width="3"
                    height="130"
                  ></rect>
                </g>
              </g>
            </g>
          </Icon>
          {/* <H1 vol={9} uppercase>
            Inches
          </H1> */}
        </div>
      </header>

      <CSSTransition
        in={launchDisplay}
        timeout={130}
        unmountOnExit
        classNames="launchContainer"
        onExited={() => {
          // setHeaderVisibility(false);
          setBoardOnDeck(!boardOnDeck);
        }}
      >
        <Launch
          className={classes.launch}
          boards={boards}
          onBoardSelect={() => {
            setLaunchDisplay(false);
          }}
          // visible={!boardOnDeck}
        />
      </CSSTransition>

      <CSSTransition
        in={boardOnDeck}
        timeout={250}
        unmountOnExit
        classNames="boardContainer"
        onExited={() => {
          setLaunchDisplay(true);
        }}
      >
        <div className={classes.boardContainer}>
          <Board
            {...{
              // createAction,
              // saveAction,
              // deleteAction,
              onDragEnd
              // setActionStatus,
              // addActionUpdate,
              // deleteActionUpdate
              // boardData,
            }}
            boardData={columns}
            className={classes.board}
            dragColumns={[
              { name: "Todo", id: "todo" },
              { name: "Doing", id: "doing" },
              { name: "Done", id: "done" }
            ]}
          />
        </div>
      </CSSTransition>

      {/* <Button
        type="button"
        onClick={() => {
          setBoardOnDeck(o => !o);
          setLaunchDisplay(o => !o);
        }}
        style={{
          position: "absolute",
          right: "2rem",
          top: "2rem"
        }}
      >
        X
      </Button> */}
    </div>
  );
};

export default Inches;
