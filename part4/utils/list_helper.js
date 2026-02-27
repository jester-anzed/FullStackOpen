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


module.exports = {
    dummy,
    totalLikes
}