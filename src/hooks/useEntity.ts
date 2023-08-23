import {useContext} from 'react';
import {useDispatch} from 'react-redux';
import ContainerContext from 'src/ContainerContext';

export default function useEntity(entityName: string) {
    const di = useContext(ContainerContext);
    return di.resolve(entityName);
}

export function useActions(entityName: string) {
    const dispatch = useDispatch();
    const entity: any = useEntity(entityName);
    const keys = Object.keys(entity.actions);
    const dispatches = {} as any;
    for (let i = 0; i < keys.length; i++) {
        dispatches[keys[i]] = (data: any) =>
            dispatch(entity.actions[keys[i]](data));
    }
    return dispatches;
}