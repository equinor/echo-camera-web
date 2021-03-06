import EchoFramework from '@equinor/echo-framework';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSetActiveTagNo() {
  try {
    return EchoFramework.Hooks.useSetActiveTagNo();
  } catch (error) {
    return (tagNo: string) => {
      console.warn('SetActiveTagNo does not work locally. Here is the tagNo: ', tagNo);
    };
  }
}
