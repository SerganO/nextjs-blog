import 'reflect-metadata';

export default function VSSR(
  routeName: string = '*', schema = {}
): (target: object, propertyKey: string) => void {
  return (target: object, propertyKey: string): void => {
    let properties: any = Reflect.getMetadata(routeName, target);
    if (Array.isArray(properties?.VSSR)) {
      properties.VSSR.push(propertyKey, schema);
    } else {
      properties = { ...properties, VSSR: [propertyKey, schema] };
      Reflect.defineMetadata(routeName, properties, target);
    }
  };
}