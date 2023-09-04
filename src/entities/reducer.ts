import 'reflect-metadata'
import { Entity } from "./entity"

export default function reducer(
    reducerName: string
  ): (target: any, propertyKey?: string | undefined) => void {
    
    return (target: any, propertyKey?: string | undefined): void => 
    {
        let reducers: any = Reflect.getMetadata('reducers', Entity) || []
        reducers.push({ reducerName })
        Reflect.defineMetadata('reducers', reducers, Entity)
    }
}