import 'reflect-metadata';

export default function GET(
  routeName: string = '*'
): (target: object, propertyKey: string) => void {
  return (target: object, propertyKey: string): void => {
    let properties: any = Reflect.getMetadata(routeName, target);
    if (Array.isArray(properties?.GET)) {
      properties.GET.push(propertyKey);
    } else {
      properties = { ...properties, GET: [propertyKey] };
      console.log("define data:", routeName, "::", properties,"::", target)
      Reflect.defineMetadata(routeName, properties, target);
    }
  };
}