import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { Story } from '../models/story.js';
export const getAllStories = async (req, res) => {
  res.status(200).json({ message: 'All stories received' });
};

export const createStory = async (req, res) => {
  // 1️⃣ Создаём историю без картинки
  const story = await Story.create({
    ...req.body, // title, description, category, date и т.д.
    ownerId: req.user._id,
  });

  if (req.file) {
    const publicId = `story-${story._id}`;
    const result = await saveFileToCloudinary(req.file.buffer, publicId);
    story.img = result.secure_url;
    await story.save(); // save link for story
  }

  res.status(201).json(story);
};

export const updateStory = async (req, res) => {
  const { storyId } = req.params;
  //if the file have changed, send new one to Cloudinary & adding it to req.body
  if (req.file) {
    const publicId = `story-${storyId}`; //  storyId for naming
    const result = await saveFileToCloudinary(req.file.buffer, publicId);
    req.body.img = result.secure_url;
  }

  const story = await Story.findOneAndUpdate(
    {
      _id: storyId,
      ownerId: req.user._id,
    },
    req.body,
    { new: true },
  );
  if (!story) {
    throw createHttpError(404, 'Story not found');
  }
  res.status(200).json({ msg: 'Updated!' });
};
