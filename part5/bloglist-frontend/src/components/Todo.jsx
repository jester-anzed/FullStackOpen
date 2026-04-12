const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li>
            <span className="content"
                style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
            >
                {todo.content}
            </span>
            <button onClick={() => onToggle(todo.id)}>
                {todo.done ? 'undo' : 'mark done'}
            </button>
            <button onClick={() => onDelete(todo.id)}>delete</button>
        </li>
    )
}

export default TodoItem