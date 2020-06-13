import { E } from '@mosteast/e';
import { T_result } from '../type';

export class Incorrect_answer extends E {
  result!: T_result;

  constructor(result: T_result) {
    super();
    this.message = result.message ?? `Incorrect answer: ${JSON.stringify(result.answer)}`;
    this.result = result;
  }
}