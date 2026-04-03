import express from 'express'
import {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/postController.js'

import protect from "../middleware/authMiddleware.js"

const router=express.Router()

router.get("/",getAllPost)
router.get("/:slug",getPostBySlug)

router.post("/",protect,createPost)
router.patch("/:id",protect,updatePost)
router.delete("/:id",protect,deletePost)

export default router