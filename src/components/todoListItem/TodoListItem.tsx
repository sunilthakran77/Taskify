import React, { useEffect, useState, useRef } from 'react'
import { Todo } from '../inputField/model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    handleDone: (index:number, id: number) => void,
}

const TodoListItem = ({index, todo, todos, handleDone, setTodos}: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot) => (
                <form 
                    className={`todos__list ${snapshot.isDragging ? 'dragging' : '' }`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                    {edit ?
                        <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className="todos__single--text"
                        />
                    : !todo.isDone ?
                            <span className="todos__list--text">{todo.todo}</span>
                        :
                            <s className="todos__list--text">{todo.todo}</s>
                    }
                    <div>
                        {
                            !todo.isDone ?
                                <span className="icon"
                                    onClick={() => {
                                        if (!edit && !todo.isDone) {
                                            setEdit(!edit);
                                        }
                                    }}
                                >
                                    <AiFillEdit />
                                </span>
                            :
                            <React.Fragment />
                        }
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        {
                            !todo.isDone ?
                                <span className="icon" onClick={() => handleDone(index, todo.id)}>
                                    <MdDone />
                                </span>
                            :
                            <React.Fragment />
                        }
                    </div>
                </form>
            )
        }
    </Draggable>
  )
}

export default TodoListItem