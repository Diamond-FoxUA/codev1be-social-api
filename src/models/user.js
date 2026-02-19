import { model, Schema } from 'mongoose';
//создал модель пользователя
const userSchema = new Schema(
  {
    fullName: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
//удалил пароль с ответа
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
