import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException } from '../errors';

export function validation<T extends object, V>(dtoClass: { new (): T }, data: V): T {
  const dto = plainToInstance<T, V>(dtoClass, data);
  const errors = validateSync(dto);

  if (errors.length) {
    const constraints = errors[0].constraints;
    const message = constraints ? constraints[Object.keys(constraints)[0]] : 'Unknown validation error';

    throw new BadRequestException(message);
  }

  return dto;
}
