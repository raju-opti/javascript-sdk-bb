import { 
  createBatchEventProcessor,
  createInstance,
  createLogger,
  createOdpManager,
  createStaticProjectConfigManager,
  createPollingProjectConfigManager,
  DebugLog,
  createForwardingEventProcessor
} from '@optimizely/optimizely-sdk';

import { datafile } from './datafile';


export const testOptimizely = async () => {
  const optimizely = createInstance({
    projectConfigManager: createPollingProjectConfigManager({
      sdkKey: '<>',
      autoUpdate: true,
    }),
    // projectConfigManager: createStaticProjectConfigManager({
    //   datafile,
    // }),
    logger: createLogger({
      level: DebugLog
    }),
    // eventProcessor: createBatchEventProcessor(),
    // eventProcessor: createForwardingEventProcessor(),
    odpManager: createOdpManager()
  })

  if (!optimizely) {
    console.error('Failed to create Optimizely instance');
    return
  }

  await optimizely.onReady();

  const userId = 'matjaz-user-1';
  const user = optimizely.createUserContext(userId);

  if (!user) {
    console.error('Failed to create user context');
    return;
  }

  await user.fetchQualifiedSegments();

  console.log('Qualified segments:', user.qualifiedSegments);
}
