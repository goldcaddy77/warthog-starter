import * as util from 'util';

import { getBindingError } from 'warthog';

export class Logger {
  static log(...args: any[]) {
    console.log(util.inspect(args, { showHidden: false, depth: null }));
  }

  // This takes a raw GraphQL error and pulls out the relevant info
  static logGraphQLError(error: Error) {
    console.error(util.inspect(getBindingError(error), { showHidden: false, depth: null }));
  }
}
