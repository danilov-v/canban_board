export default function fakeAnalyticsApi(event, data) {
  return new Promise((res, rej) => res('Recorded'));
}
