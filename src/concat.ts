/// <reference path="enumerable.ts" />

module arrayexjs {
    function concatEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>): IEnumerator<T> {
        var t: IEnumerator<T>;
        var s = false;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                e.current = undefined;
                if (t.moveNext()) {
                    e.current = t.current;
                    return true;
                }
                if (s) return false;
                s = true;
                t = second.getEnumerator();
                if (!t.moveNext())
                    return false;
                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.concat = function<T>(second: IEnumerable<T>): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => concatEnumerator<T>(<IEnumerable<T>>this, second);
        return e;
    };
}