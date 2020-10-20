import React, { useState, useEffect, useRef } from "react";
import { st, classes } from "./board.st.css";
import classnames from "classnames";
import _throttle from "lodash.throttle";

import { H2, H3, P, ButtonGroup, Button } from "@actionishope/shelley";
import BoardSolution from "../BoardSolution/BoardSolution";
import ActionListing from "../ActionListing/ActionListing";

const backlog = [
  {
    id: `item-a1`,
    title: `☀️ Switch to a real green energy provider.`,
    description: `Why TBC`,
    url: `How TBC`,
    image: "https://ik.imagekit.io/tcvka0ufln/green-energy_pbJgMBrmmMw.png",
    status: "todo"
  },
  {
    id: `item-a2`,
    title: `Go FullyCharged with an electric car`,
    description: `Why TBC`,
    url: `How TBC`,
    image: "https://ik.imagekit.io/tcvka0ufln/charger_yE7qcZvzz.png",
    status: "todo"
  },
  {
    id: `item-a3`,
    title: `Make the call to Ecotricity on 0808 123 0 123.`,
    description: `Why TBC`,
    url: `How TBC`,
    image: "https://ik.imagekit.io/tcvka0ufln/phone_oNBGzu4k5.png",
    status: "todo"
  },
  {
    id: `item-a4`,
    title: `Enable dark mode on your OLED devices`,
    description: `Why TBC`,
    url: `How TBC`,
    image: "https://ik.imagekit.io/tcvka0ufln/phone_oNBGzu4k5.png",
    status: "todo"
  },
  {
    id: `item-a5`,
    what: `Take on the next challenge, conserve energy.`,
    why: `Why TBC`,
    how: `How TBC`,
    image: "https://ik.imagekit.io/tcvka0ufln/phone_oNBGzu4k5.png",
    status: "todo"
  }
];

export interface BoardProps extends React.HTMLAttributes<HTMLBaseElement> {
  dragColumns: { name: string; id: string }[];
  boardData?: any;
  createAction?: any;
  saveAction?: any;
  deleteAction?: any;
  onDragEnd?: any;
  setActionStatus?: any;
}

const Board = ({
  dragColumns,
  boardData,
  className: classNameProp,
  createAction,
  saveAction,
  deleteAction,
  onDragEnd,
  setActionStatus
}: BoardProps) => {
  const [backlogTabIndex, setBacklogTabIndex] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [backlogModalOpen, setBacklogModalOpen] = useState(false);
  const [onDeck, setOnDeck] = useState({});
  const [modelClickAway, setModelClickAway] = useState(true);

  const toggleUpdateModal = () => {
    setUpdateModalOpen(prevState => !prevState);
  };

  const toggleBacklogModal = () => {
    setBacklogModalOpen(prevState => !prevState);
  };

  const [boardOffsetX, setBoardOffsetX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("forwards");
  const [sliderPos, setSliderPos] = useState("ToDo");

  const slider = useRef<HTMLDivElement>(null);

  useEffect(
    // Figure out where the scroll is going and set the class to position the item.
    () => {
      // TODO: remove listener on unmount...
      slider.current !== null &&
        slider.current.addEventListener(
          "scroll",
          _throttle(
            () => {
              if (slider.current !== null) {
                const currentOffset = slider.current.scrollLeft;
                const direction =
                  currentOffset > boardOffsetX ? "forwards" : "back";
                setBoardOffsetX(slider.current.scrollLeft);
                setScrollDirection(direction);
                if (
                  (currentOffset > 626 && direction === "forwards") ||
                  (currentOffset > 928 && direction === "back")
                ) {
                  setSliderPos("Done");
                } else if (
                  (currentOffset > 364 && direction === "forwards") ||
                  (currentOffset > 626 && direction === "back")
                ) {
                  setSliderPos("InProgress");
                } else if (currentOffset < 626) {
                  setSliderPos("ToDo");
                }
                // if (currentOffset < 0) {
                //   console.log("close?");
                // }
              }

              // if (currentOffset > 600 && direction === "back") {
              //   setSliderPos("InProgress");
              // }
            },
            100000,
            { trailing: false }
          )
        );
    },
    [boardOffsetX, scrollDirection]
  );

  return (
    <div className={st(classnames(classes.root, classNameProp))}>
      {/* <header className={classes.header}>
        {dragColumns.map(({ name, id }) => (
          <h3 key={id} className={classes.colHeader}>
            <span className={classes.colHeaderText}>{name}</span>
          </h3>
        ))}
      </header> */}

      {/* <CSSTransition in={updateModalOpen} timeout={300} unmountOnExit>
        <Modal
          visible={updateModalOpen}
          handleClose={() => modelClickAway && toggleUpdateModal()}
        >
          <EditActionForm
            item={onDeck}
            onEdit={() => setModelClickAway(false)}
            onCancel={() => setModelClickAway(true)}
            closeButton
            onSave={item => {
              setOnDeck(item);
              saveAction(item);
              setModelClickAway(true);
            }}
            modelClickAway={modelClickAway}
            onClose={() => {
              toggleUpdateModal();
              setModelClickAway(true);
            }}
          />
        </Modal>
      </CSSTransition> */}
      <section id="slider2" className={classes.slider} ref={slider}>
        <section className={classnames(classes.slideCol, classes.backlog)}>
          <H2 uppercase vol={1}>
            Team 'Planning'
          </H2>
          {/* <ButtonGroup
            vol={2}
            tone={1}
            variant={1}
            style={{ marginTop: "1rem" }}
          >
            <Button>Proposed</Button>
            <Button>Ready to do</Button>
            <Button>Game on!</Button>
          </ButtonGroup> */}
          <ul
            style={
              {
                // background: "pink"
              }
            }
            className={classes.backlogList}
          >
            {backlog.map((item: any) => {
              return (
                <ActionListing
                  title={item.title}
                  url={item.url}
                  description={item.description}
                  key={item.id}
                  image={item.image}
                  // className={classes.item}
                />
              );
            })}
          </ul>
          <ButtonGroup
            vol={4}
            tone={5}
            variant={3}
            style={{ marginTop: "1rem" }}
          >
            <Button>Add</Button>
            <Button>Find</Button>
          </ButtonGroup>
        </section>
        <section
          className={classnames(classes.slideCol, classes.todo)}
          id="test"
        >
          <H2 uppercase vol={1}>
            To-do
          </H2>
        </section>
        <section className={classnames(classes.slideCol, classes.progress)}>
          <H2 uppercase vol={1}>
            In-Progress
          </H2>
        </section>
        <section className={classnames(classes.slideCol, classes.done)}>
          <H2 uppercase vol={1}>
            Done
          </H2>
        </section>

        <section
          className={classnames(classes.board, classes[`pos${sliderPos}`])}
        >
          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                ☀️ Switch to real green energy
              </H3>
            </div>
          </div>
          <BoardSolution
            onDragEnd={onDragEnd}
            dragColumns={dragColumns}
            boardData={boardData}
          />

          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                🚗 Go fully charged with an electric car
              </H3>
            </div>
          </div>
          <BoardSolution
            onDragEnd={onDragEnd}
            dragColumns={dragColumns}
            boardData={boardData}
          />

          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                Something else nice to do
              </H3>
            </div>
          </div>

          <BoardSolution
            onDragEnd={onDragEnd}
            dragColumns={dragColumns}
            boardData={boardData}
          />

          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                Another nice to do
              </H3>
            </div>
          </div>

          <BoardSolution
            onDragEnd={onDragEnd}
            dragColumns={dragColumns}
            boardData={boardData}
          />
        </section>
      </section>
    </div>
  );
};

export default Board;
