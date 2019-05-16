'use strict';

const retrieveLogs = require('./lib/retrieveLogs');

class AzureLogs {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('azure');

    Object.assign(
      this,
      retrieveLogs
    );

    this.hooks = {
      'before:logs:logs': () => this.beforeLogs.bind(this),

      'logs:logs': () => this.logs.bind(this)
    };
  }

  async beforeLogs () {
    await this.provider.initialize(this.serverless, this.options);
  }

  async logs () {
    await this.provider.initialize(this.serverless, this.options);
    await this.retrieveLogs();
  }
}

module.exports = AzureLogs;
