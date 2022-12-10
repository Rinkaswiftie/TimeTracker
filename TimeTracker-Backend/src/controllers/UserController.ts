import { User } from '../models/User';

module.exports.getAllUsers = async (req: any, res: any, next: any) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Gets all the users'
  const users = await User.find();
  /* #swagger.responses[<number>] = {
        description: <string>,
        schema: <array>, <object>, <string>, <number> or <boolean>
} */
  return res.send({ users });
};
