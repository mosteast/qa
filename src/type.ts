export interface T_object {
  [key: string]: any
}

/**
 * Error level
 *
 * Always modify this with cation, since different level could
 * means different logic and action.
 */
export enum E_level {
  internal = 'internal',
  external = 'external',
}

export enum N_type_question {
  bool       = 'bool', // Answers with yes or no.
  choice     = 'choice', // Select from preset options.
  general    = 'general', // Single input with general answer.
  completion = 'completion', // Multi inputs for completion.
}

export interface T_marker {
  name: string

  /**
   * @param answer
   * @param $
   */
  fn(answer: any, $: any): T_result | Promise<T_result>
}

export interface T_results {

  /**
   * product of correctnesses in results
   * results.reduce((a, b) => a * b)
   */
  correctness: number
  results: { [name: string]: T_result }
}

/**
 * Mark result
 */
export interface T_result<Answer extends any = any, Data extends any = any> {
  /**
   * 1 stands for correct
   * 0 stands for incorrect
   * 0.8 stands for 80% correct
   */
  correctness: number

  /**
   * Marker name
   */
  marker: string

  /**
   * Original answer
   */
  answer: Answer

  /**
   * Reason or message appendix
   */
  message?: string

  /**
   * Other data
   */
  data?: Data
}

export interface T_marker_bool extends T_marker {(answer: boolean): T_result}

export interface T_marker_choice extends T_marker {(selection: string[]): T_result}

export interface T_marker_general extends T_marker {(input: string): T_result}

export interface T_marker_completion extends T_marker {(inputs: string[]): T_result}