import { Request, Response } from 'express';
import { RocketModel, RocketType } from '../models/rocket-model';
import { RocketValidators } from '../validators/rocket-validators';

const rocketImages = [      
    'https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg',
    'https://farm5.staticflickr.com/4645/38583830575_3f0f7215e6_b.jpg',
    'https://farm5.staticflickr.com/4696/40126460511_b15bf84c85_b.jpg',
    'https://farm5.staticflickr.com/4711/40126461411_aabc643fd8_b.jpg'
]

export const RocketController = {
    async create(req: Request, res: Response): Promise<Response> {
        const { name, description, height, width, mass, photo } = req.body;
        const rocket: RocketType = {
            name,
            description,
            height,
            width,
            mass,
            photo,  
        }
        if(!photo) {
            rocket.photo = rocketImages[Math.round(Math.random() * (3-0) + 0)];
        }

        if(RocketValidators.createUserValidator(rocket)) {
            try {
                const rocketModel = new RocketModel(rocket);
                await rocketModel.save();

                res.status(201).json({msg: 'Created'});
            } catch (error) {
                res.status(500).json({msg: 'Server error'});
            }
        } else {
            res.status(400).json({msg: 'Bad request'});
        }

        return res;
    },

    async updateOne(req: Request, res: Response): Promise<Response> {
        const { name, description, height, width, mass, photo } = req.body;
        const rocket: RocketType = {
            name,
            description,
            height,
            width,
            mass,
            photo,  
        }
        if(RocketValidators.createUserValidator(rocket)) {
            try {
                const rocketModel = RocketModel;
                await rocketModel.updateOne({name: name}, {
                    description,
                    height,
                    width,
                    mass,
                    photo
                })

                res.status(202).json({msg: 'Updated'});
            } catch (error) {
                res.status(500).json({msg: 'Server error'});
            }
        } else {
            res.status(400).json({msg: 'Bad request'});
        }

        return res;
    },

    async findAll(req: Request, res: Response): Promise<Response> {
        const page = req.body.page || 1;
        const itemsPerPage = 2;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        try {
            const rocketModel = RocketModel;
            let rockets: RocketType[] = await rocketModel.find();

            let totalPages = rockets.length / 2;
            totalPages = Math.round(totalPages);

            rockets = rockets.slice(startIndex, endIndex);

            res.status(200).json({rockets, totalPages});
        } catch (error) {
            res.status(404).json({msg: 'Not found'});
        }   
        return res;
    },

    async findByName(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        try {
            const rocketModel = RocketModel;
            let rocket = await rocketModel.findOne({name});
            res.status(200).json(rocket);
        } catch (error) {
            res.status(404).json({msg: 'Not found'});
        }   
        return res;
    },

    async delete(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        try {
            const rocketModel = RocketModel;
            await rocketModel.deleteOne({name});
            res.status(201).json({msg: 'Deleted'});
        } catch (error) {
            res.status(500).json({msg: 'Server error'});
        }   
        return res;
    }
}