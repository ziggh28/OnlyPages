import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'

export { 
  index, 
  create, 
  show, 
  reply,
  categoryShow,
  deletePost as delete,
  deleteReply,
  edit,
  update,
  likeAndUnlike,
}

function index(req, res) {
          Post.find({})
            .populate('author')
            .populate('likes')
            .sort({createdAt: "desc"})
            .then((posts) => {
              console.log(posts)
              res.json(posts)
            })
        .catch(err=>{
          console.log(err)
          return res.status(400).json(err)
        })
}

function deleteReply(req,res){
  Post.findById(req.params.postId)
      .populate('author')
      .populate('likes')
      .populate({
        path: 'replies',
        populate: {
          path: 'author'
        }
      })
      .then(post=>{
        post.replies.remove(req.params.replyId)
        post.save()
        res.json(post)
      })
}

function create(req, res) {
  req.body.author = req.user.profile
  Post.create(req.body)
      .then((post)=> {
        Profile.findById(req.user.profile)
                .then(profile=>{
                  profile.posts.push(post._id)
                  profile.save()
                  post.populate('author').execPopulate()
                  .then(post=>res.json(post))
                })
      })
      .catch(err=>{
        console.log(err)
        return res.status(400).json(err)
      })
}

function show(req, res) {
  Post.findById(req.params.id)
      .populate('author')
      .populate('likes')
      .populate({
        path: 'replies',
        populate: {
          path: 'author'
        }
      })
      .then((post)=> {
        res.json(post)
      })
      .catch(err=>{
        console.log(err)
        return res.status(400).json(err)
      })
}

function categoryShow(req, res) {
  Post.find({categories:req.params.categoryId})
      .populate('author')
      .sort({createdAt: "asc"})
      .then((posts) => {
        res.json(posts.reverse())
      })
      .catch(err=>{
        console.log(err)
        return res.status(400).json(err)
      })
}

function reply(req, res) {
  Post.findById(req.params.id)
      .then((post)=> {
        req.body.author = req.user.profile
        post.replies.push(req.body)
        post.save()
        post.populate('author')
            .populate('likes')
            .populate({
              path: 'replies',
              populate: {
                path: 'author'
              }
            }).execPopulate()
        .then(post=> {
          res.json(post)
        })
      })
      .catch(err=>{
        console.log(err)
        return res.status(400).json(err)
      })
}

function deletePost(req,res){
  Profile.findById(req.user.profile)
        .then((profile) => {
          profile.posts.remove({_id: req.params.postId})
          profile.save()
          Post.findOneAndDelete({_id: req.params.postId})
          .then(() => {
            Post.find({})
            .populate("author")
            .then(posts=>res.json(posts))
          })
        })
        .catch(err=>{
          console.log(err)
          return res.status(400).json(err)
        })
}

function edit(req, res) {
  Post.findById(req.params.id)
      .then(post => {
        res.json(post)
      })
      .catch(err=>{
        console.log(err)
        return res.status(400).json(err)
      })
}

function update(req, res) {
  
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((post) => {
        res.json(post)
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json(err)
      })
}

function likeAndUnlike(req,res){
  Post.findById(req.params.id)
      .populate('author')
      .populate({
        path: 'replies',
        populate: {
          path: 'author'
        }
      })
      .then(post=>{
        if(!post.likes.includes(req.user.profile)){
          post.likes.push(req.user.profile)
          post.save()
        }else{
          post.likes.remove(req.user.profile)
          post.save()
        }
        post.populate('likes').execPopulate()
        .then(post=>res.json(post))
      })
      .catch(err=>{
        console.log(err)
        return res.status(400).json(err)
      })
}