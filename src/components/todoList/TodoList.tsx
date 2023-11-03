import React from 'react'
import './styles.css';
import { Todo } from '../inputField/model';
import TodoListItem from '../todoListItem/TodoListItem';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: (value: React.SetStateAction<Todo[]>) => void;
}

const TodoList:React.FC<Props> = ({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos,
}) => {

    const setDone = (index:number, id:number) => {
        let add;
        let active = todos;
        let complete = completedTodos;
    
        todos.filter((todo) => {
            if (todo.id === id) {
                add = active[index];
                active.splice(index, 1);
                complete.splice(index, 0, add);
            } return true;
        });

        setTodos(active.map(a => ({...a, isDone: false})));
        setCompletedTodos(complete.map(c => ({...c, isDone: true})));
    }

  return (
    <div className="container">
        <Droppable droppableId='todos-active'>
            {
                (provided, snapshot) => (
                    <div className={`todos__active ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active Tasks</span>
                        <div className='todos'>
                            {todos.map((todo, index) => (
                                <TodoListItem
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    handleDone={setDone}
                                    setTodos={setTodos}
                                />
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
        <Droppable droppableId='todos-done'>
            {
                (provided, snapshot) => (
                    <div className={`todos__done ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Completed Tasks</span>
                        <div className='todos'>
                            {completedTodos?.map((todo, index) => (
                                <TodoListItem
                                    index={index}
                                    todos={completedTodos}
                                    todo={todo}
                                    key={todo.id}
                                    handleDone={setDone}
                                    setTodos={setCompletedTodos}
                                />
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    </div>
  )
}

export default TodoList