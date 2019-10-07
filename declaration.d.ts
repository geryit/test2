declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}
declare module "csstype" {
  interface Properties {
    // ...or allow any other property
    [index: string]: any;
  }
}
