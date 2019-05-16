'use strict';

const deleteResourceGroup = require('./lib/deleteResourceGroup');

class AzureRemove {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('azure');

    Object.assign(
      this,
      deleteResourceGroup
    );

    this.hooks = {
      'remove:remove': this.remove.bind(this),
    };
  }

  async remove () {
    await this.provider.initialize(this.serverless, this.options);
    await this.deleteResourceGroup();
    this.serverless.cli.log('Service successfully removed');
  }
}

module.exports = AzureRemove;
