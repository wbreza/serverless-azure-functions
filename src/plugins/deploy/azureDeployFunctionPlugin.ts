import { FunctionAppService } from '../../services/functionAppService';

export class AzureDeployFunctionPlugin {
  hooks: any;
  
  constructor(private serverless, private options) {

    this.hooks = {
      'deploy:function:packageFunction': this.beforeDeploy.bind(this),
      'deploy:function:deploy': this.deploy.bind(this, options)
    };
  }

  async beforeDeploy() {
    // Spawn 'package:function' to create the single-function zip artifact
    this.serverless.pluginManager.spawn('package:function');
  }

  async deploy() {
    const functionAppService = new FunctionAppService(this.serverless, this.options);
    const functionApp = await functionAppService.get();

    await functionAppService.deleteFunction(this.options.function);
    await functionAppService.uploadFunction(functionApp, this.options.function);
    await functionAppService.syncTriggers(functionApp);
  }
}
