import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  getStoryById,
  addToFavorites,
  removeFromFavorites,
  createStory,
  updateStory,
  getFavouriteStories,
  getMyStories,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  updateStorySchema,
  storyIdSchema,
  getMyStoriesSchema,
  getAllStoriesSchema,
  getFavouriteStoriesSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/', celebrate(getAllStoriesSchema), getAllStories);
router.get('/:storyId', celebrate(storyIdSchema), getStoryById);

router.post('/', authenticate, celebrate(createStorySchema), upload.single('storyImage'), createStory);
router.patch('/:storyId', authenticate, celebrate(updateStorySchema), upload.single('storyImage'), updateStory);

router.get('/saved', authenticate, celebrate(getFavouriteStoriesSchema), getFavouriteStories);
router.get("/me", authenticate, celebrate(getMyStoriesSchema), getMyStories);

router
  .route('/:storyId/save')
  .all(authenticate)
  .post(celebrate(storyIdSchema), addToFavorites)
  .delete(celebrate(storyIdSchema), removeFromFavorites);

export default router;
