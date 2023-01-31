export class TimeoutUtil {
    public static async wait(time: number): Promise<void> {
        await new Promise<void>(resolve => {
          const tm = setTimeout(() => {
            clearTimeout(tm);
            tm.unref();
    
            resolve();
          }, time);
        });
      }
}