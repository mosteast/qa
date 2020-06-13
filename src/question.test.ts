import { Question } from './question';
import { Result } from './result';

it('can mark', async () => {
  const q = new Question();
  q.markers = {
    required: {
      name: 'required',
      fn(val: string) {
        return val ?
          new Result(val, 1, 'required') :
          new Result(val, 0, 'required');
      },
    },
  };

  const r = await q.mark('');
  expect(r.correctness).toBeLessThan(1);
  expect(r.results.required.answer).toBe('');
  expect(r.results.required.correctness).toBe(0);
});

it('get_title/get_desc', async () => {
  const q = new Question();
  q.title = 'TITLE';
  expect(q.get_title()).toBe('TITLE');

  const q2 = new Question();
  q2.$.i = 1;
  q2.title_builder = $ => `TITLE ${$.i}`;
  expect(q2.get_title()).toBe('TITLE 1');

  const q3 = new Question();
  q3.desc = 'DESC';
  expect(q3.get_desc()).toBe('DESC');

  const q4 = new Question();
  q4.$.i = 1;
  q4.desc_builder = $ => `DESC ${$.i}`;
  expect(q4.get_desc()).toBe('DESC 1');
});