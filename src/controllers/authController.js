import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  res.status(201).json({ message: 'User created' });
};

export const requestResetEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: 'If this email exists, a reset link has been sent',
    });
  } else {
    const resetToken = jwt.sign(
      {
        sub: user._id,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );
    const templatePath = path.resolve(
      'src/templates/reset-password-email.html',
    );
    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    const html = template({
      name: user.username,
      link: `${process.env.FRONTEND_DOMAIN}/reset-password?token=${resetToken}`,
    });

    try {
      const result = await sendEmail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Reset your password',
        html,
      });
      console.log('Email sent result:', result);
    } catch (error) {
      console.error('ПОМИЛКА SMTP:', error);
      next(
        createHttpError(
          500,
          'Failed to send the email, please try again later.',
        ),
      );
      return;
    }
  }
  res.status(200).json({
    message: 'If this email exists, a reset link has been sent',
  });
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log('JWT Error Message:', err.message);
    next(createHttpError(401, 'Invalid or expired token'));
    return;
  }

  const user = await User.findOne({ _id: payload.sub, email: payload.email });
  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.updateOne({ _id: user._id }, { password: hashedPassword });

  await Session.deleteMany({ userId: user._id });

  res.status(200).json({
    message: 'Password reset successfully. Please log in again.',
  });
};
