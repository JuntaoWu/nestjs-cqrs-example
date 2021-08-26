
import "reflect-metadata";
const metadataKey = Symbol("TargetAggregateIdentifier");
export function TargetAggregateIdentifier() {
  return registerProperty;
}

function registerProperty(target: object, propertyKey: string): void {
  const uniqueMetadataKey = Symbol.for(metadataKey.description);
  let properties: string[] = Reflect.getMetadata(uniqueMetadataKey, target);

  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
    Reflect.defineMetadata(uniqueMetadataKey, properties, target);
  }
}