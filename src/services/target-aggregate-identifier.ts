
import "reflect-metadata";
const metadataKey = Symbol("TargetAggregateIdentifier");
export function TargetAggregateIdentifier()  {
    return registerProperty;
}

function registerProperty(target: object, propertyKey: string): void {
    let properties: string[] = Reflect.getMetadata(metadataKey, target);
  
    if (properties) {
      properties.push(propertyKey);
    } else {
      properties = [propertyKey];
      Reflect.defineMetadata(metadataKey, properties, target);
    }
  }