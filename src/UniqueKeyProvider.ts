export default class UniqueKey 
{
    static current: number = 1;
    static next(): number {
        return UniqueKey.current++;
    }
}