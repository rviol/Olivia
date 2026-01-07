import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { ListDetailUserController } from './controllers/user/ListDetailUserController'

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// -- ROTAS DE USUÁRIO --
router.post('/users', new CreateUserController().handle);

router.post("/login", new AuthUserController().handle);

router.get("/me", isAuthenticated, new ListDetailUserController().handle);

export { router };