import { EventBusNamesEnum } from "@/interfaces/eventBusNames";

export class EventBus<T> {
  private eventTarget: EventTarget;

  on(type: EventBusNamesEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }

  once(type: EventBusNamesEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }

  off(type: EventBusNamesEnum, listener: (even: CustomEvent<T>) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }

  emit<E>(type: EventBusNamesEnum, detail: E extends unknown ? E : T) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
