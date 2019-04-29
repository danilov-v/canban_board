import fakeAnalyticsApi from './fakeAnalyticsApi';

const analystics = store => next => action => {
  const analystics = action?.meta?.analystics;
  if (!analystics) return next(action);

  const { event, data } = analystics;

  fakeAnalyticsApi(event, data)
    .then(resp => {
      console.log('Recorded: ', event, data);
    })
    .catch(err => console.error('Error occured in analystics', err.toString()));
  return next(action);
};

export default analystics;
