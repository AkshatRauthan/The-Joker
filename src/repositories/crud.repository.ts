import { StatusCodes } from 'http-status-codes';
import { Model, Document } from 'mongoose';

import { AppError } from '@errors';

class CrudRepository<T extends Document> {
    model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Create a new document
     * @param data - Data to create a new document
     * @returns Created document
     */
    async create(data: Partial<T>): Promise<T> {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error: any) {
            console.log("Something went wrong in CRUD repository: create");
            throw new AppError(
                error.message || 'Error creating resource',
                error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Delete a document by id
     * @param id - Document id
     * @returns Deleted document
     */
    async destroy(id: string): Promise<T> {
        try {
            const result = await this.model.findByIdAndDelete(id);
            if (!result) {
                throw new AppError(
                    'Resource not found',
                    StatusCodes.NOT_FOUND
                );
            }
            return result;
        } catch (error: any) {
            console.log("Something went wrong in CRUD repository: destroy");
            throw new AppError(
                error.message || 'Error deleting resource',
                error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Get a document by id
     * @param id - Document id
     * @returns Document
     */
    async get(id: string): Promise<T> {
        try {
            const result = await this.model.findById(id);
            if (!result) {
                throw new AppError(
                    'Resource not found',
                    StatusCodes.NOT_FOUND
                );
            }
            return result;
        } catch (error: any) {
            console.log("Something went wrong in CRUD repository: get");
            throw new AppError(
                error.message || 'Error retrieving resource',
                error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Get all documents
     * @param filter - Filter criteria
     * @returns Array of documents
     */
    async getAll(filter: any = {}): Promise<T[]> {
        try {
            const result = await this.model.find(filter);
            return result;
        } catch (error: any) {
            console.log("Something went wrong in CRUD repository: getAll");
            throw new AppError(
                error.message || 'Error retrieving resources',
                error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Update a document by id
     * @param id - Document id
     * @param data - Data to update
     * @returns Updated document
     */
    async update(id: string, data: Partial<T>): Promise<T> {
        try {
            const result = await this.model.findByIdAndUpdate(
                id,
                data,
                { new: true, runValidators: true }
            );
            if (!result) {
                throw new AppError(
                    'Resource not found',
                    StatusCodes.NOT_FOUND
                );
            }
            return result;
        } catch (error: any) {
            console.log("Something went wrong in CRUD repository: update");
            throw new AppError(
                error.message || 'Error updating resource',
                error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Find documents by a given filter
     * @param filter - Filter criteria
     * @returns Array of documents
     */
    async findBy(filter: any): Promise<T[]> {
        try {
            const result = await this.model.find(filter);
            return result;
        } catch (error: any) {
            console.log("Something went wrong in CRUD repository: findBy");
            throw new AppError(
                error.message || 'Error retrieving resources',
                error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export default CrudRepository;
