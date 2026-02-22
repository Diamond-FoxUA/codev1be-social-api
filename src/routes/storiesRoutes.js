import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
  createStory,
  updateStory,
  getFavouriteStories,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  updateStorySchema,
  storyIdSchema,
  getAllStoriesSchema,
  getFavouriteStoriesSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/', celebrate(getAllStoriesSchema), getAllStories);
router.post(
  '/',
  authenticate,
  upload.single('storyImage'),
  celebrate(createStorySchema),
  createStory,
);
router.patch(
  '/:storyId',
  authenticate,
  upload.single('storyImage'),
  celebrate(updateStorySchema),
  updateStory,
);

router.get(
  '/saved',
  authenticate,
  celebrate(getFavouriteStoriesSchema),
  getFavouriteStories,
);

router
  .route('/:storyId/save')
  .all(authenticate)
  .post(celebrate(storyIdSchema), addToFavorites)
  .delete(celebrate(storyIdSchema), removeFromFavorites);

export default router;
