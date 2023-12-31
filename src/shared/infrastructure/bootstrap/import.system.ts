declare const require: any;

const importAll = (paths: any) =>
  paths
    .keys()
    .map(paths)
    .map((x: any) => {
      const [k]: any = Object.keys(x);
      return x[k];
    });

export const getRoutes = () =>
  require?.id
    ? importAll(require.context('@/*', true, /^((?!!+).)*router.ts$/))
    : [];
