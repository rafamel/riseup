import { Serial, TypeGuard } from 'type-core';

export function safeJsonSerialize(value: any): string {
  return JSON.stringify(walk(value));
}

function walk(value: any): Serial.Type {
  if (
    TypeGuard.isNullish(value) ||
    TypeGuard.isBoolean(value) ||
    TypeGuard.isString(value) ||
    TypeGuard.isNumber(value)
  ) {
    return value;
  }

  if (
    TypeGuard.isArray(value) &&
    Object.getPrototypeOf(value) === Array.prototype
  ) {
    return value.map((item) => walk(item));
  }

  if (
    TypeGuard.isRecord(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, walk(item)])
    );
  }

  throw new Error(`Non serializable value: ${value}`);
}
