import express from 'express'
import {
    createPost,
    getAllPost,
    getPostBySlug,
    updatePost,
    deletePost,
    getPostByCategory
} from '../controllers/postController.js'

import protect from "../middleware/authMiddleware.js"

const router=express.Router()

router.get("/",getAllPost)
router.get("/:category/:categoryName",getPostByCategory);
router.get("/:slug",getPostBySlug)

router.post("/",protect,createPost)
router.patch("/:slug",protect,updatePost)
router.delete("/:slug",protect,deletePost)

export default router