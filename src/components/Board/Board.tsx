import React, { useState, useEffect, useRef } from "react";
import { st, classes } from "./board.st.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import { debounce, throttle } from "throttle-debounce";
import BoardTask from "../BoardTask/BoardTask";
// import Action from "./Action";
// import Modal from "../Modal/Modal";
// import { CSSTransition } from "react-transition-group";
// import EditActionForm from "../EditActionForm/EditActionForm";
// import Badge from "../Badge/Badge";
// import Backlog from "../Backlog/Backlog";
import { H2, H3, P, ButtonGroup, Button } from "@actionishope/shelley";
import ActionListing from "../ActionListing/ActionListing";

import _throttle from "lodash.throttle";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // change background colour if dragging
  backgroundColor: isDragging
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.2)",
  // styles we need to apply on draggables
  ...draggableStyle
});

const backlog = [
  {
    id: `item-a1`,
    title: `Switch to a real green energy provider.`,
    description: `Why TBC`,
    url: `How TBC`,
    status: "todo"
  },
  {
    id: `item-a2`,
    title: `Go FullyCharged with an electric car`,
    description: `Why TBC`,
    url: `How TBC`,
    status: "todo"
  },
  {
    id: `item-a3`,
    title: `Make the call to Ecotricity on 0808 123 0 123.`,
    description: `Why TBC`,
    url: `How TBC`,
    status: "todo"
  },
  {
    id: `item-a4`,
    title: `Enable dark mode on your OLED devices`,
    description: `Why TBC`,
    url: `How TBC`,
    status: "todo"
  },
  {
    id: `item-a5`,
    what: `Take on the next challenge, conserve energy.`,
    why: `Why TBC`,
    how: `How TBC`,
    status: "todo"
  }
];

const getColumnStyle = (isDraggingOver: boolean) => ({
  backgroundColor: isDraggingOver ? "rgba(0, 0, 0, 0.2)" : "transparent"
});

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

  const slider = useRef(null);

  // boardOffsetX = debounce(updateOffsetValue, 10000)

  // var myHeavyFunction = debounce(function() {
  //   // do heavy things
  // }, 250);
  // window.addEventListener('mousemove', myHeavyFunction);

  useEffect(
    // Set the theme based on what is in local storage.
    () => {
      // console.log(slider.current);

      // debounce(updateOffsetValue, 1);

      // slider &&
      //   slider.current.addEventListener(
      //     "scroll",
      //     debounce(30, true, () => {
      //       setBoardOffsetX(slider.current.scrollLeft);
      //     })
      //   );

      // slider &&
      //   slider.current.addEventListener(
      //     "scroll",
      //     throttle(100000, true, () => {
      //       const currentOffset = slider.current.scrollLeft;
      //       const direction =
      //         currentOffset > boardOffsetX ? "forwards" : "back";
      //       setBoardOffsetX(slider.current.scrollLeft);
      //       setScrollDirection(direction);

      //       console.log("now", slider.current.scrollLeft, direction);
      //     })
      //   );

      slider &&
        slider.current.addEventListener(
          "scroll",
          _throttle(
            () => {
              const currentOffset = slider.current.scrollLeft;
              const direction =
                currentOffset > boardOffsetX ? "forwards" : "back";
              setBoardOffsetX(slider.current.scrollLeft);
              setScrollDirection(direction);

              // console.log("now", slider.current.scrollLeft, direction);
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
              // if (currentOffset > 600 && direction === "back") {
              //   setSliderPos("InProgress");
              // }
            },
            100000,
            { trailing: false }
          )
        );

      // slider &&
      //   slider.current.addEventListener("scroll", () => {
      //     // console.log("now", slider.current.scrollLeft);
      //     const currentOffset = slider.current.scrollLeft;
      //     const direction = currentOffset > boardOffsetX ? "forwards" : "back";
      //     setBoardOffsetX(slider.current.scrollLeft);
      //     setScrollDirection(direction);
      //     console.log(scrollDirection);
      //   });

      //scrollDirection
      //setScrollDirection
      // onScroll(event){
      //   var currentOffset = event.nativeEvent.contentOffset.y;
      //   var direction = currentOffset > this.state.offset ? 'down' : 'up';
      //   this.setState({
      //         offset : currentOffset.y
      //       }),
      //   Alert.alert(direction);
      // }

      //   const debounceFunc = debounce(1000, false, (num) => {
      //     console.log('num:', num);
      // });

      // // Can also be used like this, because atBegin is false by default
      // const debounceFunc = debounce(1000, (num) => {
      //     console.log('num:', num);
      // });

      // slider.current.addEventListener("scroll", () => {
      //   setBoardOffsetX(slider.current.scrollLeft);
      //   console.log(slider.current.scrollLeft);
      // });

      // const sliderDOM = document.getElementById("slider");
      // slider && slider.addEventListener("scroll", () => console.log("scroll!"));
      // slider && setBoardOffsetX(slider.scrollLeft);
      // console.log(boardOffsetX);
    },
    [boardOffsetX, scrollDirection]
  );

  // slider2.scrollLeft

  return (
    <div className={st(classnames(classes.root, classNameProp))}>
      {/* <header className={classes.header}>
        {dragColumns.map(({ name, id }) => (
          <h3 key={id} className={classes.colHeader}>
            <span className={classes.colHeaderText}>{name}</span>
          </h3>
        ))}
      </header> */}
      {/* <section className={classes.slider}>
        <section className={classes.backlog}>BACKLOG</section>
        <section className={classes.backlog}>BACKLOG</section>
      </section> */}
      {/* <div className={styles.todoButtons}>
        <Badge position="topEnd" count={boardData.backlog.length}>
          <IconButton
            className={styles.backlogButton}
            label="Notes"
            onClick={() => {
              setBacklogTabIndex(0);
              toggleBacklogModal();
            }}
            icon="notes"
          />
        </Badge>
        <IconButton
          className={styles.addButton}
          label="Add action"
          onClick={() => {
            // setState({ backlogTabIndex: 1 })
            setBacklogTabIndex(1);
            toggleBacklogModal();
            setModelClickAway(false);
          }}
          icon="add"
        />
      </div> */}

      {/* <CSSTransition in={backlogModalOpen} timeout={300} unmountOnExit>
        <Modal
          visible={backlogModalOpen}
          handleClose={() => modelClickAway && toggleBacklogModal()}
        >
          <Backlog
            backlogCount={boardData.backlog.length}
            initialTabIndex={backlogTabIndex}
            handleClose={() => {
              toggleBacklogModal();
              setModelClickAway(true);
            }}
            handleCreate={item => createAction(item)}
            handleSave={item => {
              saveAction(item);
            }}
            handleDelete={item => deleteAction(item)}
            handleMove={(item, status) => setActionStatus(item, status)}
            setModelClickAway={setModelClickAway}
            modelClickAway={modelClickAway}
            items={boardData.backlog}
          ></Backlog>
        </Modal>
      </CSSTransition> */}

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
            Backlog
          </H2>
          <ul
            style={{
              padding: "16px 0 0 0",
              margin: "10px 0 0 0"
              // background: "pink"
            }}
          >
            {backlog.map((item: any) => {
              return (
                <ActionListing
                  title={item.title}
                  url={item.url}
                  description={item.description}
                  key={item.id}
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
          className={classnames(classes.board, classes[`pos${sliderPos}`], {
            // [classes.posInProgress]:
            //   (boardOffsetX > 364 && scrollDirection === "forwards") ||
            //   (boardOffsetX > 600 && scrollDirection === "back")
            // [classes.posDone]: boardOffsetX > 650
          })}
        >
          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                Switch to real green energy
              </H3>
            </div>
          </div>
          <div className={classes.solutionBoard}>
            <DragDropContext onDragEnd={onDragEnd}>
              {dragColumns.map(({ id: columnId }) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getColumnStyle(snapshot.isDraggingOver)}
                    >
                      {boardData[columnId].map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <a
                              ref={provided.innerRef}
                              href={`#${item.id}`}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className={classes.boardTaskLink}
                              onClick={event => {
                                event.preventDefault();
                                toggleUpdateModal();
                                setOnDeck(item);
                              }}
                            >
                              <BoardTask
                                title={item.what}
                                id={item.id}
                                desc={item.status}
                              />
                            </a>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>

          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                Go fully charged with an electric car
              </H3>
            </div>
          </div>
          <div className={classes.solutionBoard}>
            <DragDropContext onDragEnd={onDragEnd}>
              {dragColumns.map(({ id: columnId }) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getColumnStyle(snapshot.isDraggingOver)}
                    >
                      {boardData[columnId].map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <a
                              ref={provided.innerRef}
                              href={`#${item.id}`}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className={classes.boardTaskLink}
                              onClick={event => {
                                event.preventDefault();
                                toggleUpdateModal();
                                setOnDeck(item);
                              }}
                            >
                              <BoardTask
                                title={item.what}
                                id={item.id}
                                desc={item.status}
                              />
                            </a>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>

          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                Something else nice to do
              </H3>
            </div>
          </div>

          <div className={classes.solutionBoard}>
            <DragDropContext onDragEnd={onDragEnd}>
              {dragColumns.map(({ id: columnId }) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getColumnStyle(snapshot.isDraggingOver)}
                    >
                      {boardData[columnId].map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <a
                              ref={provided.innerRef}
                              href={`#${item.id}`}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className={classes.boardTaskLink}
                              onClick={event => {
                                event.preventDefault();
                                toggleUpdateModal();
                                setOnDeck(item);
                              }}
                            >
                              <BoardTask
                                title={item.what}
                                id={item.id}
                                desc={item.status}
                              />
                            </a>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>

          <div className={classes.solutionItemContainer}>
            <div className={classes.solutionItem}>
              <H3 vol={2} uppercase>
                Another nice to do
              </H3>
            </div>
          </div>

          <div className={classes.solutionBoard}>
            <DragDropContext onDragEnd={onDragEnd}>
              {dragColumns.map(({ id: columnId }) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getColumnStyle(snapshot.isDraggingOver)}
                    >
                      {boardData[columnId].map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <a
                              ref={provided.innerRef}
                              href={`#${item.id}`}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className={classes.boardTaskLink}
                              onClick={event => {
                                event.preventDefault();
                                toggleUpdateModal();
                                setOnDeck(item);
                              }}
                            >
                              <BoardTask
                                title={item.what}
                                id={item.id}
                                desc={item.status}
                              />
                            </a>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Board;
