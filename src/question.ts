import { N_type_question, T_marker, T_results_mark, T_results_test } from './type';

export class Question<State extends any = any, Marker extends T_marker = T_marker> {

  /**
   * Question state data
   */
  $: State = {} as any;

  /**
   * Title of the question
   */
  title!: string;

  /**
   * Description template of the question
   * Template syntax is same as title
   */
  desc!: string;

  /**
   * Function to build title
   */
  title_builder!: { ($: State): string };

  /**
   * Function to build description
   */
  desc_builder!: { ($: State): string };

  type!: N_type_question;

  /**
   * Answer validators
   */
  markers: { [name: string]: Marker } = {};

  get_title() {
    return this.title ?? this.title_builder(this.$);
  }

  get_desc() {
    return this.desc ?? this.desc_builder(this.$);
  }

  async mark(answer: any): Promise<T_results_mark> {
    const markers = this.markers;
    const r: T_results_mark = { correctness: 1, results: {} };
    for (const key in markers) {
      const marker = markers[key];
      const result = await marker.fn(answer, this.$);
      r.correctness *= result.correctness;
      r.results[key] = result;
    }

    return r;
  }

  /**
   * @param name - marker name
   */
  async test_marker(name: string): Promise<T_results_test> {
    const marker = this.markers[name];
    const tests = marker.tests;
    const r: T_results_test = {};

    for (const key in tests) {
      const test = tests[key];
      const mr = await marker.fn(test.answer, this.$);
      const pass = test.expect === mr.correctness;
      r[key] = { pass, expected: test.expect, received: mr.correctness, answer: test.answer, $: this.$ };
    }

    return r;
  }

  /**
   * Test all marker
   */
  async test_all(): Promise<{ [marker: string]: T_results_test }> {
    const markers = this.markers;

    const r: { [marker: string]: T_results_test } = {};
    for (const key in markers) {
      r[key] = await this.test_marker(key);
    }

    return r;
  }
}

