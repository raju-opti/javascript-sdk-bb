import { 
  createBatchEventProcessor,
  createInstance,
  createLogger,
  createOdpManager,
  createPollingProjectConfigManager,
  DebugLog
} from '@optimizely/optimizely-sdk';


export const testOptimizely = async () => {
  const optimizely = createInstance({
    projectConfigManager: createPollingProjectConfigManager({
      sdkKey: '<>',
      autoUpdate: true,
    }),
    logger: createLogger({
      level: DebugLog
    }),
    eventProcessor: createBatchEventProcessor(),
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
