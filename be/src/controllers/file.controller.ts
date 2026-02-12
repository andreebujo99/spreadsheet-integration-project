import { NextFunction, Request, Response } from 'express';
import { fileService } from '../services/file.service';

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        if (!req.file) {
            return next({ status: 400, message: 'File missing' });
        }

        const result =
            await fileService.handleUpload(req.file);

        res.status(201).json(result);

    } catch (err) {
        next(err);
    }
};

export const getFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const data =
            await fileService.getFiles(req.query);

        res.json(data);

    } catch (err) {
        next(err);
    }
};

export const getFileById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const file =
            await fileService.getFileById(req.params.id);

        if (!file) {
            return next({ status: 404, message: 'Not found' });
        }

        res.json(file);

    } catch (err) {
        next(err);
    }
};

export const updateColumns = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const updated =
            await fileService.updateColumns(
                req.params.id,
                req.body.columns
            );

        if (!updated) {
            return next({ status: 404, message: 'Not found' });
        }

        res.status(204).send();

    } catch (err) {
        next(err);
    }
};

