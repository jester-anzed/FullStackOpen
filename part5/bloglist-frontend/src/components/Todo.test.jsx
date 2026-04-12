import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './Todo'
test('renders todo', () => {
    const toDo = {
        content: 'Play Dotes',
        done: true
    }

    render(<TodoItem todo={toDo} />)

    const element = screen.getByText('Play Dotes')
    expect(element).toBeDefined()
})

test('mark done', () => {
    const toDo = {
        content: 'Play Dotes',
        done: true
    }

    render(<TodoItem todo={toDo} />)
    const element = screen.getByText('undo')
    const x = screen.queryByText('mark done')

    expect(element).toBeDefined()
    expect(x).toBeNull()

})

test('not mark done', () => {
    const toDo = {
        content: 'Play Dotes',
        done: false
    }

    render(<TodoItem todo={toDo} />)
    const element = screen.getByText('mark done')
    const x = screen.queryByText('undo')
    expect(element).toBeDefined()
    expect(x).toBeNull()
})


test('toggle', async () => {
    const  mockHandler = vi.fn()
    const user = userEvent.setup()
    const toDo = {
        content: 'Play Dotes',
        done: true,
        id: 'test123'
    }

    render(<TodoItem todo={toDo} onToggle={mockHandler}/>)

    const button = screen.getByText('undo')
    await user.click(button)

    expect(mockHandler.mock.calls[0][0]).toBe('test123')

})


test('delete', async() => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    const toDo = {
        content: 'Play Dotes',
        done: true,
        id: 'test123'
    }

    render(<TodoItem todo={toDo} onToggle={mockHandler} onDelete={mockHandler} />)

    const deleteButton = screen.getByText('delete')

    await user.click(deleteButton)

    expect(mockHandler).toHaveBeenCalledWith('test123')




})