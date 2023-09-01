import { useContext } from "react";
import ContainerContext from "../ContainerContext";
import { useDispatch } from "react-redux";
import { IEntityContainer } from "src/entities";
//import { Action, action } from './actions'
import { action } from "store/actionTypes";
import { Entity } from "src/entities/entity";

export default function useEntity<T extends keyof IEntityContainer>(
  entityName: T
): IEntityContainer[T] {
  const di = useContext(ContainerContext);
  return di.resolve(entityName);
}
type FirstParam<Type> = Type extends (...args: infer P) => any
  ? P[0]
  : undefined;

export function useActions<T extends keyof IEntityContainer>(entityName: T) {
  const dispatch = useDispatch();
  const entity = useEntity(entityName);
  //const actions = entity.actions as IEntityContainer[T]["actions"]
  const actions = entity.actions as Omit<IEntityContainer[T], keyof Entity<IEntityContainer[T]>>

  const dispatches: {
    [key in keyof typeof actions]: (
      data?: FirstParam<IEntityContainer[T][key]>
    ) => any;
  } = {} as any;

  for (const key in actions) {
    dispatches[key as any] = (data: any = {}) =>
      dispatch(action(actions[key] as string, data));
  }
  return dispatches;
}
