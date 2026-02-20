import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
  createStory,
  updateStory,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  updateStorySchema,
  storyIdSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/', getAllStories);
router.post('/', authenticate, upload.single('storyImage'), celebrate(createStorySchema), createStory);
router.patch('/:storyId', authenticate, upload.single('storyImage'), celebrate(updateStorySchema), updateStory);

// router.get('/saved', authenticate, getFavouriteStories);

router.route('/:storyId/save')
    .all(authenticate)
    .post(celebrate(storyIdSchema), addToFavorites)
    .delete(celebrate(storyIdSchema), removeFromFavorites);

export default router;
