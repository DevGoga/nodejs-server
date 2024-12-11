import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException } from '../errors';

export function validation<T extends object>(dtoClass: { new (): T }, data: T): T {
  const dto = plainToInstance(dtoClass, data);
  const errors = validateSync(dto);

  if (errors.length) {
    const constraints = errors[0].constraints;
    const message = constraints ? constraints[Object.keys(constraints)[0]] : 'Unknown validation error';

    throw new BadRequestException(message);
  }

  return dto;
}
