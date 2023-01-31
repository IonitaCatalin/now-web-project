export class PlatformUtil {
    public static async runGarbageCollection(): Promise<void> {
        try {
          if (global.gc) {
            global.gc();
          }
        } catch (e) {}
      }
}