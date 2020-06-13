import { E } from '@mosteast/e';
import { T_result_mark } from '../type';

export class Incorrect_answer extends E {
  result!: T_result_mark;

  constructor(result: T_result_mark) {
    super();
    this.message = result.message ?? `Incorrect answer: ${JSON.stringify(result.answer)}`;
    this.result = result;
  }
}