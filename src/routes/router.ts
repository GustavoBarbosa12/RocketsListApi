import { Router } from 'express';
import { RocketController } from '../controllers/rocket-controller';

export const router = Router();

router.get('/', 
    (req, res) => {res.send('Welcome to RocketsApi');}
);

//rocket
router.post('/rocket/create', 
    (req, res) => {return RocketController.create(req, res)}
);
router.post('/rocket/find-all', 
    (req, res) => {return RocketController.findAll(req, res)}
);
router.post('/rocket/find-by-name', 
    (req, res) => {return RocketController.findByName(req, res)}
);
router.post('/rocket/update', 
    (req, res) => {return RocketController.updateOne(req, res)}
);
router.post('/rocket/delete', 
    (req, res) => {return RocketController.delete(req, res)}
);
