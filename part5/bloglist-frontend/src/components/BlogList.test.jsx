import Blog from './Blog'
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

})