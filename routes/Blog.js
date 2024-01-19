const connectMongoDB = require('../libs/mongodb')

const router = require('express').Router();
const Blog = require('../models/Blog')

router.get('/getPosts',async function(req, res){
    const posts = await Blog.find();
    res.status(200).json(posts);

})

router.post('/create', async(req,res)=>{
    try {
        const {title , category , content} = req.body;
        const newBlog = new Blog({
            title : title,
            category : category,
            content : content
        })
        await newBlog.save();
        
        res.status(201).json(newBlog);
        
    } catch (error) {
        console.log(error);
    }
})


router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, content } = req.body;
    try {
      const updatedPost = await Blog.findByIdAndUpdate(id, { title, category, content }, { new: true });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Blog.findByIdAndDelete(id)
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.delete('/deleteAll', async (req, res) => {
    
    try {
      await Blog.deleteMany()
      res.json({ message: 'All Posts deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

module.exports = router;