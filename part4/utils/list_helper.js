const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (likes) => {

    if (likes.length === 0) {
        return likes.length
    } 
    
    if (likes.length === 1) {
        return likes[0].likes
    } 
    
    if (likes.length > 1) {
        let blog = likes.map(like => like.likes)

    

        return blog.reduce((sum, item) => sum + item, 0)
    }
}

const favoriteBlog = (blogs) => {
    const array = blogs.map(blog => blog.likes)
    const max = Math.max(...array)
    
    return max
}




const mostBlogs = (blogs) => {

    const counts = _.countBy(blogs, "author");
    const mostFrequent = _.maxBy(Object.keys(counts), (o) => counts[o]);

    return {
      author: mostFrequent,
      blogs: counts[mostFrequent]
    }

}


const mostLikes = (blogs) => {
  const topBlog = _.maxBy(blogs, 'likes')
  
  return {
    author: topBlog.author,
    likes: topBlog.likes
  }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}