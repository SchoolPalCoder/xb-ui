// Window对象的扩展
interface Window {
  app: any;
  MutationObserver: MutationObserver;
  WebKitMutationObserver: MutationObserver;
  MozMutationObserver: MutationObserver;
  mozRequestAnimationFrame: number;
  msRequestAnimationFrame: number;
}
