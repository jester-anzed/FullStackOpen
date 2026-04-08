import Blog from './Blog'
import New from './New'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('Blog Testing', () => {
    const newBlog = {
        title: 'Consistency',
        author: 'Jes',
        likes: 15,
        url: 'www.consistency.com',
        user: { username: 'testuser', id: '123' }

    }
    let container
    beforeEach(() => {
        const result = render(<Blog blog={newBlog} user={{ username: 'testuser', id: '123' }} />)
        container = result.container
    })

    test('render title and author', () => {

        const title = container.querySelector('.showDetails')
        expect(title).toHaveTextContent('Consistency')
        expect(title).toHaveTextContent('Jes')
        expect(title).not.toHaveTextContent('www.consistency.com')
        expect(title).not.toHaveTextContent('15')

    })

    test('render likes and url', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const details = container.querySelector('.hiddenDetails')
        expect(details).toHaveTextContent('15')
        expect(details).toHaveTextContent('www.consistency.com')
    })

})

test('like clicked twice', async () => {
    const newBlog = {
        title: 'Consistency',
        author: 'Jes',
        likes: 15,
        url: 'www.consistency.com',
        user: { username: 'testuser', id: '123' }
    }
    const mockHandler = vi.fn()

    render(<Blog blog={newBlog} user={{ username: 'testuser', id: '123' }} updatedLikes={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

})

test('new blog form', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(<New createBlog={mockHandler} />)

    const button = screen.getByText('Create')

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    await user.type(title, 'Practice')
    await user.type(author, 'Jes')
    await user.type(url, 'www.jes.com')
    await user.click(button)


    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Practice')
    expect(mockHandler.mock.calls[0][0].author).toBe('Jes')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.jes.com')


})