import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllStories,
  addToFavorites,
  removeFromFavorites,
  getFavouriteStories
} from '../controllers/storiesController.js';
import { storyIdSchema } from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/', getAllStories);

router.get('/saved', authenticate, getFavouriteStories);

router.route('/:storyId/save')
    .all(authenticate)
    .post(celebrate(storyIdSchema), addToFavorites)
    .delete(celebrate(storyIdSchema), removeFromFavorites);

export default router;
