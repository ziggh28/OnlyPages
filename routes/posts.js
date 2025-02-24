import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

export {
  router
}

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

router.get('/', checkAuth, postsCtrl.index)
router.post('/', checkAuth, postsCtrl.create)
router.get('/category/:categoryId', checkAuth, postsCtrl.categoryShow)
router.get('/:id', checkAuth, postsCtrl.show)
router.get('/:id/edit', checkAuth, postsCtrl.edit)
router.patch('/:id/like', checkAuth, postsCtrl.likeAndUnlike)
router.patch('/:id', checkAuth, postsCtrl.update)
router.post('/:id', checkAuth, postsCtrl.reply)
router.delete('/:postId', checkAuth, postsCtrl.delete)
router.delete('/:postId/:replyId', checkAuth, postsCtrl.deleteReply)