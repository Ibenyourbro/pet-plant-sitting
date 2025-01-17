import express, { Request, Response } from 'express';
const users = express();

import { User } from '../../database/index';

interface userInfo {
  name: string;
  location: string;
}

users.get('/all', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    console.log('hello');
    return res.status(200).send(users);

  } catch {
    return res.sendStatus(418);
  }
});

users.get('/:id', async (req: Request, res: Response) => {

  const user = await User.findOne({
    where: {
      id: req.params.id,
    }
  });
  return res.status(200).send(user);
});

users.post('/create', async (req: Request, res: Response) => {
  const { name, image, location, sitter_rating, total_sitter_ratings, bio, average_rating, total_ratings, } = req.body;
  try {
    const user = await User.create({
      name,
      image,
      location,
      sitter_rating,
      total_sitter_ratings,
      bio,
      average_rating,
      total_ratings,
    });
    res.status(201).send(user);
    return user;
  } catch {
    res.status(418).send(req.body);
  }
});

module.exports = users;
