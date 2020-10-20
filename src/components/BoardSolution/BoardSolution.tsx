import React from "react";
import { st, classes } from "./boardSolution.st.css";
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
import ActionListing from "../ActionListing/ActionListing";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // change background colour if dragging
  backgroundColor: isDragging
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.2)",

  // rgb(12 26 41 / 40%) !important
  // styles we need to apply on draggables
  borderTop: isDragging
    ? "1px dashed rgb(83 141 220 / 22%)"
    : "1px dashed rgb(83 141 220 / 0)",
  ...draggableStyle
});

const getColumnStyle = (isDraggingOver: boolean) => ({
  backgroundColor: isDraggingOver ? "rgba(0, 0, 0, 0.2)" : "transparent"
});

export interface BoardSolutionProps
  extends React.HTMLAttributes<HTMLBaseElement> {
  dragColumns: { name: string; id: string }[];
  boardData: any;
  createAction?: any;
  saveAction?: any;
  deleteAction?: any;
  onDragEnd: any;
  setActionStatus?: any;
  onTaskClick?: any;
}

const BoardSolution = ({
  dragColumns,
  boardData,
  className: classNameProp,
  createAction,
  saveAction,
  deleteAction,
  onTaskClick,
  onDragEnd,
  setActionStatus
}: BoardSolutionProps) => {
  return (
    <div className={st(classnames(classes.root, classNameProp))}>
      <DragDropContext onDragEnd={onDragEnd}>
        {dragColumns.map(({ id: columnId }) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getColumnStyle(snapshot.isDraggingOver)}
              >
                {boardData[columnId].map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                          onTaskClick && onTaskClick(item);
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
  );
};

export default BoardSolution;
