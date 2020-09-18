import React, { useState } from "react";
import { st, classes } from "./board.st.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import BoardTask from "../BoardTask/BoardTask";
// import Action from "./Action";
// import Modal from "../Modal/Modal";
// import { CSSTransition } from "react-transition-group";
// import EditActionForm from "../EditActionForm/EditActionForm";
// import Badge from "../Badge/Badge";
// import Backlog from "../Backlog/Backlog";
import { H2, H3, P, ButtonGroup, Button } from "@actionishope/shelley";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // change background colour if dragging
  backgroundColor: isDragging
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.2)",
  // styles we need to apply on draggables
  ...draggableStyle
});

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
      <section className={classes.slider}>
        <section className={classnames(classes.slideCol, classes.backlog)}>
          <H2 uppercase vol={1}>
            Backlog
          </H2>
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
        <section className={classnames(classes.slideCol, classes.todo)}>
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

        <section className={classes.board}>
          <div className={classes.solutionItem}>
            <H3 vol={2} uppercase>
              Switch to real green energy
            </H3>
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
          <div className={classes.solutionItem}>
            <H3 vol={2} uppercase>
              Go fully charged with an electric car
            </H3>
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
          <div className={classes.solutionItem}>
            <H3 vol={2} uppercase>
              Item container
            </H3>
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
          <div className={classes.solutionItem}>
            <H3 vol={2} uppercase>
              Item container
            </H3>
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
