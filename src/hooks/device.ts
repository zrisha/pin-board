/** True when the device's primary input has no hover capability (touch). */
const isTouchDevice = window.matchMedia('(hover: none)').matches;

export function useIsTouchDevice(): boolean {
  return isTouchDevice;
}
