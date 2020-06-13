import { Incorrect_answer } from './incorrect_answer';

it('can throw', async () => {
  const correctness = 0;
  const answer = 'a';
  const e = new Incorrect_answer({ correctness, answer });
  expect(e.message).toContain(answer);
  expect(e.result.correctness).toBe(correctness);
  expect(e.result.answer).toBe(answer);
  expect(() => {throw e;}).toThrow(Incorrect_answer);
});