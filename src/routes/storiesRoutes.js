import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  getPopularStories,
  getStoryById,
  getMyStories,
  createStory,
  updateStory,
  getFavouriteStories,
  addToFavorites,
  removeFromFavorites,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  updateStorySchema,
  storyIdSchema,
  getAllStoriesSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/',
  celebrate(getAllStoriesSchema),
  getAllStories);
router.get('/popular',
  getPopularStories,
);
router.get('/saved',
  authenticate,
  celebrate(paginationSchema),
  getFavouriteStories);
router.get('/me',
  authenticate,
  celebrate(paginationSchema),
  getMyStories);

router.post('/',
  authenticate,
  celebrate(createStorySchema),
  upload.single('storyImage'),
  createStory);
router.get('/:storyId',
  celebrate(storyIdSchema),
  getStoryById);
router.patch('/:storyId',
  authenticate,
  celebrate(updateStorySchema),
  upload.single('storyImage'),
  updateStory);

router.post('/:storyId/save',
  authenticate,
  celebrate(storyIdSchema),
  addToFavorites);
router.delete('/:storyId/save',
  authenticate,
  celebrate(storyIdSchema),
  removeFromFavorites);

export default router;
